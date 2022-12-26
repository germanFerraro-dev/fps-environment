import React from 'react';
import { useLoader } from '@react-three/fiber';
import { usePlane } from '@react-three/cannon';
import { TextureLoader, RepeatWrapping } from 'three';

import grass from '../images/grass.jpg';


export const Ground = (props) => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
    
    //loader
    const groundTexture = useLoader(TextureLoader, grass);
    

    groundTexture.wrapS = RepeatWrapping;
    groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(100, 100);


    return (
      <mesh
        ref={ref}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          const { x, y, z } = e.point;
        }}
      >
        <meshStandardMaterial 
          map={groundTexture}

          // displacementMap={displacementMap} 
          // normalMap={normalMap}  
          // roughnessMap={roughnessMap}
          // aoMap={aoMap}
          attach="material" />
        <planeBufferGeometry  attach="geometry" args={[100, 100]} />
      </mesh>
    );
}