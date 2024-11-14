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
  CloseIcon,
  HamburgerIcon,
  HeartIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from '../icons';
import { useAuth } from '@/hooks';
import { useState } from 'react';

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const shoppingCartItems = user?.shoppingCart?.reduce((count, item) => {
    count += item.quantity;
    return count;
  }, 0);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav
        className="flex flex-col md:flex-row h-auto p-5 md:p-0 md:h-20 
        items-center justify-center"
      >
        <div className="flex w-full px-10 md:px-0 md:w-1/4 items-center justify-between md:justify-center">
          <Logo />
          <div className="md:hidden flex items-center" onClick={handleIsOpen}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </div>
        </div>

        <div
          className={`${
            isOpen ? 'flex' : 'hidden md:flex'
          } flex w-full md:w-1/4 mt-2 md:mt-0 py-2 md:py-0 border-y md:border-y-0 space-x-10 text-lg uppercase items-center justify-center`}
        >
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

        <div
          className={`${
            isOpen ? 'flex flex-col mt-2' : 'hidden md:flex'
          } md:flex-row space-y-5 md:space-y-0 md:space-x-5 md:w-2/4 items-center justify-center`}
        >
          <NavLink to={`${ROUTES.SEARCH}`} className="flex items-center">
            <span className="text-xl mr-2 md:hidden">Search</span>
            <SearchIcon size={35} />
          </NavLink>
          <NavLink
            to={`${ROUTES.USER_PROFILE}/favorites`}
            className="flex items-center"
          >
            <span className="text-xl mr-2 md:hidden">Favorites</span>

            <HeartIcon size={35} />
          </NavLink>

          <NavLink
            to={ROUTES.SHOPPING_CART}
            className={`relative flex items-center`}
          >
            <span className="text-xl mr-2 md:hidden">Shopping cart</span>

            <ShoppingCartIcon size={35} />
            <div className="absolute font-semibold text-xs -top-1 -right-2 bg-slate-200 rounded-full px-2">
              <span className={`${!shoppingCartItems ? 'hidden' : 'flex'}`}>
                {shoppingCartItems}
              </span>
            </div>
          </NavLink>

          {isAuthenticated && (
            <>
              <div className="hidden md:flex">
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
              </div>
              <div className="flex md:hidden">
                <NavLink
                  to={`${ROUTES.USER_PROFILE}/orders`}
                  className="flex items-center"
                >
                  <span className="text-xl mr-2 md:hidden">My Profile</span>
                  <UserIcon size={35} />
                </NavLink>
              </div>

              {user?.role === 'Admin' && (
                <NavLink to={`${ROUTES.ADMIN}`} className="flex items-center">
                  <span className="text-xl mr-2 md:hidden">Admin</span>
                  <AdminIcon size={35} />
                </NavLink>
              )}
              <div className="flex md:hidden">
                <LogoutButton />
              </div>
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
