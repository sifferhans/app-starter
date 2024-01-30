import { migrate } from "drizzle-orm/libsql/migrator";

export default defineNitroPlugin(async () => {
  if (import.meta.dev) {
    migrate(useDB(), { migrationsFolder: "server/db/migrations" });
  }
});
