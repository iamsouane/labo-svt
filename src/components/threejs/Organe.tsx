// src/components/threejs/Organe.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const OrganeModel = (props: any) => {
  return (
    <mesh {...props}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  );
};

const Organe = () => {
  return (
    <div className="w-full h-[500px] rounded border overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <OrganeModel position={[0, 0, 0]} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default Organe;