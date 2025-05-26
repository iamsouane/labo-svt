import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { RoleValues } from "../../types";
import { FaUser, FaEnvelope, FaLock, FaChalkboardTeacher, FaUserGraduate, FaUserShield, FaCheck } from "react-icons/fa";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { nom, prenom, email, password, role } = form;

      // 1. Créer le compte dans Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError || !signUpData.user) {
        throw signUpError || new Error("Erreur lors de la création du compte");
      }

      // 2. Insérer les infos supplémentaires dans la table `utilisateur`
      const { error: insertError } = await supabase.from("utilisateur").insert({
        id: signUpData.user.id,
        nom,
        prenom,
        role,
      });

      if (insertError) {
        throw insertError;
      }

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Créer un compte</h2>
            <p className="text-green-100 mt-1">Rejoignez notre plateforme éducative</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Nom et Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Adresse email"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLock className="w-4 h-4" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Role Select */}
            <div className="relative">
              <select
                name="role"
                onChange={handleChange}
                value={form.role}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
              >
                <option value={RoleValues.ELEVE} className="flex items-center">
                  <FaUserGraduate className="inline mr-2" /> Élève
                </option>
                <option value={RoleValues.PROFESSEUR} className="flex items-center">
                  <FaChalkboardTeacher className="inline mr-2" /> Professeur
                </option>
                <option value={RoleValues.ADMIN} className="flex items-center">
                  <FaUserShield className="inline mr-2" /> Administrateur
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg shadow-sm text-white font-medium ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
              } transition-all duration-300`}
            >
              {isLoading ? (
                'Chargement...'
              ) : (
                <>
                  <FaCheck className="mr-2" />
                  S'inscrire
                </>
              )}
            </button>

            {/* Messages d'erreur/succès */}
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                Compte créé avec succès ! Veuillez vérifier votre email pour confirmer votre compte.
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{' '}
              <a href="/connexion" className="text-green-600 hover:text-green-800 font-medium">
                Se connecter
              </a>
            </p>
          </div>
        </div>

        {/* Info supplémentaire */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.</p>
        </div>
      </div>
    </div>
  );
};

export default Inscription;