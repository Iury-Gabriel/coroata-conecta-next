"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAndroid, faWhatsapp, faInstagram, faFacebook, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faGlobe, faStar, faHeart, faCompass, faLocationDot, faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export default function Bio() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-green-500/20 to-transparent" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute top-40 -left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />

      <div className="max-w-md mx-auto w-full px-4 py-12 relative">
        {/* Cabeçalho com título e descrição */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl font-bold text-black mb-3">
            Descubra Coroatá
            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 ml-2 text-2xl" />
          </h1>
          <p className="text-gray-600 text-lg mb-6">Encontre o melhor da cidade</p>

          {/* Stats */}
          <div className="flex justify-center gap-6 text-base">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHeart} className="text-red-500" />
              <span className="text-black">2.5k</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <span className="text-black">4.9</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-green-500" />
              <span className="text-black">MA</span>
            </div>
          </div>
        </div>

        {/* Links principais com animações e efeitos */}
        <div className="grid gap-4 mb-12">
          <a
            href="https://play.google.com/store/apps/details?id=com.prince1dev.coroataconecta"
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <FontAwesomeIcon icon={faAndroid} className="text-2xl text-green-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-black">Baixe o App</span>
                  <span className="text-sm text-gray-500">Exclusivo para Android</span>
                </div>
              </div>
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-green-600 transition-colors">
                Download
              </div>
            </div>
          </a>

          <a
            href="https://coroataconecta.com.br/home"
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <FontAwesomeIcon icon={faGlobe} className="text-2xl text-green-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-black">Acesse o Site</span>
                  <span className="text-sm text-gray-500">Versão para iPhone/iOS</span>
                </div>
              </div>
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-green-600 transition-colors">
                Acessar
              </div>
            </div>
          </a>

          <a
            href="https://wa.me/+5599981054867"
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-green-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-black">WhatsApp</span>
                  <span className="text-sm text-gray-500">Atendimento rápido</span>
                </div>
              </div>
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-green-600 transition-colors">
                Conversar
              </div>
            </div>
          </a>

          <a
            href="https://instagram.com/coroataconecta"
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <FontAwesomeIcon icon={faInstagram} className="text-2xl text-green-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-black">Instagram</span>
                  <span className="text-sm text-gray-500">Siga nossas novidades</span>
                </div>
              </div>
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-green-600 transition-colors">
                Seguir
              </div>
            </div>
          </a>

        </div>

        {/* Badges flutuantes */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
            <FontAwesomeIcon icon={faCompass} className="text-green-500" />
            <span className="text-sm font-medium text-black">Guia Local</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
            <span className="text-sm font-medium text-black">Top Avaliado</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
            <FontAwesomeIcon icon={faHeart} className="text-red-500" />
            <span className="text-sm font-medium text-black">2.5k Favoritos</span>
          </div>
        </div>

        {/* Footer com redes sociais adicionais */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">Siga-nos nas redes sociais</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
              <FontAwesomeIcon icon={faTiktok} className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
              <FontAwesomeIcon icon={faYoutube} className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

