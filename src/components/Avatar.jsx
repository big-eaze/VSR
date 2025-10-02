import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { MenuContext } from "../utils/MenuContext";

export default function Avatar({ showCap }) {
  const { scene, materials } = useGLTF(
    "/models/avatar.glb"
  );
  const capGLTF = useGLTF("/models/cap.glb");
  const avatarRef = useRef();
  const { selectedCloth } = React.useContext(MenuContext);

  // 🟢 Clone avatar materials so they don’t reset
  const customMaterials = useMemo(() => {
    const clones = {};
    for (const key in materials) {
      clones[key] = materials[key].clone();
    }
    return clones;
  }, [materials]);

  // 🟢 Apply textures when selectedCloth changes
  useEffect(() => {
    // Clothing textures
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material.name === "Wolf3D_Outfit_Top" && selectedCloth.shirt) {
          const tex = new THREE.TextureLoader().load(selectedCloth.shirt);
          tex.flipY = false;
          child.material.map = tex;
          child.material.needsUpdate = true;
        }
        if (child.material.name === "Wolf3D_Outfit_Bottom" && selectedCloth.trouser) {
          const tex = new THREE.TextureLoader().load(selectedCloth.trouser);
          tex.flipY = false;
          child.material.map = tex;
          child.material.needsUpdate = true;
        }
        if (child.material.name === "Wolf3D_Outfit_Footwear" && selectedCloth.shoe) {
          const tex = new THREE.TextureLoader().load(selectedCloth.shoe);
          tex.flipY = false;
          child.material.map = tex;
          child.material.needsUpdate = true;
        }
      }
    });

    // 🧢 Attach + texture cap
    if (showCap && capGLTF.scene) {
      const headBone = scene.getObjectByName("Head");
      if (headBone && !headBone.getObjectByName("CapMesh")) {
        capGLTF.scene.name = "CapMesh";
        headBone.add(capGLTF.scene);
        capGLTF.scene.position.set(0, 0, 0.01); // Y = height, Z = forward/backward
        capGLTF.scene.rotation.set(0, -Math.PI / 2, 0); // rotate 180 if it’s facing backward
        capGLTF.scene.scale.set(0.7, 0.9, 0.9);// shrink until it fits nicely
      }

      // update cap texture whenever accessory changes
      if (selectedCloth.accessory) {
        capGLTF.scene.traverse((child) => {
          if (child.isMesh) {
            const tex = new THREE.TextureLoader().load(selectedCloth.accessory);
            tex.flipY = false;
            child.material.map = tex;
            child.material.needsUpdate = true;
          }
        });
      }
    }
  }, [scene, selectedCloth, showCap, capGLTF.scene]);

  // 🟢 Assign cloned avatar materials once
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && customMaterials[child.material.name]) {
        child.material = customMaterials[child.material.name];
      }
    });
  }, [scene, customMaterials]);

  return (
    <Center>
      <primitive ref={avatarRef} object={scene} scale={1.0} />
    </Center>
  );
}

useGLTF.preload("/models/avatar.glb");
useGLTF.preload("/models/cap.glb");
