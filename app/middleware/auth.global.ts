export default defineNuxtRouteMiddleware(to => {
  const { isAuthenticated } = useAuth();

  // Разрешаем доступ к login/register
  if (to.path === '/login' || to.path === '/register' || to.path === '/register-verify') return;

  // Если пользователь не авторизован — отправляем на /login
  if (!isAuthenticated.value) {
    return navigateTo('/login');
  }
});
