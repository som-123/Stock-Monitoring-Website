import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { basicAxios } from "../services/basicAxios";

interface User {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          const response = await basicAxios("/api/user/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const user = response.data;
          setUser(user);
        }
      } catch (error) {
        if (
          (error as any).response &&
          ((error as any).response.status === 401 ||
            (error as any).response.status === 403)
        ) {
          try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
              const refreshResponse = await basicAxios("/api/refresh/", {
                method: "POST",
                refresh: refreshToken,
              });
              const newAccessToken = refreshResponse.data.access;
              localStorage.setItem("access_token", newAccessToken);
              const retryResponse = await basicAxios("/api/user/", {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              const user = retryResponse.data;
              setUser(user);
            } else {
              console.error("No refresh token available");
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            setUser(null);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
          }
        } else {
          console.error("Authentication check failed:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData: User) => {
    try {
      const response = await basicAxios("/api/login/", {
        method: "POST",
        data: userData,
      });
      const { user, access, refresh } = response.data;
      setUser(user);
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
