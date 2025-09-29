// src/components/TryOn3D.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture, Environment } from "@react-three/drei";
import { Sparkles } from "lucide-react";
import Header from "../components/Header";

function Avatar() {
  const { scene } = useGLTF("/models/avatar.glb");
  return <primitive object={scene} scale={1.5} position={[0, -1.5, 0]} />;
}

function Clothing({ textureUrl }) {
  const texture = useTexture(textureUrl);
  const { scene } = useGLTF("/models/tshirt1.glb");

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = texture;
      child.material.needsUpdate = true;
    }
  });

  return <primitive object={scene} scale={1.2} position={[0, -1.2, 0]} />;
}

export default function TryOn3D() {
  const [selectedCloth, setSelectedCloth] = useState("/wardrobe/t-shirt1.jpg");

  const wardrobe = [
    "/wardrobe/t-shirt1.jpg",
    "/wardrobe/t-shirt2.jpg",
    "/wardrobe/long-sleeve1.jpg",
    "/wardrobe/long-sleeve2.jpg",
  ];

  return (
    <>
      <Header />
      <div className="relative w-full min-h-screen pt-24 bg-gradient-to-b from-gray-900 via-[#A0552D] to-gray-950 text-white overflow-hidden">
        {/* Heading Overlay */}
        <div className="text-center z-20 relative">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Virtual <span className="text-[#f04e23]">Try-On</span>
          </h1>
          <p className="mt-2 text-gray-300">
            Mix, match & explore your wardrobe in 3D
          </p>
        </div>

        {/* 3D Scene */}
        <div className="w-full h-[80vh] mt-6 pb-28">
          <Canvas camera={{ position: [0, 1.6, 3], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 5, 2]} intensity={1.2} />
            <Environment preset="studio" />
            <Avatar />
            <Clothing textureUrl={selectedCloth} />
            <OrbitControls enablePan={false} minDistance={2} maxDistance={5} />
          </Canvas>
        </div>

        {/* Frosted Wardrobe Selector */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 flex gap-4 overflow-x-auto scrollbar-hide z-20">
          {wardrobe.map((url, i) => (
            <button
              key={i}
              onClick={() => setSelectedCloth(url)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition transform ${selectedCloth === url
                  ? "border-[#f04e23] scale-105 shadow-lg"
                  : "border-gray-700 hover:border-[#f04e23]"
                }`}
            >
              <img
                src={url}
                className="w-full h-full object-cover"
                alt="cloth option"
              />
            </button>
          ))}
        </div>

        {/* Floating CTA */}
        <button className="absolute top-28 right-6 bg-[#f04e23] hover:bg-[#d13d18] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition z-20">
          <Sparkles className="w-4 h-4" />
          Save Look
        </button>
      </div>
    </>

  );
}

useGLTF.preload("/models/avatar.glb");
useGLTF.preload("/models/tshirt1.glb");
