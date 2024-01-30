import type { User } from "lucia";

export function useAuth() {
  const user = useState<User | null>("user", () => null);

  async function signup(email: string, password: string, username?: string) {
    try {
      await $fetch("/api/auth/signup", {
        method: "POST",
        body: {
          email,
          password,
          username,
        },
      });

      await navigateTo("/");
    } catch {}
  }

  async function login(email: string, password: string) {
    try {
      await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      await navigateTo("/");
    } catch {}
  }

  async function logout() {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
      await navigateTo("/login");
    } catch {}
  }

  return {
    user,
    signup,
    login,
    logout,
  };
}
