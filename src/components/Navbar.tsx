import React, { useState } from 'react';
import DarkModeButton from './DarkModeButton';
import { Link } from 'react-router-dom';

interface NavbarProps {
  title?: string;
  className?: string;
  links?: { text: string; href: string }[];
}

function dark_mode_init() {
  const darkMode = localStorage.getItem('dark-mode') === 'true';
  if (darkMode) {
    document.querySelectorAll('.darkm').forEach((el) => {
      el.classList.add("dark:bg-gray-900")
      el.classList.add("dark:text-white")
    })
    document.querySelectorAll('.transparent-btn').forEach((el) => {
      el.classList.add("dark:bg-transparent")
      el.classList.add("dark:text-white")
    })
  } else {
    document.querySelectorAll('.darkm').forEach((el) => {
      el.classList.remove("dark:bg-gray-900")
      el.classList.remove("dark:text-white")
    })
    document.querySelectorAll('.transparent-btn').forEach((el) => {
      el.classList.remove("dark:bg-transparent")
      el.classList.remove("dark:text-white")
    })
  }  
}

const Navbar: React.FC<NavbarProps> = ({ title = 'My App', className = '', links = [] }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Initialize dark mode on component mount
  React.useEffect(() => {
    dark_mode_init();
  }
  , []);

  return (
    <nav className={className + " border"}>	
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="logo text-2xl font-bold">
          <a href="/">{title}</a>
        </div>

        {/* Hamburger menu (small screens) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            title="Menu"
            className={ className + " focus:outline-none"}
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
              <Link to={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>

        {/* Search and Login (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          	<input type="text" placeholder="Search..." className={className + " border border-gray-300 rounded px-2 py-1"} />
			
            <Link to="/login" className=" border border-gray-300 bg-transparent text-gray-600 px-4 py-2 rounded transparent-btn block text-center">
              Login
            </Link>			
          
            <Link to='/register' className=" border border-gray-300 bg-transparent text-gray-600 px-4 py-2 rounded transparent-btn block text-center">
              Register
            </Link>			
            <DarkModeButton />		
        </div>
		
      </div>

      {/* Mobile dropdown with animation */}
      <div className={className + ` md:hidden overflow-hidden transition-all duration-300 ease-in-out ${ isOpen ? 'max-h-96' : 'max-h-0' }`}>
        <ul className={className + " flex flex-col space-y-2 p-4"}>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.href}>{link.text}</Link>
            </li>
          ))}
          <li>
            <input type="text" placeholder="Search..." className={ className + " w-full p-2 rounded"}/>
          </li>
          <li>
            
              <Link to="/login" className="border border-gray-300 bg-transparent text-gray-600 px-4 py-2 rounded transparent-btn block text-center">
                Login
              </Link>
            
          </li>
          <li>            
              <Link to="/register" className="border border-gray-300 bg-transparent text-gray-600 px-4 py-2 rounded transparent-btn block text-center">
                Register
              </Link>            
          </li>
          <li>
            <DarkModeButton />
          </li>		 
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
