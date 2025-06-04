import { Link } from "react-router-dom";
import { FaFlask, FaArrowRight } from "react-icons/fa";

const Header = () => {
  return (
    <section className="relative overflow-hidden px-4 py-24 md:py-32 bg-gradient-to-br from-white via-green-50 to-green-100">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-300 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-green-400 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-green-200 blur-xl"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-green-100 border border-green-200 text-green-800 font-medium">
          <FaFlask className="mr-2" />
          Nouveaux contenus disponibles
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Laboratoire Virtuel
          </span> <br />
          de SVT 2de
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
          Découvrez des expériences scientifiques interactives et plongez dans le monde vivant 
          grâce à nos simulations immersives spécialement conçues pour le programme de Seconde.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/#features"  // Ancre vers la section features
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explorer les simulations
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/apropos"  // Ancre vers la section features
            className="group flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-medium px-8 py-4 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            Découvrir la plateforme
          </Link>
        </div>
        
        {/* Stats ou indicateurs */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
          <div className="px-4">
            <div className="text-3xl font-bold text-green-700">50+</div>
            <div className="text-gray-600">Simulations</div>
          </div>
          <div className="px-4">
            <div className="text-3xl font-bold text-green-700">100%</div>
            <div className="text-gray-600">Programme couvert</div>
          </div>
          <div className="px-4">
            <div className="text-3xl font-bold text-green-700">10k+</div>
            <div className="text-gray-600">Élèves actifs</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;