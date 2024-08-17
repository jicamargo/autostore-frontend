// src/utils/data-queries.js

// Función para obtener la lista de productos
export const fetchProductos = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/productos', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para eliminar un producto por ID
export const deleteProducto = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:3000/api/v1/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No estás autorizado para realizar esta acción');
      }
      throw new Error('Error al intentar eliminar el producto');
    }

    return true; // Devuelve true si se eliminó correctamente
  } catch (error) {
    console.error(error);
    throw error;
  }
};
