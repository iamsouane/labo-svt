import { FaFlask, FaGraduationCap, FaLightbulb, FaUsers, FaChartLine, FaBook, FaEnvelope, FaPhone } from "react-icons/fa";
import { GiMolecule, GiEarthCrack } from "react-icons/gi";

const Apropos = () => {
  return (
    <div className="bg-gradient-to-b from-white to-green-50">
      {/* Header Section avec le même style que le Header principal */}
      <section className="relative overflow-hidden px-4 py-24 md:py-32 bg-gradient-to-br from-white via-green-50 to-green-100">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-300 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-green-400 blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-green-200 blur-xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-green-100 border border-green-200 text-green-800 font-medium">
            <FaUsers className="mr-2" />
            À propos de nous
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Laboratoire Virtuel
            </span> <br />
            de SVT 2de
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Découvrez l'équipe et la vision derrière notre plateforme pédagogique innovante
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Section Mission */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                <FaLightbulb className="text-green-600 mr-3" />
                Notre Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Transformer l'enseignement des Sciences de la Vie et de la Terre grâce à des outils numériques interactifs qui rendent l'apprentissage plus accessible, engageant et efficace pour les élèves de Seconde.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Notre objectif est de combler le fossé entre la théorie et la pratique en offrant des expériences virtuelles qui complètent et enrichissent l'enseignement traditionnel.
              </p>
            </div>
            <div className="md:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Étudiants en sciences"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section Valeurs */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">
            Nos Valeurs Pédagogiques
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaFlask className="w-8 h-8 text-green-600" />,
                title: "Expérimentation",
                description: "Apprentissage par la pratique avec des simulations scientifiques réalistes"
              },
              {
                icon: <GiEarthCrack className="w-8 h-8 text-green-600" />,
                title: "Innovation",
                description: "Utilisation des dernières technologies pour l'éducation"
              },
              {
                icon: <FaGraduationCap className="w-8 h-8 text-green-600" />,
                title: "Accessibilité",
                description: "Contenu adapté à tous les élèves, quel que soit leur niveau"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-green-50">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Fonctionnalités */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">
            Nos Fonctionnalités Clés
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <GiMolecule className="w-8 h-8 text-green-600" />,
                title: "Visualisations 3D",
                description: "Modèles interactifs de cellules, organes et structures géologiques"
              },
              {
                icon: <FaChartLine className="w-8 h-8 text-green-600" />,
                title: "Données en temps réel",
                description: "Enregistrement et analyse des résultats d'expériences"
              },
              {
                icon: <FaUsers className="w-8 h-8 text-green-600" />,
                title: "Collaboration",
                description: "Outils de partage pour le travail en groupe"
              },
              {
                icon: <FaBook className="w-8 h-8 text-green-600" />,
                title: "Ressources pédagogiques",
                description: "Fiches de cours et exercices intégrés"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-green-50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Technologie */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-20 border border-gray-100">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Notre Stack Technologique
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "React", description: "Interface dynamique" },
              { name: "TypeScript", description: "Code robuste" },
              { name: "Tailwind CSS", description: "Design moderne" },
              { name: "Three.js", description: "3D interactive" },
              { name: "Supabase", description: "Base de données" },
              { name: "Vite", description: "Performance" }
            ].map((tech, index) => (
              <div key={index} className="text-center p-4 w-40">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  {tech.name[0]}
                </div>
                <h4 className="font-bold text-gray-900">{tech.name}</h4>
                <p className="text-sm text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Équipe */}
        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">
            Notre Équipe
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sophie Martin",
                role: "Responsable Pédagogique",
                bio: "15 ans d'expérience en enseignement SVT, docteure en biologie cellulaire."
              },
              {
                name: "Pierre Lambert",
                role: "Développeur Principal",
                bio: "Spécialiste en applications éducatives interactives."
              },
              {
                name: "Équipe Éducative",
                role: "Contenu Pédagogique",
                bio: "Enseignants certifiés et formateurs académiques."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-2xl">
                  {member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-1">{member.name}</h3>
                <p className="text-center text-green-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Contact */}
        <section className="mt-20 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
            Nous Contacter
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex items-center justify-center">
              <FaEnvelope className="text-green-600 mr-3 text-xl" />
              <span className="text-gray-700">contact@labosvt.sn</span>
            </div>
            <div className="flex items-center justify-center">
              <FaPhone className="text-green-600 mr-3 text-xl" />
              <span className="text-gray-700">+221 77 571 04 40</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Apropos;