"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { setFlashMessage } from '../../../utils/flashMessage';
import { fetchProductoById, updateProducto } from '../../../utils/data-queries';
import { PencilIcon } from '@heroicons/react/24/outline';

const EditarProductoPage = () => {
  const [sku, setSku] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const loadProducto = async () => {
      try {
        const result = await fetchProductoById(id);
        if (result.success) {
          const producto = await result.data;
          console.log(producto);
          setSku(producto.sku);
          setNombre(producto.nombre);
          setDescripcion(producto.descripcion);
          setCantidad(producto.cantidad);
          setPrecio(producto.precio);
        }
        else {
          console.log("que paso");
          setFlashMessage({ message: result.message, type: 'error' });
          router.push('/productos');
        }
        
      } catch (error) {
        setFlashMessage({ message: error.message, type: 'error' });
        router.push('/productos');
      }
    };

    loadProducto();
  }, [id, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await updateProducto(id, { sku, nombre, descripcion, cantidad, precio });
      if (result.success) {
        setFlashMessage({ message: 'Producto actualizado exitosamente', type: 'success' });
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
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
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
            <PencilIcon className="h-5 w-5 mr-2" />
            Actualizar
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

export default EditarProductoPage;
