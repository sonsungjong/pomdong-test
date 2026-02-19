import type { ReactNode } from "react";

interface ServiceLayoutProps {
  children: ReactNode;
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return <>{children}</>;
}
