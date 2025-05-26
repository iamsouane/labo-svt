import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Apropos from "./pages/Apropos";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";

// Placeholders pour les pages à venir
const Simulations = () => <div className="p-6">Page Simulations (à venir)</div>;
const Visualisation = () => <div className="p-6">Page Visualisation (à venir)</div>;

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apropos" element={<Apropos />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/visualisation" element={<Visualisation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/conditions" element={<ConditionsUtilisation />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/connexion" element={<Connexion />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;