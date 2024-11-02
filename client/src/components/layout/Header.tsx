import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import {
  Button,
  LogoutButton,
  TooltipButton,
  TooltipContent,
} from '../buttons';
import Logo from '../Logo';
import {
  AdminIcon,
  HeartIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from '../icons';
import { useAuth } from '@/hooks';

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const shoppingCartItems = user?.shoppingCart?.reduce((count, item) => {
    count += item.quantity;
    return count;
  }, 0);

  return (
    <header>
      <nav className="h-auto md:h-20 space-y-3 md:space-y-0 p-5 md:p-0 flex flex-col md:flex-row items-center justify-center">
        <div className="w-1/4 flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex space-x-10 w-1/4 text-lg uppercase items-center justify-center">
          <NavLink
            to={`${ROUTES.PRODUCTS}/women`}
            className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
          >
            <p className="hover:font-medium">Women</p>
          </NavLink>
          <NavLink
            to={`${ROUTES.PRODUCTS}/men`}
            className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
          >
            <p className="hover:font-medium">Men</p>
          </NavLink>
        </div>
        <div className="flex space-x-5 w-2/4 items-center justify-center">
          <NavLink to={`${ROUTES.SEARCH}`}>
            <SearchIcon size={35} />
          </NavLink>
          <NavLink to={`${ROUTES.USER_PROFILE}/favorites`}>
            <HeartIcon size={35} />
          </NavLink>

          <NavLink to={ROUTES.SHOPPING_CART} className={`relative`}>
            <ShoppingCartIcon size={35} />
            <div className="absolute font-semibold text-xs -top-1 -right-2 bg-slate-200 rounded-full px-2">
              <span className={`${!shoppingCartItems ? 'hidden' : 'flex'}`}>
                {shoppingCartItems}
              </span>
            </div>
          </NavLink>

          {isAuthenticated && (
            <>
              <TooltipButton
                content={
                  <TooltipContent>
                    <LogoutButton />
                  </TooltipContent>
                }
              >
                <NavLink to={`${ROUTES.USER_PROFILE}/orders`}>
                  <UserIcon size={35} />
                </NavLink>
              </TooltipButton>

              {user?.role === 'Admin' && (
                <NavLink to={`${ROUTES.ADMIN}`}>
                  <AdminIcon size={35} />
                </NavLink>
              )}
            </>
          )}
          {!isAuthenticated && (
            <div>
              <Button onClick={() => navigate(`${ROUTES.LOGIN}`)}>Login</Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
