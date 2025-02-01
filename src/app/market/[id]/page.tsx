"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faClock,
  faLink,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Header } from "@/components/Header";
import { colors } from "../../../styles/theme";
import { useAuth } from "@clerk/nextjs";

type MarketProps = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  hours: string;
  website: string;
  rating: number;
  image: string;
  products: Array<{
    name: string;
    description: string;
    price: string;
    image: string;
  }>;
};

export default function MarketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [market, setMarket] = useState<MarketProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { id } = React.use(params);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const response = await fetch(
          `https://iurygabriel.com.br/nlw-pocket-api/establishments/${id}`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar estabelecimento");
        }

        const marketFetch = await response.json();
        setMarket(marketFetch);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarket();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Estabelecimento não encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f1f1] min-h-screen mx-auto max-w-4xl">
      <Header
        showBackButton={true}
        isLoggedIn={isSignedIn ?? false}
        onLoginPress={() => router.push("/login")}
      />

      <div className="mx-auto p-4">
        {/* Market Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black mb-2">{market.name}</h1>
          <div className="relative w-full h-64 mb-4">
            <div className="absolute top-2 right-2 z-10 bg-green-500 px-3 py-1 rounded-full text-white text-sm font-medium shadow-md">
              Destaque
            </div>
            <Image
              src={market.image}
              alt={market.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <p className="text-gray-600 mb-4">{market.description}</p>

          {/* Market Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-green-500"
              />
              <p className="text-gray-600">{market.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-green-500" />
              <p className="text-gray-600">{market.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-green-500" />
              <p className="text-gray-600">{market.hours}</p>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLink} className="text-green-500" />
              <a
                href={`${market.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline"
              >
                {market.website}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <p className="text-gray-600">{market.rating}</p>
            </div>
          </div>

          {/* Special Offer Button */}
          <button className="w-full bg-green-500 text-white font-bold py-3 rounded-lg mb-6">
            Ver oferta especial
          </button>
        </div>

        {/* Products Section */}
        <h2 className="text-2xl font-bold text-black mb-4">Produtos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {market.products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="relative w-full h-48 mb-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500} // Substitua pelo tamanho desejado
                  height={500} // Mantém proporções
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    objectFit: "cover", // Similar ao resizeMode
                    overflow: "hidden", // Para arredondamento correto
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-black">{product.name}</h3>
              <p className="text-gray-600 my-2">{product.description}</p>
              <p className="text-black font-bold mb-4">R$ {product.price}</p>
              <button
                className="w-full bg-green-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                onClick={() => {
                  const phone = market.phone.replace(/\D/g, "");
                  const message = `Olá ${market.name}, gostaria de pedir:\n\n${product.name} - ${product.description}\n\nVim do Coroatá Conecta\n\nValor: ${product.price}`;
                  const url = `https://wa.me/+55${phone}?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(url, "_blank");
                }}
              >
                <FontAwesomeIcon icon={faWhatsapp} />
                Pedir via WhatsApp
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}