// JORGE CAMARGO - 2024-08-16
// Este componente muestra una lista de productos y permite filtrarlos por SKU o Nombre.
// El enfoque en el Fetch de los datos es para casos de uso en los que son pocos los registros
// y no se requiere paginación.
// Para casos de uso con muchos registros, recomiendo implementar paginacion 
// Y abrir la vista vacia y cargar los datos de acuerdo a lo que usuario solicite en el filtro.
// un debounce para evitar realizar peticiones al servidor en cada cambio de texto en el input.


"use client";

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { setFlashMessage } from '../../utils/flashMessage';


const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [filter, setFilter] = useState('');

  
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/productos', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => setProductos(data))
    .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    producto.sku.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/productos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setProductos(productos.filter((producto) => producto.id !== id));
          setFlashMessage({message: 'Producto eliminado correctamente', type: 'success' });
        } else if (response.status === 401) {
          setFlashMessage({message: 'No estas autorizado para realizar esta acción ', type: 'error' });
        } else {
          setFlashMessage({message: 'Error al intentar eliminar el producto', type: 'error' });
        }
      } catch (error) {
        setFlashMessage({message: 'Error en la solicitud de eliminar el producto', type: 'error' });
      }
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <input
        type="text"
        placeholder="Filtrar por SKU o Nombre"
        value={filter}
        onChange={handleFilterChange}
        className="border p-2 rounded mb-4 w-full"
      />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">SKU</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Cantidad</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.map((producto) => (
            <tr key={producto.id}>
              <td className="py-2 px-4 border-b">{producto.sku}</td>
              <td className="py-2 px-4 border-b">{producto.nombre}</td>
              <td className="py-2 px-4 border-b">{producto.descripcion}</td>
              <td className="py-2 px-4 border-b">{producto.cantidad}</td>
              <td className="py-2 px-4 border-b">{producto.precio}</td>
              <td className="flex flex-col py-2 px-4 border-b gap-2">
                <button className="w-full bg-orange-500 text-white p-2 rounded flex items-center justify-center
                  outline outline-offset-2 hover:outline-orange-500 hover:outline-4">
                  <PencilIcon className="h-5 w-5" />
                  <span className="ml-2">Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(producto.id)}
                  className="w-full bg-orange-700 text-white p-2 rounded flex items-center justify-center outline outline-offset-2 hover:outline-orange-700 hover:outline-4"
                >
                  <TrashIcon className="h-5 w-5" />
                  <span className="ml-2">Eliminar</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosPage;
