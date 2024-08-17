// JORGE CAMARGO - 2024-08-16
// Este componente muestra una lista de productos y permite filtrarlos por SKU o Nombre.
// El enfoque en el Fetch de los datos es para casos de uso en los que son pocos los registros
// y no se requiere paginación.
// Para casos de uso con muchos registros, recomiendo implementar paginacion 
// Y abrir la vista vacia y cargar los datos de acuerdo a lo que usuario solicite en el filtro.
// un debounce para evitar realizar peticiones al servidor en cada cambio de texto en el input.


"use client";

import { useState, useEffect, useContext } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { setFlashMessage } from '../../utils/flashMessage';
import { fetchProductos, deleteProducto } from '../../utils/data-queries';
import LoadingLocal from '../../components/LoadingLocal';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';

const ProductosPage = () => {

  const { isAuthenticated } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true); 

  const router = useRouter();

  // este manejo de la carga de productos puede ser optimizado haciendo 
  // la carga desde el lado del servidor y no desde el cliente
  useEffect(() => {
    setIsLoading(true); // Indica que la carga ha comenzado
    const loadProductos = async () => {
      try {
        const data = await fetchProductos();
        setProductos(data);
      } catch (error) {
        setFlashMessage({ message: 'Error al obtener los productos', type: 'error' });
      } finally {
        setIsLoading(false); // Indica que la carga ha finalizado
      }
    };

    loadProductos();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    producto.sku.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (confirmed) {
      try {
        const result = await deleteProducto(id);

        if (result.success) {
          setProductos(productos.filter((producto) => producto.id !== id));
          setFlashMessage({ message: 'Producto eliminado correctamente', type: 'success' });
        } else {
          setFlashMessage({ message: result.message, type: 'error' });
        }
      } catch (error) {
        setFlashMessage({ message: error.message, type: 'error' });
      }
    }
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      <div className="flex justify-between items-center mb-4 pr-4">
        <h1 className="text-2xl font-bold">Lista de Productos</h1>
        {isAuthenticated && (
          <button
            className="md:min-w-24 bg-orange-400 text-white p-2 rounded flex items-center justify-center
                      hover:bg-orange-500 hover:outline outline-offset-2 hover:outline-orange-500 hover:outline-4"
            onClick={() => router.push('/productos/nuevo')}
          >
            <PlusIcon className="h-5 w-5" />
            <span className="ml-2">Nuevo</span>
          </button>
        )}
      </div>
      
      { isLoading ? (
        <LoadingLocal />
      ) : (
        <>
        <input
          type="text"
          placeholder="Filtrar por SKU o Nombre"
          value={filter}
          onChange={handleFilterChange}
          className="border p-2 rounded mb-4 w-full"
        />
        <div className="overflow-scroll md:overflow-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className='border-b'>
                <th className="py-2 px-2 md:px-4">SKU</th>
                <th className="py-2 px-2 md:px-4">Nombre</th>
                <th className="py-2 px-2 md:px-4">Descripción</th>
                <th className="py-2 px-2 md:px-4">Cant.</th>
                <th className="py-2 px-2 md:px-4">Precio</th>

                {/* // oculta esta columna si no esta autenticado */}
                {isAuthenticated && <th className="py-2 px-2 md:px-4">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => (
                <tr className= "border-b text-xs md:text-sm odd:bg-gray-100" 
                  key={producto.id}>
                  <td className="py-2 px-2 md:px-4">{producto.sku}</td>
                  <td className="py-2 px-2 md:px-4">{producto.nombre}</td>
                  <td className="py-2 px-2 md:px-4">{producto.descripcion}</td>
                  <td className="py-2 px-2 md:px-4 text-right">{producto.cantidad}</td>
                  <td className="py-2 px-2 md:px-4 text-right">{producto.precio}</td>
                  {isAuthenticated && (
                  <td className="flex flex-col py-2 px-4 gap-2">
                    <button
                      onClick={() => router.push(`/productos/${producto.id}`)}
                      className="w-full bg-orange-400 text-white p-2 rounded flex items-center justify-center
                      outline outline-offset-2 hover:bg-orange-500 hover:outline-orange-500 hover:outline-4">
                      <PencilIcon className="h-5 w-5" />
                      <span className="ml-2">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDelete(producto.id)}
                      className="w-full bg-orange-600 text-white p-2 rounded flex items-center justify-center outline 
                        outline-offset-2 hover:bg-orange-700 hover:outline-orange-700 hover:outline-4"
                    >
                      <TrashIcon className="h-5 w-5" />
                      <span className="ml-2">Eliminar</span>
                    </button>
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
      )}
    </div>
  );
};

export default ProductosPage;
