import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { Button, LogoutButton } from '../buttons';
import Logo from '../Logo';
import SearchComponent from '../SearchComponent';
import { HeartIcon, ShoppingCartIcon, UserIcon } from '../icons';

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  return (
    <header>
      <nav className="h-20 flex items-center justify-around">
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
          <SearchComponent />

          <NavLink to={`${ROUTES.USER_PROFILE}/favorites`}>
            <HeartIcon size={35} />
          </NavLink>

          <NavLink to={ROUTES.SHOPPING_CART}>
            <ShoppingCartIcon size={35} />
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to={`${ROUTES.USER_PROFILE}/orders`}>
                <UserIcon size={35} />
              </NavLink>
              <LogoutButton />
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
