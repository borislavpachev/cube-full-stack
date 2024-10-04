import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Input } from '../form';

export default function Header() {
  return (
    <header className="flex h-16 bg-secondary items-center justify-around">
      <div className="w-1/4 flex items-center justify-center">
        <h1>LOGO</h1>
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
          <NavLink to={ROUTES.USER_PROFILE}>
            <img
              src="/images/user-profile.svg"
              alt="User profile"
              width={35}
              height={35}
            />
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
