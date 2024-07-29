// app/Paquete/page.tsx

"use client"; // Marca este componente como cliente

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PagePaquete: React.FC = () => {
    const router = useRouter();

    const handleClick = (productId: number) => {
        if (typeof window !== 'undefined') { // Asegúrate de que estás en el cliente
            // Añadir el producto al carrito en localStorage
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItem = cart.find((item: any) => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            router.push('/Carrito'); // Redirigir al carrito de compras
        }
    };

    return (
        <main className="container mx-auto p-4">
            <h3 className="text-2xl font-bold mb-4">Productos</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Card 1 - Herramientas */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src="/imagenes/herramientas.jpg"
                        alt="Herramientas"
                        width={400}
                        height={300}
                        className="object-cover w-full h-48"
                    />
                    <div className="p-4">
                        <h5 className="text-lg font-bold mb-2">Herramientas</h5>
                        <p className="text-gray-700">
                            Caja de herramientas.<br />
                            <strong>Valor:</strong> $60.000<br /><br />
                            <strong>Marca:</strong> CAT
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Disponible 100 unidades</p>
                        <button
                            onClick={() => handleClick(1)} // Asume ID del producto 1
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Comprar
                        </button>
                    </div>
                </div>

                {/* Card 2 - Camisetas de color */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src="/imagenes/ropa.jpg"
                        alt="Camisetas de color"
                        width={400}
                        height={300}
                        className="object-cover w-full h-48"
                    />
                    <div className="p-4">
                        <h5 className="text-lg font-bold mb-2">Camisetas de color</h5>
                        <p className="text-gray-700">
                            TALLAS:<br /><br />
                            S. $15.000<br />
                            M. $22.000<br />
                            L. $30.000<br />
                            XL. $45.000<br />
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Disponible 500 unidades</p>
                        <button
                            onClick={() => handleClick(2)} // Asume ID del producto 2
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Comprar
                        </button>
                    </div>
                </div>

                {/* Card 3 - Carnes */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src="/imagenes/carne.jpg"
                        alt="Carnes"
                        width={400}
                        height={400}
                        className="object-cover w-full h-48"
                    />
                    <div className="p-4">
                        <h5 className="text-lg font-bold mb-2">Carnes</h5>
                        <p className="text-gray-700">
                            Carne de Res:<br />
                            Valor kg: $15.000<br /><br />
                            Carne de Cerdo:<br />
                            Valor kg: $19.000<br /><br />
                            Carne de Pollo:<br />
                            Valor kg: $12.000<br /><br />
                            Pescado:<br />
                            Valor kg: $10.000<br /><br />
                        </p>
                        <button
                            onClick={() => handleClick(3)} // Asume ID del producto 3
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PagePaquete;
