import { PackageIcon, UserIcon } from '@/components/icons';
import { Sidebar, SidebarItem } from '@/components/layout';
import { ROUTES } from '@/constants';

export default function AdminNav() {
  return (
    <Sidebar>
      <SidebarItem
        to={`${ROUTES.ADMIN}/users`}
        icon={<UserIcon fillColor="white" />}
      >
        Users
      </SidebarItem>
      <SidebarItem
        to={`${ROUTES.ADMIN}/products`}
        icon={<PackageIcon fillColor="white" />}
      >
        Products
      </SidebarItem>
    </Sidebar>
  );
}
