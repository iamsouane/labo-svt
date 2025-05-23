import React from "react";
import Header from "../components/Header";
import SectionFeatures from "../components/SectionFeatures";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <SectionFeatures />
    </main>
  );
};

export default Home;