import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "../../hooks/useUser";
import type { Classe } from "../../types";

interface Eleve {
  id: string;
  nom: string;
  prenom: string;
}

const EleveDetail = () => {
  const { eleveId } = useParams<{ eleveId: string }>();
  const { user } = useUser(); // Professeur connecté
  const navigate = useNavigate();

  const [eleve, setEleve] = useState<Eleve | null>(null);
  const [classe, setClasse] = useState<Classe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eleveId || !user) return;

    const fetchData = async () => {
      setLoading(true);

      // 1. Charger les infos de l'élève
      const { data: eleveData, error: eleveError } = await supabase
        .from("utilisateur")
        .select("id, nom, prenom")
        .eq("id", eleveId)
        .single();

      if (eleveError) {
        console.error("Erreur chargement élève :", eleveError.message);
        setLoading(false);
        return;
      }

      setEleve(eleveData);

      // 2. Charger la classe liée à cet élève et à ce professeur
      const { data: classeEleveData, error: classeError } = await supabase
        .from("classe_eleve")
        .select(`
          classe:classe_id (
            id,
            nom,
            code_classe,
            professeur_id
          )
        `)
        .eq("eleve_id", eleveId)
        .eq("classe.professeur_id", user.id)
        .limit(1);

      if (classeError) {
        console.error("Erreur chargement classe :", classeError.message);
        setLoading(false);
        return;
      }

      const classeBrute = Array.isArray(classeEleveData?.[0]?.classe)
  ? classeEleveData?.[0]?.classe[0]
  : classeEleveData?.[0]?.classe;


      if (classeBrute) {
        const classeFormatee: Classe = {
          id: classeBrute.id,
          nom: classeBrute.nom,
          codeClasse: classeBrute.code_classe, // Mapping DB → TS
          professeur_id: classeBrute.professeur_id,
        };
        setClasse(classeFormatee);
      } else {
        setClasse(null);
      }

      setLoading(false);
    };

    fetchData();
  }, [eleveId, user]);

  if (loading) return <div>Chargement...</div>;

  if (!eleve) return <div>Élève non trouvé.</div>;

  return (
    <div className="p-6 space-y-6">
      <button
        className="text-blue-600 underline"
        onClick={() => navigate(-1)}
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold">
        Détails de l'élève : {eleve.prenom} {eleve.nom}
      </h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">Classe</h2>
        {classe ? (
          <div className="border rounded p-4 bg-white shadow">
            <p><strong>Nom :</strong> {classe.nom}</p>
            <p><strong>Code :</strong> {classe.codeClasse}</p>
          </div>
        ) : (
          <p>L'élève n'est inscrit dans aucune de vos classes.</p>
        )}
      </div>
    </div>
  );
};

export default EleveDetail;