export default defineNuxtRouteMiddleware(async (to, from) => {
  const data = await useRequestFetch()("/api/user");
  const { user } = useAuth();

  if (data) {
    user.value = data;
  }

  const isAuthPage = to.path.includes("login") || to.path.includes("signup");

  // Redirect to login page if user is not authenticated.
  if (!user.value && !isAuthPage) {
    if (to.path !== "/" && to.path.endsWith("/")) {
      return abortNavigation();
    }
    return navigateTo("/login", { redirectCode: 401 });
  }

  // Redirect to home page if user is authenticated.
  if (user.value && isAuthPage) {
    return navigateTo("/", { redirectCode: 302 });
  }
});
