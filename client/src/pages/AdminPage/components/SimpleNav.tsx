import { SideNavItem } from '@/components';
import { PackageIcon, UserIcon } from '@/components/icons';
import { ROUTES } from '@/constants';

export default function SimpleNav() {
  return (
    <div className="flex flex-col min-w-sm">
      <nav className="flex flex-col border-2 py-5 rounded">
        <SideNavItem
          to={`${ROUTES.ADMIN}/users`}
          icon={<UserIcon fillColor="white" />}
        >
          Users
        </SideNavItem>
        <SideNavItem
          to={`${ROUTES.ADMIN}/products`}
          icon={<PackageIcon fillColor="white" />}
        >
          Products
        </SideNavItem>
      </nav>
    </div>
  );
}
