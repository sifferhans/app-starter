import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { sessionTable, userTable } from "../db/schema";

let _lucia: Lucia | null = null;

/**
 * Get the lucia instance.
 * If not yet instantiated, it will be instantiated first time.
 */
export function useLucia() {
  if (!_lucia) {
    const db = useDB();
    const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

    _lucia = new Lucia(adapter, {
      sessionCookie: {
        attributes: {
          secure: !import.meta.dev,
        },
      },
      getUserAttributes(attributes) {
        return {
          username: attributes.username,
          email: attributes.email,
        };
      },
    });
  }

  return _lucia;
}

/**
 * To get autocomplete for the `user` object,
 * we need to augment the lucia module.
 */
declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof useLucia>;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  username: string;
}
