// src/components/__tests__/Header.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../src/components/Header';
import { AuthContext } from '../src/context/AuthContext';

// Mock para el contexto de autenticación
const mockAuthContext = {
  isAuthenticated: false,
  setIsAuthenticated: jest.fn(),
  username: '',
};

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia cualquier mock previo
  });

  test('debe mostrar el logo de Autostore', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Header />
      </AuthContext.Provider>
    );
    expect(screen.getByText('Autostore')).toBeInTheDocument();
  });

  test('debe mostrar el botón "Iniciar sesión" cuando el usuario no está autenticado', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Header />
      </AuthContext.Provider>
    );
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  test('debe mostrar el botón "Cerrar sesión" cuando el usuario está autenticado', () => {
    const authenticatedContext = { ...mockAuthContext, isAuthenticated: true, username: 'Jorge' };
    
    render(
      <AuthContext.Provider value={authenticatedContext}>
        <Header />
      </AuthContext.Provider>
    );
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
    expect(screen.getByText('Jorge')).toBeInTheDocument();
  });

  test('debe cambiar el estado del menú al hacer clic en el botón de menú', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Header />
      </AuthContext.Provider>
    );

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('debe llamar a handleLogout y setIsAuthenticated cuando se hace clic en "Cerrar sesión"', () => {
    const authenticatedContext = { ...mockAuthContext, isAuthenticated: true, username: 'Jorge' };

    render(
      <AuthContext.Provider value={authenticatedContext}>
        <Header />
      </AuthContext.Provider>
    );

    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);

    expect(mockAuthContext.setIsAuthenticated).toHaveBeenCalledWith(false);
  });
});
