"use client";

/**
 * PUBLIC_INTERFACE
 * React hook to manage user authentication state.
 */
import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "@/app/api";
import { AuthUser } from "@/app/types";

type AuthReturn = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<string | null>;
  register: (username: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
  loading: boolean;
};

const USER_KEY = "notes-user";

/**
 * Simulate localStorage-based auth cache.
 */
export function useAuth(): AuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from localStorage/cookie on mount
  useEffect(() => {
    const stored = typeof window !== "undefined" && window.localStorage.getItem(USER_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // PUBLIC_INTERFACE
  const login = useCallback(async (email: string, password: string): Promise<string | null> => {
    try {
      const user: AuthUser = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setUser(user);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      return null;
    } catch (e) {
      setUser(null);
      if (typeof e === "object" && e !== null && "message" in e) {
        return (e as { message: string }).message || "Login failed";
      }
      return "Login failed";
    }
  }, []);

  // PUBLIC_INTERFACE
  const register = useCallback(async (username: string, email: string, password: string): Promise<string | null> => {
    try {
      const user: AuthUser = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      setUser(user);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      return null;
    } catch (e) {
      setUser(null);
      if (typeof e === "object" && e !== null && "message" in e) {
        return (e as { message: string }).message || "Register failed";
      }
      return "Register failed";
    }
  }, []);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(USER_KEY);
  }, []);

  return { user, login, register, logout, loading };
}
