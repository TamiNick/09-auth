"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthProvider from "../../components/AuthProvider/AuthProvider";
import TanStackProvider from "../../components/TanStackProvider/TanStackProvider";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <TanStackProvider>
      <AuthProvider>{children}</AuthProvider>
    </TanStackProvider>
  );
}
