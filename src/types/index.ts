// Type littéral (uniquement pour TypeScript)
export type Role = 'ADMIN' | 'PROFESSEUR' | 'ELEVE';

// Objet JS avec les valeurs (pour utiliser dans le code runtime)
export const RoleValues = {
  ADMIN: 'ADMIN' as Role,
  PROFESSEUR: 'PROFESSEUR' as Role,
  ELEVE: 'ELEVE' as Role,
} as const;

// Pareil pour TypeSimulation
export type TypeSimulation = 'UNITY' | 'HTML5' | 'THREEJS';

export const TypeSimulationValues = {
  UNITY: 'UNITY' as TypeSimulation,
  HTML5: 'HTML5' as TypeSimulation,
  THREEJS: 'THREEJS' as TypeSimulation,
} as const;

// ====================
// Interfaces Utilisateurs
// ====================

// id est un UUID (string)
// motDePasse n'existe pas (gestion via Supabase Auth)
// email n'est pas en base utilisateur mais dans auth.users, peut être ajouté en join
export interface Utilisateur {
  id: string;           // UUID (string)
  nom?: string;
  prenom?: string;
  role: Role;
  created_at?: string;
  email?: string;       // optionnel, à récupérer via jointure auth.users
}

export interface Admin extends Utilisateur {}
export interface Professeur extends Utilisateur {}
export interface Eleve extends Utilisateur {
  classe_id?: number;
}

// ====================
// Interface Classe
// ====================

// correspond à la table "classe" en base
export interface Classe {
  id: number;
  nom: string;
  codeClasse: string;
  dateCreation?: string;
  professeur_id?: string; // UUID du professeur responsable
  created_at?: string;
  description?: string;
}

// ====================
// Interface Simulation
// ====================

export interface Simulation {
  id: number;
  titre: string;
  description: string;
  chapitre: string;
  type: TypeSimulation;
  created_at?: string;
  created_by?: string; // UUID de l'admin qui a créé la simulation
}

// ====================
// Tables de jointure
// ====================

export interface ClasseEleve {
  classe_id: number;
  eleve_id: string;  // UUID
  created_at?: string;
}

export interface SimulationClasse {
  simulation_id: number;
  classe_id: number;
  created_at?: string;
}

// ====================
// ActivityLog
// ====================

export interface ActivityLog {
  date: string;
  count: number;
  type_activite: 'connexions' | 'simulations' | 'inscriptions';
}

export interface DailyStats {
  date: string;
  connexions: number;
  simulations: number;
  inscriptions: number;
}

export interface RecentActivity {
  type: 'simulation' | 'inscription';
  id: number;
  description: string;
  utilisateur: string;
  created_at: string;
}