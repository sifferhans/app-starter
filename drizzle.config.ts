import type { Config } from "drizzle-kit";

export default {
  driver: "libsql",
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  dbCredentials: {
    url: "file:./server/database.db",
  },
} satisfies Config;
