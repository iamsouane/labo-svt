import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Apropos from "./pages/Apropos";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import Inscription from "./pages/auth/Inscription";
import Connexion from "./pages/auth/Connexion";

import AdminDashboard from "./pages/admin/dashboard";
import CreerClasse from "./pages/admin/creerClasse";
import ClasseDetail from "./pages/admin/classeDetail";

import ProfesseurDashboard from "./pages/professeur/dashboard";
import EleveDetail from "./pages/professeur/eleveDetail";

import EleveDashboard from "./pages/eleve/dashboard"; // ✅ Nouvelle page élève

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import type { ReactNode } from "react";

// Pages à venir
const Simulations = () => <div className="p-6">Page Simulations (à venir)</div>;
const Visualisation = () => <div className="p-6">Page Visualisation (à venir)</div>;

// Layout principal avec Navbar/Footer
interface MainLayoutProps {
  children?: ReactNode;
  noNavbarFooter?: boolean;
}

const MainLayout = ({ children, noNavbarFooter = false }: MainLayoutProps) => (
  <div className="flex flex-col min-h-screen">
    {!noNavbarFooter && <Navbar />}
    <main className="flex-grow pt-20 pb-10">
      {children || <Outlet />}
    </main>
    {!noNavbarFooter && <Footer />}
  </div>
);

// Layouts spécifiques
const AdminLayout = () => <Outlet />;
const ProfesseurLayout = () => <Outlet />;
const EleveLayout = () => <Outlet />; // ✅ Layout pour les élèves

const App = () => {
  return (
    <Router>
      <Routes>
        {/* --- Routes publiques avec Navbar/Footer --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/visualisation" element={<Visualisation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/conditions" element={<ConditionsUtilisation />} />
        </Route>

        {/* --- Routes auth sans Navbar/Footer --- */}
        <Route element={<MainLayout noNavbarFooter />}>
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
        </Route>

        {/* --- Routes Admin --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="creerClasse" element={<CreerClasse />} />
          <Route path="classeDetail" element={<ClasseDetail />} />
        </Route>

        {/* --- Routes Professeur --- */}
        <Route path="/professeur" element={<ProfesseurLayout />}>
          <Route index element={<ProfesseurDashboard />} />
          <Route path="dashboard" element={<ProfesseurDashboard />} />
          <Route path="eleveDetail/:eleveId" element={<EleveDetail />} />
        </Route>

        {/* --- Routes Élève --- */}
        <Route path="/eleve" element={<EleveLayout />}>
          <Route index element={<EleveDashboard />} />
          <Route path="dashboard" element={<EleveDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;