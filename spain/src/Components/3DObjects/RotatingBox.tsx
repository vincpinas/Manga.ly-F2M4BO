// @ts-nocheck
import React, { useRef, useState } from 'react';
import { useFrame } from "react-three-fiber";
import { softShadows, MeshWobbleMaterial } from '@react-three/drei';

// Props Interface for rotating Box
interface rotatingBoxProps {
    color?: string;
    position?: [x: number, y: number, z: number];
    args?: any;
    speed?: number;
    rotation?: any;
    history?: any;
    link?: string;
    setPageText?: any;
}

const RotatingBox = ({ color, position, args, speed, rotation, history, link, setPageText }: rotatingBoxProps) => {
    // Drei Function for softer shadows.
    softShadows();
    // States & Variables
    const mesh = useRef<any>(null);
    const [page, setPage] = useState(false);
    // Page handler for onClick events.
    if(page && link) {
        if (link.includes('http')) {
            const win = window.open(`${link}`, '_blank');
            win?.focus();
        } else {
            history.push(`${link}`);
        }
    }
    // Box Rotation
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += rotation));

    return (
        <mesh position={position} 
              ref={mesh} 
              castShadow 
              onPointerOver={() => setPageText(`${link}`)}
              onClick={() => setPage(true)}
        >
            <boxBufferGeometry attach='geometry' args={args} />
            <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={0.6}/>
        </mesh>
    );
};

export default RotatingBox;