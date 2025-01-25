"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faHeart as faHeartOutline,
} from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faList,
  faPizzaSlice,
  faIceCream,
  faHamburger,
  faCut,
  faUtensils,
  faCoffee,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

import { Header } from "@/components/Header";
import { colors } from "../styles/theme";
import { useAuth } from "@clerk/nextjs";

type Coupon = {
  title: string;
  description: string;
};

type MarketsProps = {
  id: string;
  name: string;
  description: string;
  coupons: Coupon[];
  cover: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  category: string;
  rating: number;
};

type CategoriesProps = Array<{
  id: string;
  name: string;
  icon: string;
}>;

type PromotionsProps = Array<{
  id: string;
  title: string;
  description: string;
  image: string;
  button_text: string;
  category: string;
}>;

export default function Home() {
  const [promotions, setPromotions] = useState<PromotionsProps>([]);
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const CATEGORIES = [
    { id: "1", name: "Todas", icon: "list" },
    { id: "2", name: "Pizzarias", icon: "pizza-slice" },
    { id: "3", name: "Sorveterias", icon: "ice-cream" },
    { id: "4", name: "Hamburguerias", icon: "hamburger" },
    { id: "5", name: "Barbearias", icon: "cut" },
    { id: "6", name: "Restaurantes", icon: "utensils" },
    { id: "7", name: "Cafeterias", icon: "coffee" },
    { id: "8", name: "Lojas", icon: "shopping-bag" },
  ];

  async function fetchPromotions() {
    try {
      const response = await fetch(
        "https://iurygabriel.com.br/nlw-pocket-api/promotions"
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }

      const promotionsFetch = await response.json();
      setPromotions(promotionsFetch);
    } catch (error: any) {
      console.log(error.message);
      alert("Promoções: Não foi possível carregar as promoções.");
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch(
        "https://iurygabriel.com.br/nlw-pocket-api/categories"
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }

      const categoriesFetch = await response.json();
      setCategories(categoriesFetch);
      setCategory(categoriesFetch[0].id);
    } catch (error: any) {
      console.log(error.message);
      alert("Categorias: Não foi possível carregar as categorias.");
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return;
      }

      const response = await fetch(
        "https://iurygabriel.com.br/nlw-pocket-api/establishments"
      );

      setIsLoading(false);

      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }

      const estabelecimentosFetch: MarketsProps[] = await response.json();

      let filtered = estabelecimentosFetch;

      if (category == "1") {
        setMarkets(estabelecimentosFetch);
        return;
      }

      // Filtro por categoria
      if (category !== "1") {
        filtered = filtered.filter(
          (estab) =>
            estab.category.toLowerCase() ===
            categories.find((cat) => cat.id === category)?.name.toLowerCase()
        );
      }

      // Filtro por busca
      if (searchText) {
        filtered = filtered.filter((estab) =>
          estab.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      setMarkets(filtered);
    } catch (error) {
      console.log(error);
      alert("Locais: Não foi possível carregar os locais.");
    }
  }

  useEffect(() => {
    fetchPromotions();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category, searchText]);

  function getCategoryIcon(icon: string) {
    switch (icon) {
      case "list":
        return faList;
      case "pizza-slice":
        return faPizzaSlice;
      case "ice-cream":
        return faIceCream;
      case "hamburger":
        return faHamburger;
      case "cut":
        return faCut;
      case "utensils":
        return faUtensils;
      case "coffee":
        return faCoffee;
      case "shopping-bag":
        return faShoppingBag;
      default:
        return faList;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f1f1]">
      <div className="max-w-6xl mx-auto w-full px-4">
        <Header
          isLoggedIn={isSignedIn ?? false}
          onLoginPress={() => router.push("/login")}
        />

        {!isSignedIn && (
          <div className="p-4 bg-green-100 mt-4 rounded-lg">
            <h2 className="text-green-800 font-bold text-lg mb-2">
              Crie sua conta e aproveite mais benefícios!
            </h2>
            <p className="text-green-800">
              • Ganhe pontos em cada compra
              <br />• Use código de indicação
              <br />• Acesso a ofertas exclusivas
            </p>
            <button
              className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold mt-4 w-full"
              onClick={() => router.push("/register")}
            >
              Criar conta
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="w-full flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <main className="p-4 pb-8">
            <h1 className="text-3xl font-bold text-black mb-6">
              Descubra Coroatá
            </h1>

            {/* Promoções */}
            <h2 className="text-xl font-bold text-black mb-4">
              Promoções em Destaque
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-white rounded-xl p-5 shadow-lg border border-gray-200"
                >
                  <div className="relative">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      width={270}
                      height={270}
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        maxHeight: 270,
                        borderRadius: 8,
                        marginBottom: 4,
                        overflow: "hidden",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-black mt-4">
                    {promo.title}
                  </h3>
                  <p className="text-sm text-black my-2">{promo.description}</p>
                  <button
                    className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold mt-2 w-full"
                    onClick={() => router.push(`/market/1`)}
                  >
                    Ver Oferta
                  </button>
                </div>
              ))}
            </div>

            {/* Filtro de Categorias */}
            <div className="my-6">
              <div className="flex overflow-x-auto gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      category === cat.id
                        ? "bg-green-500 text-white"
                        : "bg-white text-black border border-green-100"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={getCategoryIcon(cat.icon)}
                      className={
                        category === cat.id ? "text-white" : "text-black"
                      }
                    />
                    <span className={category === cat.id ? "font-bold" : ""}>
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Barra de Busca */}
            <div className="flex items-center mb-6">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 mr-2 focus:border-green-500"
                placeholder="Buscar estabelecimentos..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className={`bg-green-500 px-3 py-2 rounded-lg ${
                  searchText ? "opacity-100" : "opacity-60"
                }`}
                disabled={!searchText}
              >
                <FontAwesomeIcon icon={faSearch} className="text-white" />
              </button>
            </div>

            {/* Lista de Estabelecimentos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {markets.map((market) => (
                <div
                  key={market.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="relative w-full h-48 md:h-56">
                    <Image
                      src={market.image}
                      alt={market.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 px-3 py-1 rounded-full text-white text-sm font-medium shadow-md">
                      Destaque
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-black mt-2">
                    {market.name}
                  </h3>
                  <p className="text-sm text-black my-1">{market.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400"
                      />
                      <span className="text-sm text-black">
                        {market.rating}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setFavorites((prev) =>
                          prev.includes(market.id)
                            ? prev.filter((id) => id !== market.id)
                            : [...prev, market.id]
                        );
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          favorites.includes(market.id)
                            ? faHeart
                            : faHeartOutline
                        }
                        className={`text-lg ${
                          favorites.includes(market.id)
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                  </div>
                  <button
                    className="bg-green-500 px-4 py-2 rounded-lg text-white w-full mt-2"
                    onClick={() => router.push(`/market/${market.id}`)}
                  >
                    Ver Mercado
                  </button>
                </div>
              ))}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
