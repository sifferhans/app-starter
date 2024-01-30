import type { User } from "lucia";

export function useAuth() {
  const user = useState<User | null>("user", () => null);

  async function login(email: string, password: string) {
    try {
      await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });
    } catch {}
  }

  return {
    user,
  };
}
