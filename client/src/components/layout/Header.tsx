import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';

export default function Header() {
  return (
    <header className="flex bg-secondary items-center justify-around">
      <div className="flex space-x-5 w-2/5 items-center justify-center">
        <p>Women</p>
        <p>Men</p>
      </div>

      <div>
        <img
          src="/images/cube-logo.png"
          alt="logo"
          className="rounded-2xl p-2 w-1/3"
        />
      </div>

      <ul className="flex flex-col md:flex-row space-x-5 w-2/5 items-center justify-center">
        <li>
          <input className="rounded text-2xl px-2" placeholder="Search" />
        </li>
        <li>
          <NavLink to={ROUTES.FAVORITES}>Fav</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.SHOPPING_CART}>Cart</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.USER_PROFILE}>Profile</NavLink>
        </li>
      </ul>
    </header>
  );
}
