import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { sessionTable, userTable } from "../db/schema";

let _lucia: Lucia | null = null;

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
