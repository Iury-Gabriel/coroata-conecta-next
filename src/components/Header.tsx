"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiBell } from "react-icons/fi";
import { FaHeart, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginPress: () => void;
  showBackButton?: boolean;
}

export function Header({ isLoggedIn, onLoginPress, showBackButton = false }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center p-4">
      {showBackButton && (
        <button 
          className="mr-4 text-green-600 hover:text-green-700"
          onClick={() => router.replace("/")}
        >
          <FiArrowLeft size={24} />
        </button>
      )}
      <h1 className="text-2xl font-bold text-green-600 flex-1">Coroatá Conecta</h1>
      
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <Link href="/favorites" className="text-green-600 hover:text-green-700">
            <FaHeart size={24} />
          </Link>
          <a 
            href="https://instagram.com/coroataconecta" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700"
          >
            <FaInstagram size={24} />
          </a>
          <a 
            href="https://wa.me/5599981054867" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700"
          >
            <FaWhatsapp size={24} />
          </a>
          <div className="relative">
            <button className="text-green-600 hover:text-green-700">
              <FiBell size={24} />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </button>
          </div>
          <Link href="/profile" className="text-green-600 hover:text-green-700">
            <MdAccountCircle size={24} />
          </Link>
        </div>
      ) : (
        <button 
          className="bg-green-600 px-3 py-1.5 rounded-md hover:bg-green-700"
          onClick={onLoginPress}
        >
          <span className="text-white font-bold">Entrar</span>
        </button>
      )}
    </div>
  );
}
