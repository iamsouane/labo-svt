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

export interface Utilisateur {
  id: number;
  email: string;
  motDePasse: string;
  role: Role;
  created_at?: string;
}

export interface Admin extends Utilisateur {
  nom: string;
  prenom: string;
}

export interface Professeur extends Utilisateur {
  nom: string;
  prenom: string;
}

export interface Eleve extends Utilisateur {
  nom: string;
  prenom: string;
  classe_id?: number;
}

// ====================
// Interface Classe
// ====================

export interface Classe {
  id: number;
  nom: string;
  codeClasse: string;
  dateCreation: string;
  professeur_id: number; // ID du professeur responsable
  created_at?: string;
}

// ====================
// Interface Simulation
// ====================

export interface Simulation {
  id: number;
  title: string;
  description: string;
  chapitre: string;
  type: TypeSimulation;
  created_at?: string;
  created_by?: number; // ID de l'admin qui a créé la simulation
}

// ====================
// Tables de jointure
// ====================

export interface ClasseEleve {
  classe_id: number;
  eleve_id: number;
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