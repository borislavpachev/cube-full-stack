import { type ReactNode } from 'react';

type SidebarProps = {
  header?: ReactNode;
  children: ReactNode;
};
export default function Sidebar({ header, children }: SidebarProps) {
  return (
    <aside className="flex flex-col min-w-sm">
      {header}
      <nav className="flex flex-col border-2 py-5">{children}</nav>
    </aside>
  );
}
