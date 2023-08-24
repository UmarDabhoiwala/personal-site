import { useThree } from "@react-three/fiber";

import { Sparkles, useGLTF, useTexture } from "@react-three/drei";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import * as THREE from "three";

import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { useEffect, useRef, useState } from "react";

export const Rocket = () => {
  const sheet = useCurrentSheet();

  const rocketRef = useRef();
  const [opacity, setOpacity] = useState(1);
  const [visible, setVisible] = useState(true);

  const rocketVisible = sheet.object("RocketVisible", {
    visible: false,
  });

  const rocketOpacity = sheet.object("RocketOpacity", {
    opacity: 0,
  });

  const x = useThree();
  const rgbeLoader = new RGBELoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setPath("/draco/");
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  const rocketBody = useLoader(
    GLTFLoader,
    "/models/rocket-body.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const engineFire = useLoader(
    GLTFLoader,
    "/models/engine-fire.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const sateliteBlinker = useLoader(
    GLTFLoader,
    "/models/satelite-blinker.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const engineFireTexture = useTexture("/models/jetfff-emmit.jpg");
  engineFire.flipY = false;

  rgbeLoader.load("/models/light4.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    x.scene.environment = texture;
    x.gl.outputColorSpace = THREE.SRGBColorSpace;
    x.gl.toneMapping = THREE.ACESFilmicToneMapping;
    x.gl.toneMappingExposure = 10.41;
  });

  useEffect(() => {
    rocketOpacity.onValuesChange((newVal) => {
      if (rocketRef.current && rocketRef.current.type === "Group") {
        rocketRef.current.traverse((child) => {
          if (child.type === "Mesh" || child.type === "Point") {
            child.material.transparent = true;
            child.material.opacity = newVal.opacity;
          }
        });
      }
    });
    rocketVisible.onValuesChange((newVal) => {
      setVisible(newVal.visible);
    });
  });

  return (
    <>
      <e.group theatreKey="rocket" editableType="groupe" visible={visible}>
        <primitive object={rocketBody.scene} ref={rocketRef}>
          <Sparkles
            count={20}
            size={15}
            scale={0.7}
            color={"#8899ff"}
            transparent
            opacity={opacity}
          />
        </primitive>
        <mesh
          geometry={sateliteBlinker.nodes["satelite-blinker"].geometry}
          position={sateliteBlinker.nodes["satelite-blinker"].position}
        >
          <meshBasicMaterial color={"red"} transparent opacity={opacity} />
        </mesh>
        <mesh
          geometry={engineFire.nodes["engine-fire"].geometry}
          position={engineFire.nodes["engine-fire"].position}
        >
          <meshBasicMaterial map={engineFireTexture} />
        </mesh>
      </e.group>
    </>
  );
};
