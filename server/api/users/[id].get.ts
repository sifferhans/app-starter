import { eq } from "drizzle-orm";
import { userTable } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const db = useDB();

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, id))
    .get();

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  return user;
});
