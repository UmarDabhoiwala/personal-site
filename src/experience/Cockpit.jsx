import { useLoader } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";

import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useEffect, useRef, useState } from "react";
import { useCurrentSheet, editable as e } from "@theatre/r3f";

import RightScreen from "./sections/screen/RightScreen";
import LefttScreen from "./sections/screen/LeftScreen";
import Media from "react-media";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";

export const Cockpit = () => {
  const sheet = useCurrentSheet();

  const cockpitRef = useRef();
  const [opacity, setOpacity] = useState(1);
  const [visible, setVisible] = useState(true);
  const [showCockpitHtml, setShowCockpitHtml] = useState(false);

  const cockpitVisible = sheet.object("CockpitVisible", {
    visible: false,
  });

  const cockpitOpacity = sheet.object("CockpitOpacity", {
    opacity: 0,
  });

  const cockpitHtml = sheet.object("CockpitHTML", {
    showCockpitHtml: false,
  });

  const rgbeLoader = new RGBELoader();

  const bakedTexture = useTexture("/models/baked-final-11.jpg");
  const bakedTexture2 = useTexture("/models/baked-final-22.jpg");

  const bakedMaterial = new THREE.MeshBasicMaterial({
    map: bakedTexture,
    color: "#dfc",
    transparent: true,
    opacity: opacity,
  });
  const bakedMaterial2 = new THREE.MeshBasicMaterial({
    map: bakedTexture2,
    color: "#eff",
    transparent: true,
    opacity: opacity,
  });
  bakedMaterial.map.flipY = false;
  bakedMaterial2.map.flipY = false;

  const cockpitG1 = useLoader(
    GLTFLoader,
    "/models/cockpit-group-1.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const cockpitG2 = useLoader(
    GLTFLoader,
    "/models/cockpit-group-2.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const screenLeft = useLoader(
    GLTFLoader,
    "/models/screen-left.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const screenRight = useLoader(
    GLTFLoader,
    "/models/screen-right.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const buttonLeft = useLoader(
    GLTFLoader,
    "/models/button-left.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const buttonRight = useLoader(
    GLTFLoader,
    "/models/button-right.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const buttonChair = useLoader(
    GLTFLoader,
    "/models/button-chair.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const envMap = rgbeLoader.load("/models/light4.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
  });

  const leftButtonRef = useRef();
  const rightButtonRef = useRef();
  const chairButtonRef = useRef();
  const emailLinkRef = useRef();
  const resumeLinkRef = useRef();
  const githubLinkRef = useRef();

  useEffect(() => {
    if (cockpitRef.current) {
      cockpitOpacity.onValuesChange((newVal) => {
        cockpitRef.current.traverse((child) => {
          if (child.type === "Mesh" || child.type === "Point") {
            child.material.opacity = newVal.opacity;
          }
        });
      });

      cockpitVisible.onValuesChange((newVal) => {
        setVisible(newVal.visible);
      });

      cockpitHtml.onValuesChange((newVal) => {
        setShowCockpitHtml(newVal.showCockpitHtml);
      });
    }
    cockpitG1.scene.traverse((child) => {
      if (child.name === "wall-light-purple") {
        child.material = new THREE.MeshBasicMaterial({
          color: "#ffddff",
          transparent: true,
          opacity: opacity,
        });
      } else if (child.name === "wall-light-orange") {
        child.material = new THREE.MeshBasicMaterial({
          color: "#ffdddd",
          transparent: true,
          opacity: opacity,
        });
      } else if (child.name === "wall-light-blue") {
        child.material = new THREE.MeshBasicMaterial({
          color: "#ddddff",
          transparent: true,
          opacity: opacity,
        });
      } else {
        child.material = bakedMaterial;
      }
    });
    cockpitG2.scene.traverse((child) => {
      if (child.name === "desk-light-orange") {
        child.material = new THREE.MeshBasicMaterial({
          color: "#ffdddd",
          transparent: true,
          opacity: opacity,
        });
      } else if (child.name === "desk-light-blue") {
        child.material = new THREE.MeshBasicMaterial({
          color: "#ddddff",
          transparent: true,
          opacity: opacity,
        });
      } else if (child.name === "chairlight") {
        child.material = new THREE.MeshBasicMaterial({
          color: "#ffddff",
          transparent: true,
          opacity: opacity,
        });
      } else if (child.name === "pannel-button-blue") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#4fadff",
          transmission: 1,
          roughness: 0,
          metalness: 1.3,
          envMap: envMap,
          ior: 1,
          transparent: true,
          opacity: opacity,
        });
      } else if (child.name === "pannel-button-orange") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#ffd085",
          transmission: 1,
          roughness: 0,
          metalness: 1.3,
          envMap: envMap,
          ior: 1,
          transparent: true,
          opacity: opacity,
        });
      } else if (child.name === "pannel-button-purple") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#ff94ff",
          transmission: 1,
          roughness: 0,
          metalness: 1.3,
          envMap: envMap,
          ior: 1,
          transparent: true,
          opacity: opacity,
        });
      } else {
        child.material = bakedMaterial2;
      }
    });
  }, []);

  const mouseInterButton = (buttonRef) => {
    buttonRef.current.material.color.set(1.8, 1.6, 6);
  };

  const mouseLeaveButton = (buttonRef) => {
    buttonRef.current.material.color.set("#4fadff");
  };

  const linkClicked = (link) => {
    console.dir(link.current);
    link.current.click();
  };

  const Links = {
    emailLink: "mailto:Dabhoiwala.umar1@gmail.com",
    githubLink: "https://github.com/UmarDabhoiwala",
    resumeLink: "/UmarResume.pdf",
  };

  return (
    <>
      <e.group
        theatreKey="cockpitGroupe"
        editableType="groupe"
        scale={0.1}
        ref={cockpitRef}
        visible={visible}
      >
        <EffectComposer>
          <SelectiveBloom
            lights={envMap}
            selection={[leftButtonRef, rightButtonRef, chairButtonRef]}
            selectionLayer={10}
            intensity={0.2}
            luminanceThreshold={1.3}
            luminanceSmoothing={0.025}
          />
        </EffectComposer>
        <primitive object={cockpitG1.scene} />
        <primitive object={cockpitG2.scene} />
        <mesh
          geometry={screenLeft.nodes["pannel-screen-left"].geometry}
          position={screenLeft.nodes["pannel-screen-left"].position}
        >
          <meshBasicMaterial color={"black"} transparent opacity={opacity} />
          {showCockpitHtml && (
            <Media
              queries={{
                small: "(max-width: 599px)",
                medium: "(min-width: 600px) and (max-width: 1199px)",
                large: "(min-width: 1200px)",
              }}
            >
              {(matches) => (
                <>
                  {matches.small && (
                    <Html
                      theatreKey={RightScreen}
                      transform
                      wrapperClass="leftScreen"
                      distanceFactor={0.156}
                      position={[-0.1353, -0.099, -0.48]}
                      rotation-y={0.2}
                      rotation-x={0.12}
                      rotation-z={-0.055}
                    >
                      <div>
                        <LefttScreen />
                      </div>
                    </Html>
                  )}
                  {matches.medium && (
                    <Html
                      transform
                      wrapperClass="rightScreen"
                      distanceFactor={0.152}
                      position={[-0.157, -0.14, -0.58]}
                      rotation-y={0.1001}
                      rotation-x={0.2}
                      rotation-z={-0.05}
                    >
                      <div>
                        <LefttScreen />
                      </div>
                    </Html>
                  )}
                  {matches.large && (
                    <Html
                      transform
                      wrapperClass="leftScreen"
                      distanceFactor={0.15}
                      position={[-0.154, -0.079, -0.48]}
                      rotation-y={0.2}
                      rotation-x={0.12}
                      rotation-z={-0.049}
                    >
                      <div>
                        <LefttScreen />
                      </div>
                    </Html>
                  )}
                </>
              )}
            </Media>
          )}
        </mesh>
        <mesh
          geometry={screenRight.nodes["pannel-screen-right"].geometry}
          position={screenRight.nodes["pannel-screen-right"].position}
        >
          <meshBasicMaterial color={"black"} transparent opacity={opacity} />
          {showCockpitHtml && (
            <Media
              queries={{
                small: "(max-width: 599px)",
                medium: "(min-width: 600px) and (max-width: 1199px)",
                large: "(min-width: 1200px)",
              }}
            >
              {(matches) => (
                <>
                  {matches.small && (
                    <Html
                      transform
                      wrapperClass="rightScreen"
                      distanceFactor={0.156}
                      position={[-0.106, -0.1, -0.48]}
                      rotation-y={0.1}
                      rotation-x={0.12}
                      rotation-z={-0.018}
                    >
                      <div>
                        <RightScreen />
                      </div>
                    </Html>
                  )}
                  {matches.medium && (
                    <Html
                      transform
                      wrapperClass="rightScreen"
                      distanceFactor={0.152}
                      position={[-0.137, -0.14, -0.58]}
                      rotation-y={0.1001}
                      rotation-x={0.2}
                      rotation-z={-0.04}
                    >
                      <div>
                        <RightScreen />
                      </div>
                    </Html>
                  )}

                  {matches.large && (
                    <Html
                      transform
                      wrapperClass="rightScreen"
                      distanceFactor={0.15}
                      position={[-0.094, -0.079, -0.48]}
                      rotation-y={0.1}
                      rotation-x={0.12}
                      rotation-z={-0.018}
                    >
                      <div>
                        <RightScreen />
                      </div>
                    </Html>
                  )}
                </>
              )}
            </Media>
          )}
        </mesh>

        <mesh
          geometry={buttonLeft.nodes["pannel-button-left"].geometry}
          position={buttonLeft.nodes["pannel-button-left"].position}
          ref={leftButtonRef}
          onPointerEnter={() => {
            mouseInterButton(leftButtonRef);
          }}
          onPointerLeave={() => {
            mouseLeaveButton(leftButtonRef);
          }}
          onClick={() => {
            linkClicked(emailLinkRef);
          }}
        >
          <meshPhysicalMaterial
            color={"#4fadff"}
            transmission={1}
            roughness={0}
            metalness={1.3}
            envMap={envMap}
            ior={1}
            transparent
            opacity={opacity}
            toneMapped={false}
          />
          {showCockpitHtml && (
            <Media
              queries={{
                small: "(max-width: 599px)",
                medium: "(min-width: 600px) and (max-width: 1199px)",
                large: "(min-width: 1200px)",
              }}
            >
              {(matches) => (
                <>
                  {matches.small && (
                    <Html
                      transform
                      wrapperClass="leftButton"
                      distanceFactor={1.42}
                      position={[-0.15, 0.089, -0.48]}
                      rotation-y={1.131}
                      rotation-x={0}
                      rotation-z={-0.1}
                    >
                      <a
                        href={Links.emailLink}
                        className="button gitHub"
                        ref={emailLinkRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        E-Mail
                        </a>
                    </Html>
                  )}
                  {matches.medium && (
                    <Html
                      transform
                      wrapperClass="leftButton"
                      distanceFactor={1.12}
                      position={[-0.15, 0.0149, -0.48]}
                      rotation-y={0.131}
                      rotation-x={0}
                      rotation-z={-0.038}
                    >
                      <a
                        href={Links.emailLink}
                        className="button gitHub"
                        ref={emailLinkRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        E-Mail
                    </a>
                    </Html>
                  )}
                  {matches.large && (
                    <Html
                      transform
                      wrapperClass="leftButton"
                      distanceFactor={1}
                    //   position={[-0.36, 0.0289, -0.78]}
                      position={[-0.15, 0.0149, -0.38]}
                      rotation-y={0.831}
                      rotation-x={0}
                      rotation-z={-0.08}
                    >
                      <a
                        href={Links.emailLink}
                        className="button gitHub"
                        ref={emailLinkRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        E-Mail
                        </a>
                    </Html>
                  )}
                </>
              )}
            </Media>
          )}
        </mesh>

        <mesh
          geometry={buttonRight.nodes["pannel-button-right"].geometry}
          position={buttonRight.nodes["pannel-button-right"].position}
          ref={rightButtonRef}
          onPointerEnter={() => {
            mouseInterButton(rightButtonRef);
          }}
          onPointerLeave={() => {
            mouseLeaveButton(rightButtonRef);
          }}
          onClick={() => {
            linkClicked(resumeLinkRef);
          }}
        >
          <meshPhysicalMaterial
            color={"#4fadff"}
            transmission={1}
            roughness={0}
            metalness={1.3}
            envMap={envMap}
            ior={1}
            transparent
            opacity={opacity}
            toneMapped={false}
          />
          {showCockpitHtml && (
            <Media
              queries={{
                small: "(max-width: 599px)",
                medium: "(min-width: 600px) and (max-width: 1199px)",
                large: "(min-width: 1200px)",
              }}
            >
              {(matches) => (
                <>
                  {matches.small && (
                    <Html
                      transform
                      wrapperClass="leftButton"
                      distanceFactor={1.6}
                      position={[-0.135, -0.2, -1.68]}
                      rotation-y={0.51}
                      rotation-x={0}
                      rotation-z={-0.038}
                    >
                      <a
                        href={Links.resumeLink}
                        className="button gitHub"
                        ref={resumeLinkRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Resume
                        </a>

                    </Html>
                  )}
                  {matches.medium && (
                    <Html
                      transform
                      wrapperClass="leftButton"
                      distanceFactor={1.36}
                      position={[-0.05, -0.19, -1.48]}
                      rotation-y={0.51}
                      rotation-x={0}
                      rotation-z={-0.038}
                    >
                      <a
                        href={Links.resumeLink}
                        className="button gitHub"
                        ref={resumeLinkRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Resume
                        </a>
                    </Html>
                  )}
                  {matches.large && (
                    <Html
                      transform
                      wrapperClass="leftButton"
                      distanceFactor={1.5}
                    //   position={[-0.15, -0.19, -2]}
                      position={[-0.135, -0.2, -1.68]}
                      rotation-y={0.51}
                      rotation-x={0}
                      rotation-z={-0.038}
                    >
                      <a
                        href={Links.resumeLink}
                        className="button gitHub"
                        ref={resumeLinkRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Resume
                        </a>
                    </Html>
                  )}
                </>
              )}
            </Media>
          )}
        </mesh>

        <mesh
          geometry={buttonChair.nodes["chairbutton"].geometry}
          position={buttonChair.nodes["chairbutton"].position}
          ref={chairButtonRef}
          onPointerEnter={() => {
            mouseInterButton(chairButtonRef);
          }}
          onPointerLeave={() => {
            mouseLeaveButton(chairButtonRef);
          }}
          onClick={() => {
            linkClicked(githubLinkRef);
          }}
        >
          <meshPhysicalMaterial
            color={"#4fadff"}
            transmission={1}
            roughness={0}
            metalness={1.3}
            envMap={envMap}
            ior={1}
            transparent
            opacity={opacity}
          />
          {showCockpitHtml && (
            <Media
              queries={{
                small: "(max-width: 599px)",
                medium: "(min-width: 600px) and (max-width: 1199px)",
                large: "(min-width: 1200px)",
              }}
            >
              {(matches) => (
                <>
                  {matches.small && (
                    <Html
                      transform
                      wrapperClass="leftButton"
                      distanceFactor={1.2}
                      position={[-0.5, -0.19, -0.85]}
                      rotation-y={-0.0351}
                      rotation-x={0}
                      rotation-z={0.038}
                    >
                      <a
                        href={Links.githubLink}
                        className="button gitHub"
                        ref={githubLinkRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        GitHub
                        </a>
                    </Html>
                  )}
                  {matches.medium && (
                    <Html
                      transform
                      wrapperClass="leftButton"
                      distanceFactor={1.3}
                      position={[-0.5, -0.19, -0.85]}
                      rotation-y={-0.0351}
                      rotation-x={0}
                      rotation-z={0.038}
                    >
                      <a
                        href={Links.githubLink}
                        className="button gitHub"
                        ref={githubLinkRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        GitHub
                        </a>
                    </Html>
                  )}
                  {matches.large && (
                    <Html
                      transform
                      wrapperClass="leftButton"
                      distanceFactor={1.2}
                      position={[-0.5, -0.19, -0.85]}
                      rotation-y={-0.0351}
                      rotation-x={0}
                      rotation-z={0.038}
                    >
                      <a
                        href={Links.githubLink}
                        className="button gitHub"
                        ref={githubLinkRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        GitHub
                        </a>
                    </Html>
                  )}
                </>
              )}
            </Media>
          )}
        </mesh>
      </e.group>
    </>
  );
};
