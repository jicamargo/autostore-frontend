"use client";

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-800 text-white w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <div className='flex flex-row justify-between'>
          <button className="sm:hidden absolute left-6" onClick={toggleMenu}>
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <div className="text-lg font-bold">
            Autostore
          </div>
        </div>
        <nav className={`flex ${menuOpen ? 'block' : 'hidden'} sm:block`}>
          <ul className="flex flex-col sm:flex-row">
            <li className="p-2">
              <a href="/productos" className="hover:underline">Productos</a>
            </li>
            <li className="p-2">
              <a href="/mi-cuenta" className="hover:underline">Mi Cuenta</a>
            </li>
            <li className="p-2">
              <a href="/login" className="hover:underline">Sign In/Sign Out</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
