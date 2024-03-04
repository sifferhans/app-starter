import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { parse } from "valibot";
import { userTable } from "~/server/db/schema";
import { SignupSchema } from "~/types/auth";

export default defineEventHandler(async (event) => {
  const { email, password, username } = await readValidatedBody(event, (body) =>
    parse(SignupSchema, body)
  );

  const db = useDB();
  const lucia = useLucia();

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateRandomID("user");

  try {
    await db.insert(userTable).values({
      id: userId,
      email,
      hashedPassword,
      username,
    });

    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
  } catch {
    throw createError({
      status: 400,
      message: "Username already exists",
    });
  }
});
