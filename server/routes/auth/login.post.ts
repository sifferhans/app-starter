import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { email, minLength, object, parse, string } from "valibot";
import { userTable } from "~/server/db/schema";

const LoginSchema = object({
  email: string([email("Invalid email address")]),
  password: string([
    minLength(8, "Password must be at least 8 characters long"),
  ]),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, (body) =>
    parse(LoginSchema, body)
  );

  const db = useDB();

  const user = await db.query.userTable.findFirst({
    where: () => eq(userTable.email, email),
  });

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
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  const session = await lucia.createSession(user.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
