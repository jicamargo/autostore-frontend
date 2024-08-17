"use client";

import { useState, useContext } from 'react';
import { Bars3Icon, XMarkIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { username } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token al cerrar sesión
    setIsAuthenticated(false);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-neutral-800 text-white w-full z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <div className='flex flex-row justify-between'>
          <button className="sm:hidden absolute left-6" onClick={toggleMenu}>
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <div className='flex items-baseline' >
            <div className="text-lg font-bold">
              <span className='text-orange-500 '>
                Autostore
              </span>
            </div>
            {isAuthenticated ? (<p className='font-semibold text-sm'> &nbsp; {username}</p>) : null}
          </div>

        </div>
        <nav className={`flex ${menuOpen ? 'block' : 'hidden'} sm:block`}>
          <ul className="flex flex-col sm:flex-row">
            <li className="p-2">
              <a href="/productos" className="hover:underline">Productos</a>
            </li>
            <li className="p-2">
                {isAuthenticated ? (
                  <div>
                    <button onClick={handleLogout} className="flex items-center">
                      <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                      <span className="ml-2">Cerrar sesión</span>
                    </button>
                  </div>
                ) : (
                  <a href="/login" className="flex items-center">
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                    <span className="ml-2">Iniciar sesión</span>
                  </a>
                )}
              </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
