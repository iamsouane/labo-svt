// src/components/threejs/ComparaisonCoeurs.tsx
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type CoeurType = "humain" | "poisson" | "oiseau";

const CoeurHumain = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="red" />
  </mesh>
);

const CoeurPoisson = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[1.5, 1, 0.5]} />
    <meshStandardMaterial color="blue" />
  </mesh>
);

const CoeurOiseau = () => (
  <mesh position={[0, 0, 0]}>
    <coneGeometry args={[1, 2, 32]} />
    <meshStandardMaterial color="orange" />
  </mesh>
);

const Coeur = ({ type }: { type: CoeurType }) => {
  switch (type) {
    case "humain":
      return <CoeurHumain />;
    case "poisson":
      return <CoeurPoisson />;
    case "oiseau":
      return <CoeurOiseau />;
    default:
      return null;
  }
};

const ComparaisonCoeurs = () => {
  const [mode, setMode] = useState<"single" | "multiple">("single");
  const [selected, setSelected] = useState<CoeurType>("humain");

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <button
          className={`px-3 py-1 rounded ${mode === "single" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("single")}
        >
          Afficher un cœur
        </button>
        <button
          className={`px-3 py-1 rounded ${mode === "multiple" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("multiple")}
        >
          Afficher tous
        </button>
      </div>

      {mode === "single" && (
        <div className="mb-4 flex gap-4">
          {(["humain", "poisson", "oiseau"] as CoeurType[]).map((c) => (
            <button
              key={c}
              className={`px-3 py-1 rounded ${selected === c ? "bg-green-600 text-white" : "bg-gray-300"}`}
              onClick={() => setSelected(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div style={{ width: "100%", height: 400 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls />
          {mode === "single" ? (
            <Coeur type={selected} />
          ) : (
            <>
              <group position={[-3, 0, 0]}>
                <CoeurHumain />
              </group>
              <group position={[0, 0, 0]}>
                <CoeurPoisson />
              </group>
              <group position={[3, 0, 0]}>
                <CoeurOiseau />
              </group>
            </>
          )}
        </Canvas>
      </div>
    </div>
  );
};

export default ComparaisonCoeurs;