interface User {
  id: number;
  name: string;
  email: string;
}

export const useAuth = () => {
  const user = useState<User | null>('user', () => null);

  const login = (data: User) => {
    user.value = data;
  };

  const logout = () => {
    user.value = null;
  };

  return { user, login, logout };
};
