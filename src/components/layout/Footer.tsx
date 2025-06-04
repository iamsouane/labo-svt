import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaFlask, FaGraduationCap, FaBook, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-green-50 to-white border-t border-green-100 mt-20">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-10 w-32 h-32 rounded-full bg-green-200 blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-40 h-40 rounded-full bg-green-300 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Colonne 1 - Logo et description */}
        <div className="space-y-5">
          <div className="flex items-center">
            <FaFlask className="text-green-600 text-2xl mr-3" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Labo-SVT
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Plateforme interactive pour l'apprentissage des Sciences de la Vie et de la Terre en classe de Seconde.
          </p>
          
          {/* Réseaux sociaux */}
          <div className="flex space-x-4 pt-2">
            <a href="https://github.com/iamsouane" target="_blank" aria-label="GitHub" className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-300">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://x.com/221men" target="_blank" aria-label="Twitter" className="p-2 text-gray-500 hover:text-white hover:bg-blue-400 rounded-full transition-all duration-300">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="p-2 text-gray-500 hover:text-white hover:bg-blue-600 rounded-full transition-all duration-300">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Colonne 2 - Navigation */}
        <div className="space-y-5">
          <h4 className="font-semibold text-gray-800 flex items-center text-sm">
            <FaGraduationCap className="mr-2 text-green-600" />
            NAVIGATION
          </h4>
          <ul className="space-y-3">
            {[
              { to: "/", text: "Accueil" },
              { to: "/simulations", text: "Simulations" },
              { to: "/visualisation", text: "Visualisation 3D" },
              { to: "/apropos", text: "À propos" },
              { to: "/contact", text: "Contact" }
            ].map((item) => (
              <li key={item.text}>
                <Link 
                  to={item.to} 
                  className="flex items-center text-gray-600 hover:text-green-700 transition-colors text-sm group"
                >
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full mr-3 group-hover:w-2 group-hover:h-2 transition-all"></span>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 - Ressources */}
        <div className="space-y-5">
          <h4 className="font-semibold text-gray-800 flex items-center text-sm">
            <FaBook className="mr-2 text-green-600" />
            RESSOURCES
          </h4>
          <ul className="space-y-3">
            {[
              { to: "/blog", text: "Blog pédagogique" },
              { to: "/guides", text: "Guides d'utilisation" },
              { to: "/faq", text: "FAQ" },
              { to: "/mentions-legales", text: "Mentions légales" }
            ].map((item) => (
              <li key={item.text}>
                <Link 
                  to={item.to} 
                  className="flex items-center text-gray-600 hover:text-green-700 transition-colors text-sm group"
                >
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full mr-3 group-hover:w-2 group-hover:h-2 transition-all"></span>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 - Contact */}
        <div className="space-y-5">
          <h4 className="font-semibold text-gray-800 flex items-center text-sm">
            <FaEnvelope className="mr-2 text-green-600" />
            CONTACT
          </h4>
          <address className="text-gray-600 not-italic text-sm space-y-3">
            <div className="flex items-start">
              <FaEnvelope className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>contact@labo-svt.sn</span>
            </div>
            <div className="flex items-start">
              <FaPhone className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>+221 77 571 04 40</span>
            </div>
          </address>
          
          <div className="pt-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Labo-SVT. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Version 2.0 | Conforme au programme Éducation Nationale
            </p>
          </div>
        </div>
      </div>

      {/* Bandeau inférieur */}
      <div className="relative bg-green-800/5 border-t border-green-100 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-2 md:space-y-0">
            <div>
              Construit avec React, TypeScript et Tailwind CSS
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/confidentialite" className="hover:text-green-700 transition-colors">
                Politique de confidentialité
              </Link>
              <span>|</span>
              <Link to="/conditions" className="hover:text-green-700 transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;