export default defineNuxtRouteMiddleware(async (to, from) => {
  const users = await useRequestFetch()("/api/users");

  if (!users.length) {
    return navigateTo("/setup");
  }
});
