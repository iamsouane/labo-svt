import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { supabase } from "../../lib/supabaseClient";
import {
  FaChartLine,
  FaFlask,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCog,
  FaSignOutAlt,
  FaSpinner,
  FaUsersCog,
  FaSchool,
  FaPlus,
  FaFileAlt,
  FaUserPlus,
  FaChartBar
} from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Classe {
  id: number;
  nom: string;
  codeClasse: string;
  dateCreation: string;
}

interface Professeur {
  id: string;
  nom: string;
  prenom: string;
  role: string;
  created_at: string;
}

// Fonction utilitaire pour remplir les dates manquantes
function fillMissingDates(data: any[], startDate: Date, endDate: Date) {
  const result = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const existingData = data.find(item => item.date === dateStr);

    result.push(existingData || {
      date: dateStr,
      connexions: 0,
      simulations: 0,
      inscriptions: 0
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

// Fonction utilitaire pour formater les labels selon l'intervalle
function formatDateLabels(data: any[], timeRange: string) {
  return data.map(item => {
    const date = new Date(item.date);

    if (timeRange === '12months') {
      return date.toLocaleDateString('fr-FR', { month: 'short' });
    } else if (timeRange === '30days' || data.length > 14) {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    } else {
      return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
    }
  });
}

const AdminDashboard = () => {
  const { user, loading: userLoading, logout } = useUser();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "simulations":
        return <SimulationsManagement />;
      case "professeurs":
        return <TeachersManagement />;
      case "eleves":
        return <StudentsManagement />;
      case "classes":
        return <ClassesManagement />;
      case "parametres":
        return <PlatformSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fixe */}
      <div className={`bg-gradient-to-b from-green-800 to-green-900 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col fixed h-full z-10`}>
        <div className="p-4 flex items-center justify-between border-b border-green-700">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold flex items-center">
              <FaUsersCog className="mr-2" />
              Admin Panel
            </h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-full hover:bg-green-700"
          >
            {isSidebarOpen ? '◄' : '►'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === "dashboard" ? 'bg-green-700' : 'hover:bg-green-700'}`}
          >
            <FaChartLine className="text-lg" />
            {isSidebarOpen && <span className="ml-3">Tableau de bord</span>}
          </button>

          <button
            onClick={() => setActiveTab("simulations")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === "simulations" ? 'bg-green-700' : 'hover:bg-green-700'}`}
          >
            <FaFlask className="text-lg" />
            {isSidebarOpen && <span className="ml-3">Simulations</span>}
          </button>

          <button
            onClick={() => setActiveTab("professeurs")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === "professeurs" ? 'bg-green-700' : 'hover:bg-green-700'}`}
          >
            <FaChalkboardTeacher className="text-lg" />
            {isSidebarOpen && <span className="ml-3">Professeurs</span>}
          </button>

          <button
            onClick={() => setActiveTab("eleves")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === "eleves" ? 'bg-green-700' : 'hover:bg-green-700'}`}
          >
            <FaUserGraduate className="text-lg" />
            {isSidebarOpen && <span className="ml-3">Élèves</span>}
          </button>

          <button
            onClick={() => setActiveTab("classes")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === "classes" ? 'bg-green-700' : 'hover:bg-green-700'}`}
          >
            <FaSchool className="text-lg" />
            {isSidebarOpen && <span className="ml-3">Classes</span>}
          </button>

          <button
            onClick={() => setActiveTab("parametres")}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === "parametres" ? 'bg-green-700' : 'hover:bg-green-700'}`}
          >
            <FaCog className="text-lg" />
            {isSidebarOpen && <span className="ml-3">Paramètres</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-green-700">
          <div className="text-sm mb-2 text-green-200">
            {isSidebarOpen && `Connecté en tant que ${user?.prenom} ${user?.nom}`}
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center p-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaSignOutAlt className="text-lg" />
            {isSidebarOpen && <span className="ml-3">Déconnexion</span>}
          </button>
        </div>
      </div>

      {/* Contenu principal avec marge dynamique */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} min-h-screen`}>
        <main className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 capitalize mb-6">
            {activeTab === "dashboard" && "Tableau de bord"}
            {activeTab === "simulations" && "Gestion des simulations"}
            {activeTab === "professeurs" && "Gestion des professeurs"}
            {activeTab === "eleves" && "Gestion des élèves"}
            {activeTab === "classes" && "Gestion des classes"}
            {activeTab === "parametres" && "Paramètres de la plateforme"}
          </h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    eleves: 0,
    professeurs: 0,
    simulations: 0,
    classes: 0,
    connexions: 0
  });
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<any[]>([]);
  const [activityData, setActivityData] = useState({
    labels: [] as string[],
    datasets: [] as any[]
  });
  const [timeRange, setTimeRange] = useState('7days');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch basic stats
        const [
          { count: eleves },
          { count: professeurs },
          { count: simulations },
          { count: classes },
          { data: activityStats }
        ] = await Promise.all([
          supabase.from('utilisateur').select('*', { count: 'exact', head: true }).eq('role', 'ELEVE'),
          supabase.from('utilisateur').select('*', { count: 'exact', head: true }).eq('role', 'PROFESSEUR'),
          supabase.from('simulation').select('*', { count: 'exact', head: true }),
          supabase.from('classe').select('*', { count: 'exact', head: true }),
          supabase.from('stats_quotidiennes').select('*').order('date', { ascending: true })
        ]);

        // 2. Calculate date range
        const endDate = new Date();
        const startDate = new Date();

        if (timeRange === '7days') {
          startDate.setDate(endDate.getDate() - 7);
        } else if (timeRange === '12months') {
          startDate.setMonth(endDate.getMonth() - 12);
        } else {
          startDate.setDate(endDate.getDate() - 30);
        }

        // 3. Filter and fill missing dates
        const filteredActivityStats = fillMissingDates(
          activityStats?.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= startDate && itemDate <= endDate;
          }) || [],
          startDate,
          endDate
        );

        // 4. Format labels
        const labels = formatDateLabels(filteredActivityStats, timeRange);

        // 5. Prepare datasets
        const datasets = [
          {
            label: 'Connexions',
            data: filteredActivityStats.map(item => item.connexions || 0),
            borderColor: 'rgb(22, 163, 74)',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          },
          {
            label: 'Simulations',
            data: filteredActivityStats.map(item => item.simulations || 0),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          },
          {
            label: 'Inscriptions',
            data: filteredActivityStats.map(item => item.inscriptions || 0),
            borderColor: 'rgb(168, 85, 247)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          }
        ];

        setActivityData({ labels, datasets });

        // 6. Fetch recent activities
        const { data: recentActivities } = await supabase
          .from('recent_activities_view')
          .select('*')
          .limit(5);

        // 7. Update states
        setStats({
          eleves: eleves || 0,
          professeurs: professeurs || 0,
          simulations: simulations || 0,
          classes: classes || 0,
          connexions: filteredActivityStats.reduce((sum, item) => sum + (item.connexions || 0), 0)
        });

        setActivities(recentActivities?.map(activity => ({
          id: activity.id,
          user: activity.utilisateur,
          action: activity.action,
          time: new Date(activity.created_at).toLocaleDateString('fr-FR'),
          type: activity.type
        })) || []);

      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-2xl text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard
          icon={<FaUserGraduate className="text-2xl" />}
          title="Élèves inscrits"
          value={stats.eleves}
        />
        <StatCard
          icon={<FaChalkboardTeacher className="text-2xl" />}
          title="Professeurs"
          value={stats.professeurs}
        />
        <StatCard
          icon={<FaFlask className="text-2xl" />}
          title="Simulations"
          value={stats.simulations}
        />
        <StatCard
          icon={<FaSchool className="text-2xl" />}
          title="Classes"
          value={stats.classes}
        />
        <StatCard
          icon={<FaChartLine className="text-2xl" />}
          title="Connexions (30j)"
          value={stats.connexions}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold flex items-center">
                <BsGraphUp className="mr-2 text-green-600" />
                Activité récente
              </h3>
              <select
                className="border rounded-lg px-3 py-1 text-sm bg-white"
                value={timeRange}
                onChange={handleTimeRangeChange}
              >
                <option value="7days">7 derniers jours</option>
                <option value="30days">30 derniers jours</option>
                <option value="12months">12 derniers mois</option>
              </select>
            </div>

            <div className="h-64">
              <Line
                data={activityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.raw}`
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false
                      }
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0
                      },
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                      }
                    }
                  },
                  elements: {
                    point: {
                      radius: 3,
                      hoverRadius: 5
                    },
                    line: {
                      borderWidth: 2
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <QuickActions />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivities activities={activities} />
        <PopularSimulations />
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  title,
  value
}: {
  icon: React.ReactNode,
  title: string,
  value: number
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h4 className="text-gray-500 mt-4 text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <FaChartBar className="mr-2 text-green-600" />
        Actions rapides
      </h3>
      <div className="grid grid-cols-1 gap-3">
        <button
          className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          onClick={() => window.location.href = '/admin/creerClasse'}
        >
          <FaUserPlus className="mr-2" />
          Creer une classe
        </button>
        <button
          className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          onClick={() => window.location.href = '/admin/creerSimulation'}
        >
          <FaPlus className="mr-2" />
          Créer une simulation
        </button>
        <button
          className="flex items-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          onClick={() => window.location.href = '/admin/rapports'}
        >
          <FaFileAlt className="mr-2" />
          Générer un rapport
        </button>
        <button
          className="flex items-center p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
          onClick={() => window.location.href = '/admin/classeDetail'}
        >
          <FaUsersCog className="mr-2" />
          Details de la classe
        </button>
      </div>
    </div>
  );
};

const RecentActivities = ({ activities }: { activities: any[] }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'simulation':
        return <FaFlask className="text-blue-500" />;
      case 'inscription':
        return <FaUserPlus className="text-green-500" />;
      case 'classe':
        return <FaSchool className="text-purple-500" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-400"></div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <BsGraphUp className="mr-2 text-green-600" />
        Activités récentes
      </h3>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map(activity => (
            <div key={activity.id} className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Aucune activité récente</p>
        )}
      </div>
    </div>
  );
};

const PopularSimulations = () => {
  const [simulations, setSimulations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('simulation_classe')
          .select('simulation_id, simulation(title), count')
          .order('count', { ascending: false })
          .limit(5);

        setSimulations(data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des simulations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <FaFlask className="mr-2 text-green-600" />
        Simulations populaires
      </h3>
      {loading ? (
        <div className="flex justify-center py-4">
          <FaSpinner className="animate-spin text-green-600" />
        </div>
      ) : simulations.length > 0 ? (
        <div className="space-y-3">
          {simulations.map(sim => (
            <div key={sim.simulation_id} className="flex justify-between items-center">
              <span className="truncate">{sim.simulation?.title || 'Simulation inconnue'}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                {sim.count} classes
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">Aucune donnée disponible</p>
      )}
    </div>
  );
};

// Composants placeholder pour les autres onglets
const SimulationsManagement = () => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Gestion des simulations</h3>
    <p>Interface de gestion des simulations à implémenter</p>
  </div>
);

const TeachersManagement = () => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Gestion des professeurs</h3>
    <p>Interface de gestion des professeurs à implémenter</p>
  </div>
);

const StudentsManagement = () => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Gestion des élèves</h3>
    <p>Interface de gestion des élèves à implémenter</p>
  </div>
);

const ClassesManagement = () => {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [selectedClasse, setSelectedClasse] = useState<Classe | null>(null);
  const [professeurPrincipal, setProfesseurPrincipal] = useState<Professeur | null>(null);
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("classe")
        .select("id, nom, code_classe, date_creation")
        .order("nom", { ascending: true });

      if (error) {
        console.error("Erreur chargement classes :", error.message);
      } else if (data) {
        const formatted = data.map((c) => ({
          id: c.id,
          nom: c.nom,
          codeClasse: c.code_classe,
          dateCreation: c.date_creation,
        }));
        setClasses(formatted);
      }
      setLoading(false);
    };
    fetchClasses();
  }, []);

  const handleVoirClasse = async (classeId: number) => {
    setLoading(true);
    const { data: classeData, error: classeError } = await supabase
      .from("classe")
      .select("id, nom, code_classe, date_creation")
      .eq("id", classeId)
      .single();

    if (classeError || !classeData) {
      console.error("Erreur chargement classe :", classeError?.message);
      setSelectedClasse(null);
      setProfesseurPrincipal(null);
      setEleves([]);
      setLoading(false);
      return;
    }

    setSelectedClasse({
      id: classeData.id,
      nom: classeData.nom,
      codeClasse: classeData.code_classe,
      dateCreation: classeData.date_creation,
    });

    await Promise.all([
      fetchProfesseurPrincipal(classeData.id),
      fetchEleves(classeData.id)
    ]);

    setLoading(false);
  };

  const fetchProfesseurPrincipal = async (classeId: number) => {
    const { data: cpData, error: cpError } = await supabase
      .from("classe_professeur")
      .select("professeur_id")
      .eq("classe_id", classeId)
      .eq("is_principal", true)
      .single();

    if (cpError || !cpData) {
      console.error("Professeur principal non trouvé :", cpError?.message);
      setProfesseurPrincipal(null);
      return;
    }

    const profId = cpData.professeur_id;
    const { data: profData, error: profError } = await supabase
      .from("utilisateur")
      .select("id, nom, prenom, role, created_at")
      .eq("id", profId)
      .single();

    if (profError || !profData) {
      console.error("Professeur principal non trouvé (utilisateur) :", profError?.message);
      setProfesseurPrincipal(null);
    } else {
      setProfesseurPrincipal(profData);
    }
  };
  interface Eleve {
  id: string;
  nom: string;
  prenom: string;
  role: string;
  created_at: string;
}

interface Eleve {
  id: string;
  nom: string;
  prenom: string;
  role: string;
  created_at: string;
}

const fetchEleves = async (classeId: number) => {
  // Solution 1: Utilisation de la syntaxe recommandée par Supabase v2
  const { data: elevesData, error: elevesError } = await supabase
    .from("classe_eleve")
    .select(`
      eleve_id:utilisateur (
        id,
        nom,
        prenom,
        role,
        created_at
      )
    `)
    .eq("classe_id", classeId)
    .order("prenom", { foreignTable: "eleve_id", ascending: true });

  if (elevesError) {
    console.error("Erreur récupération élèves :", elevesError.message);
    setEleves([]);
    return;
  }

  // Type assertion et vérification de sécurité
  const eleves = (elevesData || [])
    .map((item: any) => item.eleve_id)
    .filter((eleve): eleve is Eleve => Boolean(eleve));

  setEleves(eleves);
};

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-3">
            <FaSpinner className="animate-spin text-green-600 text-xl" />
            <p className="text-gray-800">Chargement en cours...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des classes */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="bg-green-700 p-4 rounded-t-xl">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <FaSchool className="mr-2" />
              Liste des Classes
            </h2>
          </div>
          <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {classes.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                Aucune classe disponible
              </div>
            ) : (
              classes.map((classe) => (
                <div
                  key={classe.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedClasse?.id === classe.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  onClick={() => handleVoirClasse(classe.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{classe.nom}</p>
                      <p className="text-sm text-gray-500">Code: {classe.codeClasse}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {new Date(classe.dateCreation).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Détails de la classe */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          {selectedClasse ? (
            <>
              <div className="bg-green-700 p-4 rounded-t-xl">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <FaSchool className="mr-2" />
                  Détails de la Classe
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{selectedClasse.nom}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedClasse.codeClasse}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Date de création</p>
                      <p className="font-medium">
                        {new Date(selectedClasse.dateCreation).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Nombre d'élèves</p>
                      <p className="font-medium">{eleves.length}</p>
                    </div>
                  </div>
                </div>

                {/* Professeur principal */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                    <FaChalkboardTeacher className="mr-2 text-green-600" />
                    Professeur Principal
                  </h3>
                  {professeurPrincipal ? (
                    <div className="flex items-center space-x-4 bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                          {professeurPrincipal.prenom.charAt(0)}{professeurPrincipal.nom.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {professeurPrincipal.prenom} {professeurPrincipal.nom}
                        </p>
                        <p className="text-sm text-gray-500">Professeur principal</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                      Aucun professeur principal assigné à cette classe
                    </div>
                  )}
                </div>

                {/* Liste des élèves */}
                <div>
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <FaUserGraduate className="mr-2 text-green-600" />
                      Liste des Élèves
                    </h3>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {eleves.length} élève{eleves.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {eleves.length > 0 ? (
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nom
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Prénom
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date d'inscription
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {eleves.map((eleve) => (
                            <tr key={eleve.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {eleve.nom}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {eleve.prenom}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(eleve.created_at).toLocaleDateString('fr-FR')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 text-gray-600 p-8 rounded-lg text-center">
                      Aucun élève inscrit dans cette classe
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaSchool className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une classe</h3>
              <p className="text-gray-500">Choisissez une classe dans la liste pour afficher ses détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlatformSettings = () => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Paramètres de la plateforme</h3>
    <p>Interface des paramètres à implémenter</p>
  </div>
);

export default AdminDashboard;