import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { supabase } from "../../lib/supabaseClient";
import { 
  FaArrowLeft,
  FaSave,
  FaSpinner,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTimes,
  FaSearch,
  FaUsers,
  FaUserTie,
  FaInfoCircle,
  FaSchool
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

interface Professeur {
  id: string;
  nom: string;
  prenom: string;
}

interface Eleve {
  id: string;
  nom: string;
  prenom: string;
}

const CreerClasse = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    code_classe: "",
    description: "",
    professeur_principal: "",
    eleves: [] as string[],
  });

  const [professeursDisponibles, setProfesseursDisponibles] = useState<Professeur[]>([]);
  const [elevesDisponibles, setElevesDisponibles] = useState<Eleve[]>([]);
  const [searchEleve, setSearchEleve] = useState("");
  const [searchProfesseur, setSearchProfesseur] = useState("");

  // Générer un code classe unique
  useEffect(() => {
    const code = `CLASSE-${uuidv4().substring(0, 8).toUpperCase()}`;
    setFormData(prev => ({ ...prev, code_classe: code }));
  }, []);

  // Charger les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [profsResponse, elevesResponse] = await Promise.all([
          supabase
            .from('utilisateur')
            .select('id, nom, prenom')
            .eq('role', 'PROFESSEUR')
            .order('nom', { ascending: true }),
          supabase
            .from('eleves_non_assignes')
            .select('id, nom, prenom')
            .order('nom', { ascending: true })
        ]);

        if (profsResponse.error) throw profsResponse.error;
        if (elevesResponse.error) throw elevesResponse.error;

        setProfesseursDisponibles(profsResponse.data || []);
        setElevesDisponibles(elevesResponse.data || []);
      } catch (error) {
        console.error("Erreur chargement:", error);
        toast.error("Erreur de chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEleveToggle = (eleveId: string) => {
    setFormData(prev => {
      if (prev.eleves.includes(eleveId)) {
        return { ...prev, eleves: prev.eleves.filter(id => id !== eleveId) };
      } else {
        return { ...prev, eleves: [...prev.eleves, eleveId] };
      }
    });
  };

  const handleRemoveEleve = (eleveId: string) => {
    setFormData(prev => ({
      ...prev,
      eleves: prev.eleves.filter(id => id !== eleveId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.nom) throw new Error("Le nom de la classe est requis");
      if (!formData.professeur_principal) {
        throw new Error("Un professeur principal doit être sélectionné");
      }

      // Création de la classe
      const { data: newClass, error: classError } = await supabase
        .from('classe')
        .insert({
          nom: formData.nom,
          code_classe: formData.code_classe,
          description: formData.description,
          professeur_id: formData.professeur_principal,
          date_creation: new Date().toISOString()
        })
        .select()
        .single();

      if (classError) throw classError;
      if (!newClass?.id) throw new Error("La création de la classe a échoué");

      // Assignation du professeur principal
      const { error: profError } = await supabase
        .from('classe_professeur')
        .insert({
          classe_id: newClass.id,
          professeur_id: formData.professeur_principal,
          is_principal: true
        });

      if (profError) throw profError;

      // Assignation des élèves
      if (formData.eleves.length > 0) {
        const { error: eleveError } = await supabase
          .from('classe_eleve')
          .insert(
            formData.eleves.map(eleveId => ({
              classe_id: newClass.id,
              eleve_id: eleveId
            }))
          );

        if (eleveError) throw eleveError;
      }

      toast.success("Classe créée avec succès !");
      navigate("/admin/classes");
    } catch (error: any) {
      console.error("Erreur complète:", error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfesseurs = professeursDisponibles.filter(prof =>
    `${prof.prenom} ${prof.nom}`.toLowerCase().includes(searchProfesseur.toLowerCase())
  );

  const filteredEleves = elevesDisponibles.filter(eleve =>
    `${eleve.prenom} ${eleve.nom}`.toLowerCase().includes(searchEleve.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-green-800 p-2 rounded-lg transition-colors"
            >
              <FaArrowLeft />
              <span>Retour</span>
            </button>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <FaSchool className="text-white" />
              Créer une nouvelle classe
            </h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Section Informations de base */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Informations principales
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nom de la classe *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  required
                  placeholder="Ex: Terminale S"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Code classe *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="code_classe"
                    value={formData.code_classe}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed font-mono"
                  />
                  <span className="absolute right-3 top-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Généré automatiquement
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description (optionnelle)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                rows={3}
                placeholder="Description de la classe..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500">
                {formData.description.length}/500 caractères
              </p>
            </div>
          </div>

          {/* Section Professeur Principal */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaChalkboardTeacher className="text-green-600" />
              Professeur principal *
            </h2>
            
            <div className="space-y-4">
              {formData.professeur_principal && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Professeur sélectionné</h3>
                  <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <FaChalkboardTeacher />
                      </div>
                      <div>
                        <p className="font-medium">
                          {professeursDisponibles.find(p => p.id === formData.professeur_principal)?.prenom}{' '}
                          {professeursDisponibles.find(p => p.id === formData.professeur_principal)?.nom}
                        </p>
                        <p className="text-sm text-gray-500">Professeur principal</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, professeur_principal: "" }))}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un professeur..."
                    value={searchProfesseur}
                    onChange={(e) => setSearchProfesseur(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {filteredProfesseurs.length > 0 ? (
                    <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                      {filteredProfesseurs.map(prof => (
                        <li 
                          key={prof.id}
                          className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                            formData.professeur_principal === prof.id ? 'bg-green-50' : ''
                          }`}
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            professeur_principal: prof.id
                          }))}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              formData.professeur_principal === prof.id 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {prof.prenom.charAt(0)}{prof.nom.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">
                                {prof.prenom} {prof.nom}
                              </p>
                            </div>
                            {formData.professeur_principal === prof.id && (
                              <span className="text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {searchProfesseur 
                        ? "Aucun professeur ne correspond à votre recherche" 
                        : "Aucun professeur disponible"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section Élèves */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaUsers className="text-green-600" />
                Élèves de la classe
              </h2>
              <span className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                {formData.eleves.length} sélectionné(s)
              </span>
            </div>
            
            <div className="space-y-4">
              {formData.eleves.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Élèves sélectionnés</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formData.eleves.map(eleveId => {
                      const eleve = elevesDisponibles.find(e => e.id === eleveId);
                      return eleve ? (
                        <div 
                          key={eleveId}
                          className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                              <FaUserGraduate className="text-sm" />
                            </div>
                            <span>{eleve.prenom} {eleve.nom}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveEleve(eleveId)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un élève..."
                    value={searchEleve}
                    onChange={(e) => setSearchEleve(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {filteredEleves.length > 0 ? (
                    <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                      {filteredEleves.map(eleve => (
                        <li key={eleve.id} className="p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`eleve-${eleve.id}`}
                              checked={formData.eleves.includes(eleve.id)}
                              onChange={() => handleEleveToggle(eleve.id)}
                              className="h-4 w-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                            />
                            <label 
                              htmlFor={`eleve-${eleve.id}`} 
                              className="flex-1 flex items-center gap-3 cursor-pointer"
                            >
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                formData.eleves.includes(eleve.id)
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {eleve.prenom.charAt(0)}{eleve.nom.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {eleve.prenom} {eleve.nom}
                                </p>
                              </div>
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {searchEleve 
                        ? "Aucun élève ne correspond à votre recherche" 
                        : "Aucun élève disponible"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading || !formData.professeur_principal || !formData.nom}
              className={`w-full md:w-auto flex justify-center items-center px-8 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all ${
                loading || !formData.professeur_principal || !formData.nom
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 shadow-md"
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Création en cours...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Créer la classe
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreerClasse;