"use client";

import { useState, useContext } from 'react';
import { Bars3Icon, XMarkIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  CubeIcon } from '@heroicons/react/24/outline';
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
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 md:p-2">
        <div className='flex flex-row justify-between py-2'>
          <button className="sm:hidden absolute left-6 top-4 p-2 hover:underline hover:bg-orange-300 hover:text-orange-700  " onClick={toggleMenu}>
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
            <li className="">
              <a href="/productos" className="p-2 flex items-center hover:underline hover:bg-orange-300 hover:text-orange-700">
                <div className='flex flex-col justify-center items-center'>
                  <CubeIcon className="h-6 w-6" />
                  <span className="text-sm">Productos</span>
                </div>
              </a>
            </li>
            <li className="">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="p-2 flex items-center hover:underline hover:bg-orange-300 hover:text-orange-700">
                    <div className='flex flex-col justify-center items-center'>
                      <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                      <span className="text-sm">Cerrar sesión</span>
                    </div>
                  </button>
                ) : (
                  <a href="/login" className="p-2 flex items-center hover:underline hover:bg-orange-300 hover:text-orange-700">
                    <div className='flex flex-col justify-center items-center'>
                      <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
                      <span className="text-sm">Iniciar sesión</span>
                    </div>
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
