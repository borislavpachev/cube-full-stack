import { Sidebar, SidebarItem } from '@/components/layout';
import { useAuth } from '@/hooks';
import {
  HeartIcon,
  LocationIcon,
  LockIcon,
  PackageIcon,
  UserIcon,
} from '@/components/icons';
import { ROUTES } from '@/constants';

export default function ProfileNav() {
  const { user } = useAuth();

  return (
    <Sidebar
      header={
        <div className="border-2 border-b-0 p-3 space-y-1">
          <p>Hello 👋</p>
          <p className="font-semibold">
            {user ? `${user?.firstName} ${user?.lastName}` : 'User'}
          </p>
        </div>
      }
    >
      <SidebarItem
        to={`${ROUTES.USER_PROFILE}/orders`}
        icon={<PackageIcon fillColor="white" />}
      >
        My Orders
      </SidebarItem>
      <SidebarItem
        to={`${ROUTES.USER_PROFILE}/favorites`}
        icon={<HeartIcon fillColor="white" />}
      >
        My Favorites
      </SidebarItem>
      <SidebarItem
        to={`${ROUTES.USER_PROFILE}/details`}
        icon={<UserIcon fillColor="white" />}
      >
        Personal Information
      </SidebarItem>
      <SidebarItem
        to={`${ROUTES.USER_PROFILE}/address`}
        icon={<LocationIcon fillColor="white" />}
      >
        Manage Address
      </SidebarItem>
      <SidebarItem
        to={`${ROUTES.USER_PROFILE}/security`}
        icon={<LockIcon fillColor="white" />}
      >
        Security
      </SidebarItem>
    </Sidebar>
  );
}
