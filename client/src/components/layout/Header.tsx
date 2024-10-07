import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Input } from '../form';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { Button } from '../buttons';

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  return (
    <header className="flex h-16 bg-secondary items-center justify-around">
      <div className="w-1/4 flex items-center justify-center">
        <h1 className='font-gope'
          onClick={() => {
            navigate('/');
          }}
        >
          CUBE
        </h1>
      </div>
      <div className="flex space-x-7 w-1/4 items-center justify-center">
        <p>Women</p>
        <p>Men</p>
      </div>
      <div className="w-1/4 mt-5">
        <Input value="" onChange={() => {}} placeholder="Search" />
      </div>
      <ul className="flex space-x-5 w-1/4 items-center justify-center">
        <li>
          <NavLink to={ROUTES.FAVORITES}>
            <img
              src="/images/heart.svg"
              alt="Favorites"
              width={35}
              height={35}
            />
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.SHOPPING_CART}>
            <img
              src="/images/shopping-cart.svg"
              alt="Shopping cart"
              width={35}
              height={35}
            />
          </NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <NavLink to={ROUTES.USER_PROFILE}>
              <img
                src="/images/user-profile.svg"
                alt="User profile"
                width={35}
                height={35}
              />
            </NavLink>
          ) : (
            <div className="flex items-center">
              <Button disabled={false} onClick={() => navigate('/login')}>
                Login
              </Button>
            </div>
          )}
        </li>
      </ul>
    </header>
  );
}
