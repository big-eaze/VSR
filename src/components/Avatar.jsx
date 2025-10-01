import React from "react";
import { Bounds, Center, useGLTF } from "@react-three/drei";

export default function Avatar() {
  const { scene } = useGLTF(
    "https://models.readyplayer.me/68dd17c76c40ed329a4f822f.glb",
    true // <- ensures all textures/materials are parsed
  );

  return (
    <Center >
      <primitive object={scene} scale={1.0} />
    </Center>
  );
}

useGLTF.preload("https://models.readyplayer.me/68dd17c76c40ed329a4f822f.glb");
