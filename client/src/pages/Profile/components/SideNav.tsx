import { ROUTES } from '@/constants';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { useContext } from 'react';
import SideNavItem from './SideNavItem';
import {
    HeartIcon,
  LocationIcon,
  LockIcon,
  PackageIcon,
  UserIcon,
} from '@/components/icons';

export default function SideNav() {
  const { user } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="flex flex-col min-w-sm">
      <div className="border-2 border-b-0 p-3 space-y-1">
        <p>Hello 👋</p>
        <p className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
      </div>
      <nav className="flex flex-col border-2 py-5">
        <SideNavItem
          to={`${ROUTES.USER_PROFILE}/orders`}
          icon={<PackageIcon fillColor="white" />}
        >
          My Orders
        </SideNavItem>
        <SideNavItem
          to={`${ROUTES.USER_PROFILE}/favorites`}
          icon={<HeartIcon fillColor="white" />}
        >
          My Favorites
        </SideNavItem>
        <SideNavItem
          to={`${ROUTES.USER_PROFILE}/details`}
          icon={<UserIcon fillColor="white" />}
        >
          Personal Information
        </SideNavItem>
        <SideNavItem
          to={`${ROUTES.USER_PROFILE}/address`}
          icon={<LocationIcon fillColor="white" />}
        >
          Manage Address
        </SideNavItem>
        <SideNavItem
          to={`${ROUTES.USER_PROFILE}/security`}
          icon={<LockIcon fillColor="white" />}
        >
          Security
        </SideNavItem>
      </nav>
    </div>
  );
}
