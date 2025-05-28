import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Apropos from "./pages/Apropos";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import Inscription from "./pages/auth/Inscription";
import Connexion from "./pages/auth/Connexion";
import AdminDashboard from "./pages/admin/dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { ReactNode } from "react";

// Placeholders pour les pages à venir
const Simulations = () => <div className="p-6">Page Simulations (à venir)</div>;
const Visualisation = () => <div className="p-6">Page Visualisation (à venir)</div>;

const AdminLayout = () => {
  return <AdminDashboard />;
};

interface MainLayoutProps {
  children?: ReactNode;
  noNavbarFooter?: boolean; // Nouvelle prop pour exclure navbar/footer
}

const MainLayout = ({ children, noNavbarFooter = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!noNavbarFooter && <Navbar />}
      <main className="flex-grow pt-20 pb-10">
        {children || <Outlet />}
      </main>
      {!noNavbarFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques avec navbar et footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/visualisation" element={<Visualisation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/conditions" element={<ConditionsUtilisation />} />
        </Route>

        {/* Routes sans navbar et footer */}
        <Route element={<MainLayout noNavbarFooter={true} />}>
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
        </Route>

        {/* Route admin sans navbar */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
};

export default App;