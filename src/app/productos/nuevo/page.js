"use client";

import { useState } from 'react';
import { setFlashMessage } from '../../../utils/flashMessage';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import { createProducto } from '../../../utils/data-queries';

const NuevoProductoPage = () => {
  const [sku, setSku] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await createProducto({ sku, nombre, descripcion, cantidad, precio });
      if (result.success) {
        setFlashMessage({ message: 'Producto agregado exitosamente', type: 'success' });
        router.push('/productos');
      } else {
        setFlashMessage({ message: result.message, type: 'error' });
      }
    } catch (error) {
      setFlashMessage({ message: error.message, type: 'error' });
    }
  };
  
  const handleCancel = () => {
    router.push('/productos');
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">SKU:</label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2">Cantidad:</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2">Precio:</label>
            <input
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="md:min-w-24 bg-orange-400 text-white p-2 rounded flex items-center justify-center
                      hover:bg-orange-500 hover:outline outline-offset-2 hover:outline-orange-500 hover:outline-4"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="md:min-w-24 bg-gray-500 text-white p-2 rounded flex items-center justify-center
                   hover:bg-gray-600 hover:outline outline-offset-2 hover:outline-gray-500 hover:outline-4"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoProductoPage;
