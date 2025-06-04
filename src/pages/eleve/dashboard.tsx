import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { supabase } from "../../lib/supabaseClient";
import type { Classe, Simulation } from "../../types";
import { useNavigate } from "react-router-dom";

const EleveDashboard = () => {
  const { user } = useUser(); // user est de type Eleve | null
  const navigate = useNavigate();

  const [classe, setClasse] = useState<Classe | null>(null);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);

      // 1. Récupérer la classe de l'élève
      const { data: classeData, error: classeError } = await supabase
        .from("classe_eleve")
        .select("classe:classe_id (id, nom, code_classe, professeur_id)")
        .eq("eleve_id", user.id)
        .limit(1)
        .single();

      if (classeError) {
        console.error("Erreur lors du chargement de la classe :", classeError.message);
      } else {
        const classeBrute = Array.isArray(classeData?.classe)
          ? classeData.classe[0]
          : classeData?.classe;

        if (classeBrute) {
          setClasse({
            id: classeBrute.id,
            nom: classeBrute.nom,
            codeClasse: classeBrute.code_classe,
            professeur_id: classeBrute.professeur_id,
          });
        }
      }

      // 2. Charger les simulations disponibles (optionnel : filtrer par classe ou par type)
      const { data: simulationsData, error: simError } = await supabase
        .from("simulation")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (simError) {
        console.error("Erreur lors du chargement des simulations :", simError.message);
      } else {
        setSimulations(simulationsData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => navigate("/connexion")}
        className="text-blue-600 underline mb-4"
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold">Bienvenue, {user.prenom} {user.nom}</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Votre classe</h2>
        {classe ? (
          <div className="bg-white shadow p-4 rounded">
            <p><strong>Nom :</strong> {classe.nom}</p>
            <p><strong>Code :</strong> {classe.codeClasse}</p>
          </div>
        ) : (
          <p>Vous n'êtes inscrit dans aucune classe pour le moment.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Simulations disponibles</h2>
        {simulations.length > 0 ? (
          <ul className="space-y-2">
            {simulations.map((sim) => (
              <li key={sim.id} className="bg-white shadow p-4 rounded">
                <p className="font-medium">{sim.titre || sim.titre}</p>
                <p className="text-sm text-gray-500">
                  {(sim.chapitre || sim.description || "")} — {sim.type}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune simulation disponible.</p>
        )}
      </section>

      <section className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Espace Visualisation</h2>
        <p className="text-gray-700">
          Ici vous retrouverez vos simulations ou contenus interactifs.
        </p>
        {/* Intégration future : iframe, lecteur simulation, etc. */}
      </section>
    </div>
  );
};

export default EleveDashboard;