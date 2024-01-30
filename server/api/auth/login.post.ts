import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { parse } from "valibot";
import { userTable } from "~/server/db/schema";
import { LoginSchema } from "~/types/auth";

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, (body) =>
    parse(LoginSchema, body)
  );

  const db = useDB();
  const lucia = useLucia();

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .get();

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  const passwordIsValid = await new Argon2id().verify(
    user.hashedPassword,
    password
  );

  if (!passwordIsValid) {
    throw createError({
      status: 401,
      message: "Invalid email or password",
    });
  }

  const session = await lucia.createSession(user.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );

  await lucia.deleteExpiredSessions();
});
