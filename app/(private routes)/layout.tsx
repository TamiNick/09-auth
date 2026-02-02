import { ReactNode } from "react";
import AuthProvider from "../../components/AuthProvider/AuthProvider";
import TanStackProvider from "../../components/TanStackProvider/TanStackProvider";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <TanStackProvider>
      <AuthProvider>{children}</AuthProvider>
    </TanStackProvider>
  );
}
