import React, { useState } from 'react';
import './Navbar.css';

interface NavbarProps {
  title?: string;
  links?: { text: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ title = 'My App', links = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="logo text-2xl font-bold">
          <a href="/">{title}</a>
        </div>

        {/* Hamburger menu (small screens) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            title="Menu"
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-4">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>

        {/* Search and Login (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <input type="text" placeholder="Search..." className="p-2 rounded" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      </div>

      {/* Mobile dropdown with animation */}
      <div className={`md:hidden bg-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${ isOpen ? 'max-h-96' : 'max-h-0' }`}>
        <ul className="flex flex-col space-y-2 p-4">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
          <li>
            <input type="text" placeholder="Search..." className="w-full p-2 rounded"/>
          </li>
          <li>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
