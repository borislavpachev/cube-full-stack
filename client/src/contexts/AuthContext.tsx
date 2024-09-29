import { createContext, type ReactNode, useState } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({ user: null });

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
