import './App.css';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import {OrbitControls, Stars, Sky } from "@react-three/drei"
import { Ground } from './components/Ground';
import { TextureLoader, RepeatWrapping,} from 'three';
import { Warehouse } from './components/Warehouse';
import React, { useRef, useState, useMemo } from "react";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


//import fileglb from './public/bread.glb' // GLB FILE
import { Player } from './components/Player';

import grass from './images/grass1.jpg';

function Box(props) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0,-1,0]}))
  const texture = new TextureLoader().load(grass);
  
  const [active, setActive] = useState(false);

  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 20.01;
  });

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);
  return (
    <mesh onClick={() => {api.velocity.set(20, 20,0)}} ref={ref} position={[0, 1, 0]} >
      <boxBufferGeometry map attach="geometry" />
      <meshLambertMaterial attach="material" map={texture} transparent={true} />
    </mesh>
  )
}

function Ship() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "models/arwing.glb");

  return (
    <group ref={group}>
      <mesh mass={4} position={[0,1,11]} visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}






function App() {
  return (
        <Canvas style={{height:window.height ,width:window.width, backgroundColor: 'black'}}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.25} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Box/>
          <Ship/>
          <Ground position={[0, 0.5, 0]} />
          <Warehouse position={[0, 2, 0]} />
          <Player position={[0, 3, 10]} />
        </Physics>
      </Canvas>
  );
}

export default App;
