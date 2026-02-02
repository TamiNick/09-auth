"use client";

import { useEffect, useState, ReactNode } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const isSessionValid = await checkSession();

        if (isSessionValid) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (err) {
        console.error("Session check failed:", err);
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
