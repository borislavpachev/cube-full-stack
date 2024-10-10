import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black p-5 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="text-lg">
          <Link to="mailto:cube@cube.com" className="hover:underline">
            Contact Us
          </Link>
        </div>
        <nav className="flex flex-col items-start justify-center">
          <Link className="hover:underline" to="/">
            Terms of Service
          </Link>
          <Link className="hover:underline" to="/">
            Privacy policy
          </Link>
        </nav>
      </div>
      <div className="mt-6 text-center border-t border-white w-full">
        <p className="mt-2">{`Copyright © ${year} - All right reserved by CUBE`}</p>
      </div>
    </footer>
  );
}
