import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Posts from './routes/Posts';
import BlogPost from './routes/BlogPost';

type NavLink = {
  to: string;
  text: string;
};

type NavProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const navLinks: NavLink[] = [
  { to: '/', text: 'Home' },
  { to: '/posts', text: 'Posts' },
];

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

const NavLinks = () => (
  <div className="flex items-center space-x-4">
    {navLinks.map(({ to, text }) => (
      <Link key={to} to={to} className="text-gray-700 hover:text-gray-900">
        {text}
      </Link>
    ))}
  </div>
);

const Nav: React.FC<NavProps> = ({ isOpen, toggleMenu }) => (
  <nav className="border-b-2 border-black">
    <div className="flex items-center justify-between h-16">
      <Link to="/" className="text-gray-700 drop-shadow-xl text-xl font-bold">
        Blog Posts
      </Link>
      <div className="hidden md:block">
        <NavLinks />
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
        <NavLinks />
      </div>
    </div>
  </nav>
);

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="container mx-auto px-4">
      <Router>
        <Nav isOpen={isOpen} toggleMenu={toggleMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<BlogPost />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
