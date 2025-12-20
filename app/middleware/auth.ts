export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, fetch } = useUserSession();

  // Fetch session dari server
  await fetch();

  if (!loggedIn.value) {
    return navigateTo("/login");
  }
});
