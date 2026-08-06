/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/authApi";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((res) => {
        if (!active) return;
        const current = res.data?.data || null;
        setUser(current);
        if (current) {
          localStorage.setItem("user", JSON.stringify(current));
        } else {
          localStorage.removeItem("user");
        }
      })
      .catch(() => {
        if (!active) return;
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    const data = res.data?.data;
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    }
    return data;
  };

  const register = async (userData) => {
    const res = await registerUser(userData);
    const data = res.data?.data;
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    }
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
