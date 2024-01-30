import { email, minLength, object, parse, string } from "valibot";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { userTable } from "~/server/db/schema";

const SignupSchema = object({
  email: string([email("Invalid email address")]),
  username: string([
    minLength(2, "Username must be at least 2 characters long"),
  ]),
  password: string([
    minLength(8, "Password must be at least 8 characters long"),
  ]),
});

export default defineEventHandler(async (event) => {
  const { email, password, username } = await readValidatedBody(event, (body) =>
    parse(SignupSchema, body)
  );

  const db = useDB();

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

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
});
