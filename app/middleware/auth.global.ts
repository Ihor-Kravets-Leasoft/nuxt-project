export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth();

  // Разрешаем доступ к login/register
  if (to.path === "/login" || to.path === "/register") return;

  // Если пользователь не авторизован — отправляем на /login
  if (!user.value) {
    return navigateTo("/login");
  }
});
