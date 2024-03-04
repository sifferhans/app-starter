import { userTable } from "../db/schema";

export default defineEventHandler(async (event) => {
  const db = useDB();

  const users = await db.select().from(userTable).all();

  return users;
});
