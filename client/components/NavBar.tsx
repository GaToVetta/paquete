"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const router = useRouter();
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!localStorage.getItem('user'));
  console.log(isLoggedIn)
  // Estado para verificar si el usuario está logueado
  const [userName, setUserName] = useState<string | null>(null); // Estado para almacenar el nombre de usuario


  useEffect(() => {
    // Verificar si el usuario está logueado usando localStorage
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(userData.firstName); // Suponiendo que el nombre del usuario está en la propiedad 'name'
      } catch (error) {
        console.error('Error parsing user data:', error);
        // En caso de error, limpiar localStorage
        localStorage.removeItem('user');
      }
    }
  }, []);

  const toggleOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  const handleLogout = () => {
    // Limpiar localStorage y establecer isLoggedIn como falso
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName(null);
    router.push("/Usuario")
  };

  return (
    <nav className="bg-gray-700 flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-10">
        <Image
          src="/imagenes/pac.webp"
          alt="imagen paquete"
          height={40}
          width={150}
          className="cursor-pointer"
        />
        <NavLink href="/">Inicio</NavLink>
        <NavLink href="/Paquete">Tienda</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink href="/Perfil">{userName}</NavLink>
            <NavLink href="" onClick={handleLogout}>Salir</NavLink>
          </>
        ) : (
          <NavLink href="/Usuario">Usuario</NavLink>
        )}
        <div className="relative">
          <button
            onClick={toggleOpciones}
            className="text-white focus:outline-none"
          >
            Categoría
          </button>
          {mostrarOpciones && (
            <div className="absolute right-0 mt-1 w-32 bg-slate-700 text-slate-200 shadow-md rounded-md flex flex-col z-20">
              <NavLink href="/categorias/ropa">Ropa</NavLink>
              <NavLink href="/categorias/alimentos">Alimentos</NavLink>
              <NavLink href="/categorias/otros">Otros</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) => (
  <Link href={href} passHref className="text-white hover:bg-gray-600 decoration-transparent px-3 py-2 rounded-md" onClick={onClick}>
    {children}
  </Link>
);

export default NavBar;
