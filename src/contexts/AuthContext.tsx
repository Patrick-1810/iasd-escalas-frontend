import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8001/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@IASDEscalas:token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface User {
  id: string;
  nome: string;
  email: string;
  role: "VIEW_ONLY" | "ADMIN_LEADER";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signed: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("@IASDEscalas:token");
    const storedUser = localStorage.getItem("@IASDEscalas:user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    
    const { token: receivedToken, user: receivedUser } = response.data;

    localStorage.setItem("@IASDEscalas:token", receivedToken);
    localStorage.setItem("@IASDEscalas:user", JSON.stringify(receivedUser));

    setToken(receivedToken);
    setUser(receivedUser);
  };

  const logout = () => {
    localStorage.removeItem("@IASDEscalas:token");
    localStorage.removeItem("@IASDEscalas:user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}