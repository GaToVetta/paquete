"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const PageLogin: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email")?.toString() || '';
        const password = formData.get("password")?.toString() || '';

        if (!email || !password) {
            setError("Por favor, complete todos los campos");
            toast.error("Por favor, complete todos los campos");
            return;
        }

        try {
            const data = { email, password };
            const res = await fetch("http://localhost:4000/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error("Error: Datos no coinciden");
            }

            const resData = await res.json();
            console.log(resData);

            // Guardar token y datos de usuario en localStorage
            localStorage.setItem('user', JSON.stringify(resData));

            toast.success("Inicio de sesión exitoso");

            // Redirigir al usuario a la página de inicio
            router.push("/");
            window.location.reload();

        } catch (error: any) {
            console.error("Error:", error.message);
            toast.error(`Error: ${error.message}`);
            setError("Datos incorrectos, intente de nuevo");
        }
    };

    return (
        <article className='my-10'>
            <section className='w-full text-center text-4xl my-3'>
                <h1>Inicio de Sesión</h1>
            </section>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="name@example.com" 
                        required 
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required 
                    />
                </div>
                <section className='w-full flex justify-center'>
                    <button 
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Ingresar
                    </button>
                </section>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </form>
            <section className='w-full text-center text-mb my-3'>
                <span>
                    Crear cuenta <Link href="/Registro" className='text-blue-300'>Registro</Link>
                </span>
            </section>
        </article>
    );
};

export default PageLogin;
