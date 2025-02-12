import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../modules/auth/data';

type NavLink = {
  to: string;
  text: string;
};

type NavProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  navLinks: NavLink[];
  email?: string;
};

const MenuIcon = () => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

type NavLinksProps = {
  navLinks: NavLink[];
  email: string;
  logOut: VoidFunction;
};
const NavLinks: React.FunctionComponent<NavLinksProps> = ({ navLinks, email, logOut }) => (

  <div className="flex items-center space-x-4">
    {email ? (
      <>
        {navLinks.map(({ to, text }) => (
          <Link key={to} to={to} className="text-gray-700 hover:text-gray-900">
            {text}
          </Link>
        ))}
        <Link to="/" className="text-gray-700 hover:text-gray-900" onClick={logOut}>
          Sign Out
        </Link>

        <p className='text-gray-500'>{email}</p>
      </>
    ) : (
      <Link to="/login" className="text-gray-700 hover:text-gray-900">
        Login
      </Link>
    )}
  </div>
);

export const Navigation: React.FC<NavProps> = ({ isOpen, toggleMenu, navLinks, email }) => (
  <nav className="border-b-2 border-black">
    <div className="flex items-center justify-between h-16">
      <Link to="/" className="text-gray-700 drop-shadow-xl text-xl font-bold">
        Blog Posts
      </Link>
      <div className="hidden md:block">
        <NavLinks navLinks={navLinks} email={email ?? ''} logOut={() => db.auth.signOut()} />
      </div>
      <div className="-mr-2 flex md:hidden">
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset transition duration-150 ease-in-out"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </div>
    <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavLinks navLinks={navLinks} email={email ?? ''} logOut={() => db.auth.signOut()} />
      </div>
    </div>
  </nav>
);
