export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuth();

  if (user.value?.role !== "admin") {
    return navigateTo("/");
  }
});
