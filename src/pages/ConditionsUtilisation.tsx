import { FaBook, FaUserShield, FaLock, FaExclamationTriangle, FaBalanceScale } from "react-icons/fa";

const ConditionsUtilisation = () => {
  return (
    <div className="bg-gradient-to-b from-white to-green-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28 bg-gradient-to-br from-white via-green-50 to-green-100">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-300 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-green-400 blur-xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-green-100 border border-green-200 text-green-800 font-medium">
            <FaBook className="mr-2" />
            Cadre légal
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Conditions d'Utilisation
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Les règles encadrant l'utilisation de notre plateforme éducative
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              En accédant à Labo-SVT, vous acceptez les présentes conditions. Ces règles visent à garantir une utilisation 
              optimale et sécurisée de notre plateforme par tous les utilisateurs.
            </p>

            {/* Section 1 */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">1</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Usage du Service</h2>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                  <FaUserShield className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-gray-700 mb-3">
                    Le laboratoire virtuel est exclusivement réservé à un usage éducatif pour :
                  </p>
                  <ul className="space-y-2 ml-6 mb-3">
                    {[
                      "Les élèves de seconde et leurs enseignants",
                      "L'apprentissage des Sciences de la Vie et de la Terre",
                      "Un usage personnel et pédagogique"
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700 before:content-['•'] before:mr-2 before:text-green-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-700 font-medium">
                    Toute utilisation commerciale, frauduleuse ou illégale est strictement prohibée.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">2</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Propriété Intellectuelle</h2>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                  <FaLock className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-gray-700 mb-3">
                    Tous les contenus présents sur Labo-SVT sont protégés par droits d'auteur :
                  </p>
                  <ul className="space-y-2 ml-6 mb-3">
                    {[
                      "Simulations et modèles interactifs",
                      "Contenus pédagogiques et textes explicatifs",
                      "Design et interface utilisateur",
                      "Code source et algorithmes"
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700 before:content-['•'] before:mr-2 before:text-green-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-700">
                    Toute reproduction, même partielle, nécessite une autorisation écrite préalable.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">3</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Comptes Utilisateurs</h2>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                  <FaUserShield className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-gray-700 mb-3">
                    Certaines fonctionnalités premium nécessitent un compte utilisateur :
                  </p>
                  <ul className="space-y-2 ml-6 mb-3">
                    {[
                      "Vous devez fournir des informations exactes et à jour",
                      "Les comptes sont personnels et non transférables",
                      "Vous êtes responsable de la confidentialité de vos identifiants",
                      "Nous nous réservons le droit de suspendre tout compte suspect"
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700 before:content-['•'] before:mr-2 before:text-green-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">4</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Responsabilités</h2>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                  <FaExclamationTriangle className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-gray-700 mb-3">
                    Bien que nous nous efforcions de fournir un service optimal :
                  </p>
                  <ul className="space-y-2 ml-6 mb-3">
                    {[
                      "Nous ne garantissons pas une disponibilité continue et sans erreur",
                      "Les contenus sont fournis \"tels quels\" sans garantie explicite",
                      "Nous déclinons toute responsabilité pour dommages indirects",
                      "L'utilisation des simulations ne remplace pas les TP encadrés"
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700 before:content-['•'] before:mr-2 before:text-green-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">5</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Modifications</h2>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                  <FaBalanceScale className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-gray-700 mb-3">
                    Nous pouvons mettre à jour ces conditions pour refléter :
                  </p>
                  <ul className="space-y-2 ml-6 mb-3">
                    {[
                      "L'évolution de notre plateforme",
                      "Les changements législatifs",
                      "Les bonnes pratiques pédagogiques"
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700 before:content-['•'] before:mr-2 before:text-green-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-700 font-medium">
                    Les utilisateurs seront notifiés des changements majeurs par email ou via l'application.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                En cas de doute sur ces conditions, veuillez consulter notre page d'aide ou nous contacter.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConditionsUtilisation;