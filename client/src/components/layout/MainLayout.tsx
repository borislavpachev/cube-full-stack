import { type ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col md:flex-row items-start">{children}</main>
  );
}
