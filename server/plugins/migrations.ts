import { migrate } from "drizzle-orm/libsql/migrator";

/**
 * If in dev mode, migrate the database.
 */
export default defineNitroPlugin(async () => {
  if (import.meta.dev) {
    migrate(useDB(), { migrationsFolder: "server/db/migrations" });
  }
});
