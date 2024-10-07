import { type ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="flex items-center justify-center bg-gradient-to-b from-blue-950 via-red-200 to-blue-950">
      {children}
    </main>
  );
}
