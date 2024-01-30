export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: user } = await useFetch("/api/user");

  if (!user.value) {
    return navigateTo("/login");
  }
});
