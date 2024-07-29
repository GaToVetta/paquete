// pages/cart.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Usa next/navigation en lugar de next/router

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const products = [
  {
    id: 1,
    name: 'Herramientas',
    image: '/imagenes/herramientas.jpg', // Asegúrate de que esta imagen exista
    price: 60000,
  },
  {
    id: 2,
    name: 'Camisetas de color',
    image: '/imagenes/ropa.jpg', // Asegúrate de que esta imagen exista
    price: 15000,
  },
  {
    id: 3,
    name: 'Carnes',
    image: '/imagenes/carne.jpg', // Asegúrate de que esta imagen exista
    price: 15000,
  },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') { // Asegúrate de que estás en el cliente
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = storedCart.map((item: any) => {
        const product = products.find(p => p.id === item.id);
        return {
          id: item.id,
          name: product ? product.name : '',
          price: product ? product.price : 0,
          quantity: item.quantity,
        };
      });
      setCartItems(updatedCart);
    }
  }, []);

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = storedCart.filter((item: any) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <main className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Carrito de Compras</h3>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg flex items-center">
              <Image
                src={products.find(p => p.id === item.id)?.image || ''}
                alt={item.name}
                width={100}
                height={100}
                className="object-cover"
              />
              <div className="p-4 flex-grow">
                <h5 className="text-lg font-bold">{item.name}</h5>
                <p className="text-gray-700">
                  ${item.price} x {item.quantity}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg p-4 shadow-lg mt-4">
            <h4 className="text-lg font-bold">Total: ${calculateTotal()}</h4>
          </div>
          <button
            onClick={() => router.push('/checkout')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Proceder al Pago
          </button>
        </div>
      )}
    </main>
  );
};

export default CartPage;
