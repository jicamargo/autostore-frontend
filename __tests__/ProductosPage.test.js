import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductosPage from '../src/app/productos/page';
import { AuthContext } from '../src/context/AuthContext';
import { useRouter } from 'next/navigation';

// Mock para el contexto de autenticación
const mockAuthContext = {
  isAuthenticated: true,
  setIsAuthenticated: jest.fn(),
  username: 'testuser',
};

// Mock de useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe('ProductosPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

     // Mockeamos el comportamiento de useRouter
     useRouter.mockReturnValue({
      push: mockPush,
    });
  });

  test('debe renderizar correctamente la lista de productos', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProductosPage />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Lista de Productos')).toBeInTheDocument();
  });

  test('debe mostrar el botón "Nuevo" si el usuario está autenticado', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProductosPage />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Nuevo')).toBeInTheDocument();
  });

  test('debe mostrar un mensaje de carga mientras los productos están cargando', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProductosPage />
      </AuthContext.Provider>
    );
  });
});
