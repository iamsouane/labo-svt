import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { FaChalkboardTeacher, FaUserGraduate, FaSchool, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Classe {
  id: number;
  nom: string;
  codeClasse: string;
  dateCreation: string;
}

interface Professeur {
  id: string;
  nom: string;
  prenom: string;
  role: string;
  created_at: string;
}

interface Eleve {
  id: string;
  nom: string;
  prenom: string;
  role: string;
  created_at: string;
}

const ClasseDetail = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Classe[]>([]);
  const [selectedClasse, setSelectedClasse] = useState<Classe | null>(null);
  const [professeurPrincipal, setProfesseurPrincipal] = useState<Professeur | null>(null);
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("classe")
        .select("id, nom, code_classe, date_creation")
        .order("nom", { ascending: true });
      
      if (error) {
        console.error("Erreur chargement classes :", error.message);
      } else if (data) {
        const formatted = data.map((c) => ({
          id: c.id,
          nom: c.nom,
          codeClasse: c.code_classe,
          dateCreation: c.date_creation,
        }));
        setClasses(formatted);
      }
      setLoading(false);
    };
    fetchClasses();
  }, []);

  const handleVoirClasse = async (classeId: number) => {
    setLoading(true);
    const { data: classeData, error: classeError } = await supabase
      .from("classe")
      .select("id, nom, code_classe, date_creation")
      .eq("id", classeId)
      .single();

    if (classeError || !classeData) {
      console.error("Erreur chargement classe :", classeError?.message);
      setSelectedClasse(null);
      setProfesseurPrincipal(null);
      setEleves([]);
      setLoading(false);
      return;
    }

    setSelectedClasse({
      id: classeData.id,
      nom: classeData.nom,
      codeClasse: classeData.code_classe,
      dateCreation: classeData.date_creation,
    });

    await Promise.all([
      fetchProfesseurPrincipal(classeData.id),
      fetchEleves(classeData.id)
    ]);
    
    setLoading(false);
  };

  const fetchProfesseurPrincipal = async (classeId: number) => {
    const { data: cpData, error: cpError } = await supabase
      .from("classe_professeur")
      .select("professeur_id")
      .eq("classe_id", classeId)
      .eq("is_principal", true)
      .single();

    if (cpError || !cpData) {
      console.error("Professeur principal non trouvé :", cpError?.message);
      setProfesseurPrincipal(null);
      return;
    }

    const profId = cpData.professeur_id;
    const { data: profData, error: profError } = await supabase
      .from("utilisateur")
      .select("id, nom, prenom, role, created_at")
      .eq("id", profId)
      .single();

    if (profError || !profData) {
      console.error("Professeur principal non trouvé (utilisateur) :", profError?.message);
      setProfesseurPrincipal(null);
    } else {
      setProfesseurPrincipal(profData);
    }
  };

  const fetchEleves = async (classeId: number) => {
    const { data: elevesData, error: elevesError } = await supabase
      .from("classe_eleve")
      .select(`
        eleve_id:utilisateur (
          id,
          nom,
          prenom,
          role,
          created_at
        )
      `)
      .eq("classe_id", classeId)
      .order("prenom", { foreignTable: "eleve_id", ascending: true });

    if (elevesError) {
      console.error("Erreur récupération élèves :", elevesError.message);
      setEleves([]);
    } else if (elevesData) {
      const formattedEleves = elevesData.map((item) => item.eleve_id).filter(Boolean);
      setEleves(formattedEleves);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-green-600 hover:text-green-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaSchool className="mr-2 text-green-600" />
            Gestion des Classes
          </h1>
          <div className="w-24"></div> {/* Espaceur pour l'alignement */}
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-3">
              <FaSpinner className="animate-spin text-green-600 text-xl" />
              <p className="text-gray-800">Chargement en cours...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des classes */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="bg-green-700 p-4 rounded-t-xl">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <FaSchool className="mr-2" />
                Liste des Classes
              </h2>
            </div>
            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
              {classes.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  Aucune classe disponible
                </div>
              ) : (
                classes.map((classe) => (
                  <div 
                    key={classe.id} 
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedClasse?.id === classe.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleVoirClasse(classe.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{classe.nom}</p>
                        <p className="text-sm text-gray-500">Code: {classe.codeClasse}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {new Date(classe.dateCreation).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Détails de la classe */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            {selectedClasse ? (
              <>
                <div className="bg-green-700 p-4 rounded-t-xl">
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    <FaSchool className="mr-2" />
                    Détails de la Classe
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{selectedClasse.nom}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {selectedClasse.codeClasse}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Date de création</p>
                        <p className="font-medium">
                          {new Date(selectedClasse.dateCreation).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">Nombre d'élèves</p>
                        <p className="font-medium">{eleves.length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Professeur principal */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                      <FaChalkboardTeacher className="mr-2 text-green-600" />
                      Professeur Principal
                    </h3>
                    {professeurPrincipal ? (
                      <div className="flex items-center space-x-4 bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                            {professeurPrincipal.prenom.charAt(0)}{professeurPrincipal.nom.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {professeurPrincipal.prenom} {professeurPrincipal.nom}
                          </p>
                          <p className="text-sm text-gray-500">Professeur principal</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                        Aucun professeur principal assigné à cette classe
                      </div>
                    )}
                  </div>

                  {/* Liste des élèves */}
                  <div>
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <FaUserGraduate className="mr-2 text-green-600" />
                        Liste des Élèves
                      </h3>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {eleves.length} élève{eleves.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {eleves.length > 0 ? (
                      <div className="overflow-hidden border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nom
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Prénom
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date d'inscription
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {eleves.map((eleve) => (
                              <tr key={eleve.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {eleve.nom}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {eleve.prenom}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(eleve.created_at).toLocaleDateString('fr-FR')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 text-gray-600 p-8 rounded-lg text-center">
                        Aucun élève inscrit dans cette classe
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaSchool className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une classe</h3>
                <p className="text-gray-500">Choisissez une classe dans la liste pour afficher ses détails</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClasseDetail;