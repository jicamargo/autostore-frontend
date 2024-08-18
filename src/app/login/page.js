"use client";

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { loginUser } from '@/utils/data-queries';

const LoginPage = () => {
  
  const { setIsAuthenticated, setUsername } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const data = await loginUser(email, password); // Usar la función importada

      localStorage.setItem('token', data.token); // Guardar el token en localStorage
      setIsAuthenticated(true);
      setUsername(data.username);

      router.push('/productos'); // Redirigir a la página de productos
    } catch (error) {
      localStorage.removeItem('token'); // Elimina cualquier rastro del token de localStorage
      setIsAuthenticated(false);
      setUsername('');
      setError(error.message); // Mostrar el mensaje de error
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-800">
      <form onSubmit={handleLogin} className="bg-white p-6 mx-4 rounded shadow-md w-full max-w-sm mb-28">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
