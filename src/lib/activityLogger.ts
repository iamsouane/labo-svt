import { supabase } from './supabaseClient';

export const logActivity = async (type: 'connexion' | 'simulation' | 'inscription') => {
  const today = new Date().toISOString().split('T')[0];
  
  const { error } = await supabase
    .rpc('increment_activity_log', {
      p_date: today,
      p_type_activite: type === 'connexion' ? 'connexions' : `${type}s`,
      p_increment: 1
    });

  if (error) {
    console.error('Error logging activity:', error);
  }
};

// Fonction pour récupérer les données d'activité
export const getActivityData = async (days: number = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  
  const { data, error } = await supabase
    .from('logs_activite')
    .select('date, count, type_activite')
    .gte('date', date.toISOString())
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching activity data:', error);
    return null;
  }

  return data;
};