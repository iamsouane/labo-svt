import FeatureCard from "./FeatureCard";
import { 
  FaFlask, 
  FaInfoCircle, 
  FaEnvelope,
} from "react-icons/fa";
import { GiMolecule } from "react-icons/gi";

const features = [
  {
    title: "Simulations",
    description: "Expériences virtuelles interactives pour comprendre les phénomènes naturels.",
    link: "/simulations",
    icon: <FaFlask className="w-6 h-6" />,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600"
  },
  {
    title: "Visualisation 3D",
    description: "Explorez des modèles 3D de cellules, structures terrestres et matières scientifiques.",
    link: "/visualisation",
    icon: <GiMolecule className="w-6 h-6" />, // Molécule 3D
    bgColor: "bg-purple-100",
    textColor: "text-purple-600"
  },
  {
    title: "À propos",
    description: "Découvrez le projet et ses objectifs pédagogiques.",
    link: "/apropos",
    icon: <FaInfoCircle className="w-6 h-6" />,
    bgColor: "bg-amber-100",
    textColor: "text-amber-600"
  },
  {
    title: "Contact",
    description: "Contactez-nous pour en savoir plus ou proposer des idées.",
    link: "/contact",
    icon: <FaEnvelope className="w-6 h-6" />,
    bgColor: "bg-green-100",
    textColor: "text-green-600"
  },
];

const SectionFeatures = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explorez nos fonctionnalités</h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-600">
        Découvrez comment notre plateforme peut enrichir votre apprentissage des sciences
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature) => (
        <FeatureCard 
          key={feature.title}
          title={feature.title}
          description={feature.description}
          link={feature.link}
          icon={feature.icon}
          bgColor={feature.bgColor}
          textColor={feature.textColor}
        />
      ))}
    </div>
  </section>
);

export default SectionFeatures;