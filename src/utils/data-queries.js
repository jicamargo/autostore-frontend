// src/utils/data-queries.js

// login de usuario
export const loginUser = async (email, password) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
  }

  return await response.json();
};


// Función para obtener la lista de productos
export const fetchProductos = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/v1/productos`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar un producto por ID
export const deleteProducto = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/v1/productos/${id}`, {
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

    return { success: true, message: 'Producto eliminado correctamente' };
  } catch (error) {
    return { success: false, message: error };
  }
};

// función para crear un producto
export const createProducto = async ({ sku, nombre, descripcion, cantidad, precio }) => {
  const token = localStorage.getItem('token');

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/v1/productos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sku,
        nombre,
        descripcion,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio),
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No estás autorizado para realizar esta acción');
      }
      throw new Error('Error al intentar crear el producto');
    }

    // return response.json(); // Devuelve la respuesta JSON si la creación es exitosa
    return { success: true, message: 'Producto creado correctamente' };
  } catch (error) {
    return { success: false, message: error };
  }
};

// obtener los detalles de un producto por ID
export const fetchProductoById = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/v1/productos/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log(response.status);
      if (response.status === 401) {
        throw new Error('No estas autorizado para realizar esta acción');
      }
      else if (response.status === 404) {
        throw new Error('Producto no encontrado');
      }
      else {
        throw new Error('Error al obtener los detalles del producto');
      }
    }

    return { success: true, data: response.json() };
  } catch (error) {
    throw error;
  }
};

// actualizar un producto por ID
export const updateProducto = async (id, { sku, nombre, descripcion, cantidad, precio }) => {
  const token = localStorage.getItem('token');

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/v1/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sku,
        nombre,
        descripcion,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio),
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No estás autorizado para realizar esta acción');
      }
      throw new Error('Error al intentar actualizar el producto');
    }

    return { success: true, message: 'Producto actualizado correctamente' };

  } catch (error) {
    return { success: false, message: error };
  }
};
