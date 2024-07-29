"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

const PageRegister: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email")?.toString() || '';
        const password = formData.get("password")?.toString() || '';
        const repeat_password = formData.get("repeat_password")?.toString() || '';
        const first_name = formData.get("first_name")?.toString() || '';
        const last_name = formData.get("last_name")?.toString() || '';

        if (password !== repeat_password) {
            setError("Las contraseñas no coinciden");
            toast.error("Las contraseñas no coinciden");
            return;
        }

        if (!email || !password || !repeat_password || !first_name || !last_name) {
            setError("Por favor, complete todos los campos");
            toast.error("Por favor, complete todos los campos");
            return;
        }

        const data = {
            email,
            password,
            first_name,
            last_name,
        };

        try {
            const res = await fetch("http://localhost:4000/Registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al enviar datos");
            }

            const resData = await res.json();
            toast.success("Usuario registrado con éxito");
            router.push("/Usuario");
            console.log(resData);
        } catch (error: any) {
            console.error("Error:", error.message);
            toast.error("Error: " + error.message);
            setError("Error al enviar datos");
        }
    };

    return (
        <article className='my-10'>
            <section className='w-full text-center text-4xl my-3'>
                <h1>Registro</h1>
            </section>
            <div className='blur-md w-full h-full'></div>
            <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Correo
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="example@example.com"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="********"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="repeat_password" className="block text-gray-700 text-sm font-bold mb-2">
                        Confirma Contraseña
                    </label>
                    <input
                        type="password"
                        name="repeat_password"
                        id="repeat_password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="********"
                        required
                    />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2">
                        <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
                            Nombres
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombres"
                            required
                        />
                    </div>
                    <div className="mb-4 md:ml-2">
                        <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">
                            Apellidos
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Apellidos"
                            required
                        />
                    </div>
                </div>
                <div className="mb-6 text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Registrar
                    </button>
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </form>

            <section className='w-full text-center text-mb my-3'>
                <span>
                    Ya tienes usuario <Link href={"/Usuario"} className='text-blue-300'>Inicio de sesión</Link>
                </span>
            </section>
        </article>
    );
};

export default PageRegister;
