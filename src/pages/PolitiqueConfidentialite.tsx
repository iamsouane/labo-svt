import { FaShieldAlt, FaDatabase, FaUserLock, FaUserEdit, FaBan } from "react-icons/fa";

const PolitiqueConfidentialite = () => {
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
            <FaShieldAlt className="mr-2" />
            Protection des données
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Politique de Confidentialité
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Nous protégeons vos données avec la plus grande attention et transparence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Chez Labo-SVT, nous accordons une importance primordiale à la protection de vos données personnelles. 
              Cette politique détaille nos pratiques concernant la collecte, l'utilisation et la protection de vos informations.
            </p>

            {/* Section 1 */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">1</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Données Collectées</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Dans le cadre de l'utilisation de notre plateforme, nous pouvons recueillir :
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  "Informations d'identification (nom, prénom, email)",
                  "Données de connexion et d'utilisation",
                  "Messages échangés via nos canaux de contact",
                  "Métadonnées techniques (navigateur, appareil)"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                      <FaDatabase className="w-3 h-3" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">2</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Utilisation des Données</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Vos informations sont utilisées exclusivement pour :
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  "Fournir et améliorer nos services éducatifs",
                  "Personnaliser votre expérience utilisateur",
                  "Répondre à vos demandes et questions",
                  "Assurer la sécurité de la plateforme"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                      <FaUserEdit className="w-3 h-3" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">3</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Protection des Données</h2>
              </div>
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                  <FaUserLock className="w-3 h-3" />
                </div>
                <p className="text-gray-700">
                  Nous utilisons <strong>Supabase</strong> comme solution sécurisée de stockage de données, avec :
                </p>
              </div>
              <ul className="space-y-3 ml-9 mb-4">
                {[
                  "Chiffrement des données en transit et au repos",
                  "Sauvegardes régulières",
                  "Contrôles d'accès stricts",
                  "Conformité RGPD"
                ].map((item, index) => (
                  <li key={index} className="text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">4</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Partage des Données</h2>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                  <FaBan className="w-3 h-3" />
                </div>
                <p className="text-gray-700">
                  Nous ne partageons vos données personnelles avec aucun tiers, sauf obligation légale ou avec votre consentement explicite.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="font-bold">5</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Vos Droits</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="space-y-3">
                {[
                  "Droit d'accès à vos données personnelles",
                  "Droit de rectification des informations inexactes",
                  "Droit à l'effacement ('droit à l'oubli')",
                  "Droit de limitation du traitement",
                  "Droit à la portabilité de vos données",
                  "Droit d'opposition au traitement"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                      <FaShieldAlt className="w-3 h-3" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Pour exercer vos droits ou pour toute question, veuillez nous contacter via notre page de contact.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PolitiqueConfidentialite;