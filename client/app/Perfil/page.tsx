"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

const PagePerfil = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeat_password: '',
        first_name: '',
        last_name: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:4000/PerfilActual"); // Reemplaza con el endpoint correcto
                if (!res.ok) {
                    throw new Error("Error en la página");
                }
                const data = await res.json();
                setFormData({
                    email: data.email,
                    password: '',
                    repeat_password: '',
                    first_name: data.first_name,
                    last_name: data.last_name
                });
            } catch (error) {
                handleError(error, "Error en datos registros");
            }
        };

        fetchData();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { email, password, repeat_password, first_name, last_name } = formData;

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
            repeat_password
        };

        try {
            const res = await fetch("http://localhost:4000/Perfil", {
                method: "PUT",
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
            toast.success("Perfil actualizado con éxito");
            router.push("/Usuario");
            console.log(resData);
        } catch (error) {
            handleError(error, "Error al enviar datos");
        }
    };

    const handleError = (error: unknown, defaultMessage: string) => {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            toast.error("Error: " + error.message);
        } else {
            console.error("Error:", defaultMessage);
            toast.error("Error: " + defaultMessage);
        }
        setError(defaultMessage);
    };

    return (
        <article className='my-10 '>
            <section className='w-full text-center text-4xl my-3'>
                <h1>Actualizar Perfil</h1>
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
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
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
                        value={formData.repeat_password}
                        onChange={handleChange}
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
                            value={formData.first_name}
                            onChange={handleChange}
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
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-6 text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </article>
    )
}

export default PagePerfil;
