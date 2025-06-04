import { useEffect, useRef } from "react";
import * as THREE from "three";

const Cellule = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    camera.position.z = 2;

    const geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    mountRef.current?.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Cellule;