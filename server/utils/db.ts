import { createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "~/server/db/schema";

let _db: LibSQLDatabase<typeof schema> | null = null;

/**
 * Get the drizzle database instance.
 * If not yet instantiated, it will be instantiated first time.
 */
export function useDB() {
  if (!_db) {
    const libsql = createClient({
      url: "file:server/database.db",
    });
    _db = drizzle(libsql, { schema });
  }

  return _db;
}
