// src/hooks/useUser.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export type Role = "ADMIN" | "PROFESSEUR" | "ELEVE";

export interface Utilisateur {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: Role;
  created_at?: string;
}

export const useUser = () => {
  const [user, setUser] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session?.user) {
        setUser(null);
        return;
      }

      const { data: userData, error } = await supabase
        .from("utilisateur")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;

      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      navigate("/connexion");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchUser();

    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
      fetchUser();
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading, logout };
};