import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  ScrollControls,
  useScroll,
  Stars,
  Float,
  Text3D,
  Scroll,
  Loader,
} from "@react-three/drei";

import { val } from "@theatre/core";
import {
  editable as e,
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";

import { Cockpit } from "./Cockpit";
import { Rocket } from "./Rocket";
import { Suspense, useEffect, useState } from "react";
import ScrollSections from "./sections/ScrollSection";

const Experience = (props) => {
  const [startScroll, setStartScroll] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      props.sheet.project.ready.then(() => {
        props.sheet.sequence
          .play({ iterationCount: 1, range: [0, 5.4] })
          .then((x) => {
            if (x) {
              setStartScroll(true);
            }
          });
      });
    }, 1000);
  }, []);

  return (
    <div className="container">
      <Canvas flat gl={{ preserveDrawingBuffer: true }}>
        <ScrollControls enabled={startScroll} pages={6} damping={0.61}>
          <SheetProvider sheet={props.sheet}>
            <Scene />
            <Scroll html>
              <ScrollSections />
            </Scroll>
          </SheetProvider>
        </ScrollControls>
      </Canvas>
      <Loader />
    </div>
  );
};

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  useFrame(() => {
    if (sheet.sequence.position >= 5.4) {
      const sequenceLength = val(sheet.sequence.pointer.length) - 5.4001;
      const position = scroll.offset * sequenceLength;
      sheet.sequence.position = position >= 0 ? position + 5.4001 : 5.4001;
    }
  });

  return (
    <>
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={(0, 5, 20)}
        fov={30}
        near={0.1}
        far={800}
      />
      <color attach="background" args={["#000"]} />

      <Stars
        radius={300}
        depth={300}
        fade={true}
        speed={1}
        factor={10}
        count={5000}
      />
      <Center>
        <Float>
          <e.group theatreKey="Text-Greeting" editableType="group">
            <Text3D
              font={"/fonts/Poppins Black_Regular.json"}
              size={1.2}
              height={0.1}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
              position={[-1, 5, 0]}
            >
              <meshBasicMaterial color={"#fc8314"} />
              Hi,
            </Text3D>
            <Text3D
              font={"/fonts/Poppins Black_Regular.json"}
              size={1.2}
              height={0.1}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
              position={[1.5, 5, 0]}
            >
              <meshBasicMaterial color={"#fff"} />
              I'm Umar
            </Text3D>
          </e.group>

          <e.group theatreKey="Text-Profession" editableType="group">
            <Text3D
              font={"/fonts/Poppins Black_Regular.json"}
              size={0.9}
              height={0.05}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
              position={[-1, 4, 0]}
            >
              Software Engineer
            </Text3D>
          </e.group>
        </Float>
        <Suspense fallback={null}>
          <Rocket />
          <Cockpit />
        </Suspense>
      </Center>
    </>
  );
}

export default Experience;
