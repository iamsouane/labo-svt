import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaComment } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-white to-green-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 md:py-32 bg-gradient-to-br from-white via-green-50 to-green-100">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-300 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-green-400 blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-green-200 blur-xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-green-100 border border-green-200 text-green-800 font-medium">
            <FaPaperPlane className="mr-2" />
            Contactez-nous
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Nous sommes à votre écoute
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Une question, une remarque ou une suggestion ? Notre équipe vous répond dans les meilleurs délais.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <FaComment className="mr-3 text-green-600" />
                Envoyez-nous un message
              </h2>
              
              <form className="space-y-6">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Votre nom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Jean Dupont"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Votre email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="jean.dupont@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option>Sélectionnez un sujet</option>
                    <option>Question sur une simulation</option>
                    <option>Problème technique</option>
                    <option>Partage d'idées</option>
                    <option>Autre demande</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Décrivez votre demande en détail..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                  >
                    <FaPaperPlane className="mr-2" />
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">
                Nos coordonnées
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Adresse</h3>
                    <p className="text-gray-600">
                      123 Rue de la Science<br />
                      75000 Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                    <FaPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">
                      +33 1 23 45 67 89<br />
                      Lundi au Vendredi, 9h-18h
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">
                      contact@labosvt.fr<br />
                      Réponse sous 48h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte (placeholder) */}
            {/* Carte Google Maps cliquable */}
<a
  href="https://maps.app.goo.gl/LZGazGPVZkFnEcCx9"
  target="_blank"
  rel="noopener noreferrer"
  className="block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition hover:shadow-2xl"
>
  <div className="h-64">
    <iframe
      title="Carte de localisation"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.9438313653573!2d-17.358143000000002!3d14.772193900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10bfef497c237%3A0x9e11ff7041319b31!2sComico%204yeumbeul!5e0!3m2!1sen!2ssn!4v1748000533037!5m2!1sen!2ssn"
      width="100%"
      height="100%"
      loading="lazy"
      allowFullScreen
      className="w-full h-full border-0"
    ></iframe>
  </div>
  <div className="p-4 text-center">
    <p className="text-sm text-gray-600">Cliquez pour ouvrir sur Google Maps</p>
  </div>
</a>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;