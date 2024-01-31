import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

/**
 * These fields are needed for auth and user management,
 * but add more fields if needed.
 */
export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  email: text("email", { length: 255 }).notNull(),
  username: text("username").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .$default(() => new Date())
    .notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }),
});

export type User = typeof userTable.$inferSelect;

/**
 * Lucia needs these fields for session management.
 */
export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});
