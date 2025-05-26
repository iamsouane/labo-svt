import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { RoleValues } from "../types";

const Inscription = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: RoleValues.ELEVE,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const { nom, prenom, email, password, role } = form;

    // 1. Créer le compte dans Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !signUpData.user) {
      setError(signUpError?.message || "Erreur lors de la création du compte.");
      return;
    }

    // 2. Insérer les infos supplémentaires dans la table `utilisateur`
    const { error: insertError } = await supabase.from("utilisateur").insert({
      id: signUpData.user.id,
      nom,
      prenom,
      role,
    });

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
          className="input"
        />

        <select
          name="role"
          onChange={handleChange}
          value={form.role}
          className="input"
        >
          <option value={RoleValues.ELEVE}>Élève</option>
          <option value={RoleValues.PROFESSEUR}>Professeur</option>
          <option value={RoleValues.ADMIN}>Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          S'inscrire
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">Compte créé avec succès !</p>}
      </form>
    </div>
  );
};

export default Inscription;