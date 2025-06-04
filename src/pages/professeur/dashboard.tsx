// src/pages/professeur/dashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import type { Classe, Simulation } from "../../types";
import { useUser } from "../../hooks/useUser";
import { Card, CardContent } from "../../components/ui/card";
import ComparaisonCoeurs from "../../components/threejs/ComparaisonCoeurs";

interface Eleve {
  id: string;
  nom: string;
  prenom: string;
}

const ProfesseurDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Professeur | null
  const [classes, setClasses] = useState<Classe[]>([]);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [elevesParClasse, setElevesParClasse] = useState<Record<number, Eleve[]>>({});

  useEffect(() => {
    if (user) {
      fetchClasses();
      fetchSimulations();
    }
  }, [user]);

  const fetchClasses = async () => {
    const { data, error } = await supabase
      .from("classe")
      .select("*")
      .eq("professeur_id", user!.id);

    if (error) {
      console.error("Erreur chargement classes :", error.message);
    } else {
      setClasses(data || []);
      data?.forEach((classe) => fetchEleves(classe.id));
    }
  };

  const fetchEleves = async (classeId: number) => {
    const { data, error } = await supabase
      .from("classe_eleve")
      .select("eleve:eleve_id (id, prenom, nom)")
      .eq("classe_id", classeId);

    if (error) {
      console.error(`Erreur chargement élèves pour classe ${classeId} :`, error.message);
    } else {
      // eleve peut être un objet ou un tableau dans le select imbriqué, on normalise en tableau
      const eleves: Eleve[] = data?.flatMap(item => {
        if (Array.isArray(item.eleve)) return item.eleve;
        else return item.eleve ? [item.eleve] : [];
      }) || [];

      setElevesParClasse(prev => ({ ...prev, [classeId]: eleves }));
    }
  };

  const fetchSimulations = async () => {
    const { data, error } = await supabase
      .from("simulation")
      .select("*")
      .eq("created_by", user!.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Erreur chargement simulations :", error.message);
    } else {
      setSimulations(data || []);
    }
  };

  const retirerEleve = async (classeId: number, eleveId: string) => {
    if (!confirm("Confirmez-vous la suppression de cet élève de la classe ?")) return;

    const { error } = await supabase
      .from("classe_eleve")
      .delete()
      .eq("classe_id", classeId)
      .eq("eleve_id", eleveId);

    if (error) {
      console.error("Erreur lors de la suppression de l'élève :", error.message);
      alert("Erreur lors de la suppression de l'élève.");
    } else {
      setElevesParClasse((prev) => ({
        ...prev,
        [classeId]: prev[classeId].filter((eleve) => eleve.id !== eleveId),
      }));
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Bouton Retour */}
      <button
        onClick={() => navigate("/connexion")}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
      >
        ← Retour
      </button>

      <h1 className="text-3xl font-bold mb-6">Tableau de bord du professeur</h1>

      {/* Section Classes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Mes classes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {classes.length === 0 && <p>Aucune classe trouvée.</p>}
          {classes.map((classe) => (
            <Card key={classe.id} className="cursor-default">
              <CardContent>
                <p className="text-lg font-medium">{classe.nom}</p>
                <p className="text-sm text-gray-500">Code : {classe.codeClasse}</p>
                <h3 className="mt-4 font-semibold">Élèves :</h3>
                <ul className="list-disc list-inside text-sm max-h-40 overflow-auto">
                  {(elevesParClasse[classe.id] || []).map((eleve) => (
                    <li key={eleve.id} className="flex justify-between items-center">
                      <Link
                        to={`/professeur/eleveDetail/${eleve.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {eleve.prenom} {eleve.nom}
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 text-xs"
                        onClick={() => retirerEleve(classe.id, eleve.id)}
                      >
                        Retirer
                      </button>
                    </li>
                  ))}
                  {(!elevesParClasse[classe.id] || elevesParClasse[classe.id].length === 0) && (
                    <li className="text-gray-500">Aucun élève</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section Simulations */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Simulations récentes</h2>
        <ul className="space-y-2">
          {simulations.length === 0 && <li>Aucune simulation récente.</li>}
          {simulations.map((sim) => (
            <li key={sim.id} className="bg-white shadow rounded p-4">
              <p className="font-medium">{sim.titre}</p>
              <p className="text-sm text-gray-500">{sim.chapitre} — {sim.type}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section Comparaison anatomique des cœurs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Comparaison anatomique des cœurs de vertébrés</h2>
        <ComparaisonCoeurs />
      </section>
    </div>
  );
};

export default ProfesseurDashboard;