import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<"ADMIN" | "PROFESSEUR" | "ELEVE" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSessionAndRole = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session?.user) {
        const { data: userData, error } = await supabase
          .from("utilisateur")
          .select("role")
          .eq("id", data.session.user.id)
          .single();

        if (!error && userData) {
          setRole(userData.role);
        }
      }
    };

    getSessionAndRole();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        supabase
          .from("utilisateur")
          .select("role")
          .eq("id", newSession.user.id)
          .single()
          .then(({ data: userData, error }) => {
            if (!error && userData) {
              setRole(userData.role);
            }
          });
      } else {
        setRole(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const getHomePath = () => {
    if (!session || !role) return "/";
    switch (role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "PROFESSEUR":
        return "/prof";
      case "ELEVE":
        return "/eleve";
      default:
        return "/";
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/connexion");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm px-4 py-3 fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to={getHomePath()}
          className="flex items-center text-2xl font-bold text-green-700 hover:text-green-800 transition-colors"
        >
          <span className="mr-2">🔬</span>
          <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Labo-SVT
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to={getHomePath()}>Accueil</NavLink>
          <NavLink to="/apropos">À propos</NavLink>

          {session && (
            <>
              <NavLink to="/simulations">Simulations</NavLink>
              <NavLink to="/visualisation">Visualisation 3D</NavLink>
            </>
          )}

          <NavLink to="/contact">Contact</NavLink>

          <div className="w-px h-6 bg-gray-200 mx-2"></div>

          {!session ? (
            <Link
              to="/connexion"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2 rounded-full hover:from-green-700 hover:to-green-800 transition-all shadow-sm hover:shadow-md font-medium"
            >
              Connexion
            </Link>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-full hover:bg-red-200 transition"
            >
              Déconnexion
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? (
            <X size={28} className="text-gray-700" />
          ) : (
            <Menu size={28} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 mt-2 py-3 px-4 space-y-3 rounded-lg shadow-xl mx-4 border border-gray-100">
          <MobileNavLink to={getHomePath()} onClick={() => setIsOpen(false)}>Accueil</MobileNavLink>
          <MobileNavLink to="/a-propos" onClick={() => setIsOpen(false)}>À propos</MobileNavLink>

          {session && (
            <>
              <MobileNavLink to="/simulations" onClick={() => setIsOpen(false)}>Simulations</MobileNavLink>
              <MobileNavLink to="/visualisation" onClick={() => setIsOpen(false)}>Visualisation 3D</MobileNavLink>
            </>
          )}

          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>

          <div className="pt-2">
            {!session ? (
              <Link
                to="/connexion"
                className="inline-block w-full text-center bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 rounded-full font-medium"
                onClick={() => setIsOpen(false)}
              >
                Connexion
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleSignOut();
                }}
                className="w-full text-center text-red-600 bg-red-100 px-5 py-2.5 rounded-full hover:bg-red-200 font-medium"
              >
                Déconnexion
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop NavLink
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="px-4 py-2 text-gray-700 hover:text-green-700 font-medium rounded-lg hover:bg-green-50/50 transition-colors duration-200"
  >
    {children}
  </Link>
);

// Mobile NavLink
const MobileNavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2.5 text-gray-700 hover:text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200"
  >
    {children}
  </Link>
);

export default Navbar;