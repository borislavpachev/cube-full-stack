import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type SideNavItemProps = {
  to: string;
  icon?: JSX.Element;
  children: ReactNode;
};

export default function SideNavItem({ to, icon, children }: SideNavItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive ? 'profile-nav-link' : ''
        } flex items-center justify-start line-clamp-1 transition-colors ease-in-out duration-300 hover:bg-black hover:text-white p-3`
      }
      to={to}
    >
      <span className='bg-transparent mr-2'>{icon}</span>
      {children}
    </NavLink>
  );
}
