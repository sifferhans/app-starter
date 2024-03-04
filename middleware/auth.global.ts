export default defineNuxtRouteMiddleware(async (to, from) => {
  const users = await useRequestFetch()("/api/users");
  const data = await useRequestFetch()("/api/user");
  const { user } = useAuth();

  if (data) {
    user.value = data;
  }

  const isAuthPage =
    to.path.includes("login") ||
    to.path.includes("signup") ||
    to.path.includes("setup");

  // Redirect to login page if user is not authenticated.
  if (!user.value && !isAuthPage) {
    if (to.path !== "/" && to.path.endsWith("/")) {
      return abortNavigation();
    }

    if (users.length) {
      return navigateTo("/login");
    }

    return navigateTo("/setup");
  }

  // Redirect to home page if user is authenticated.
  if (user.value && isAuthPage) {
    return navigateTo("/", { redirectCode: 302 });
  }
});
