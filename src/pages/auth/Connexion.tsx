import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignInAlt, FaEnvelope, FaLock, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.fromAdmin || !document.referrer) {
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErreur("");

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password: motDePasse,
      });

      if (error || !authData.user) {
        throw error || new Error("Erreur lors de la connexion");
      }

      const { error: logError } = await supabase.rpc('log_connection');
      if (logError) throw logError;

      const { data: utilisateur, error: userError } = await supabase
        .from("utilisateur")
        .select("role")
        .eq("id", authData.user.id)
        .single();

      if (userError || !utilisateur) {
        throw new Error("Impossible de récupérer les informations utilisateur");
      }

      const from = location.state?.from || getDashboardPath(utilisateur.role);
      navigate(from, { replace: true });

    } catch (error: any) {
      setErreur(error.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const getDashboardPath = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "PROFESSEUR":
        return "/professeur/dashboard";
      case "ELEVE":
        return "/eleve/dashboard";
      default:
        return "/";
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErreur("");
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;

      const { error: logError } = await supabase.rpc('log_connection');
      if (logError) throw logError;

    } catch (error: any) {
      setErreur(error.message || "Erreur lors de la connexion avec Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-green-50 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <button 
            onClick={handleBack}
            className="flex items-center text-green-600 hover:text-green-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Retour
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 text-center">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center">
              <FaSignInAlt className="mr-2" />
              Connexion
            </h2>
            <p className="text-green-100 mt-1">Accédez à votre espace personnel</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLock className="w-4 h-4" />
              </div>
              <input
                type="password"
                placeholder="Mot de passe"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="text-right">
              <a 
                href="/mot-de-passe-oublie" 
                className="text-sm text-green-600 hover:text-green-800 hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg shadow-sm text-white font-medium ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
              } transition-all duration-300`}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>

            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">ou</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg shadow-sm border font-medium transition-all duration-300 ${
                isLoading
                  ? 'border-gray-300 bg-gray-100 text-gray-400'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FcGoogle className="mr-2 text-lg" />
              Continuer avec Google
            </button>

            {erreur && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {erreur}
              </div>
            )}
          </form>

          <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <a 
                href="/inscription" 
                className="text-green-600 hover:text-green-800 font-medium flex items-center justify-center"
              >
                <FaUserPlus className="mr-1" />
                S'inscrire
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>En vous connectant, vous acceptez nos conditions d'utilisation.</p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;