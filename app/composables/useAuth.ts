interface AuthResponse {
  account_id: string;
  allowed_project_ids: string[];
  created: string;
  email: string;
  expiration: string;
  expiration_period: string;
  id: string;
  legal_name: string;
  merchant_id: string;
  permissions: Record<string, any>;
  status: string;
}

export const useAuth = () => {
  const token = useCookie('auth_token');
  const user = useState<AuthResponse | null>('user', () => null);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response: AuthResponse = await $fetch(
        'https://api.dev.gingerpayments.com/v1/tokens/',
        {
          method: 'POST',
          body: credentials,
        }
      );
      token.value = response.id;
      user.value = response;
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    try {
      await $fetch('/api/register', {
        method: 'POST',
        body: data,
      });
      // After registration, perhaps auto-login or redirect
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
  };

  const isAuthenticated = computed(() => !!token.value);

  return { user, login, register, logout, isAuthenticated };
};
