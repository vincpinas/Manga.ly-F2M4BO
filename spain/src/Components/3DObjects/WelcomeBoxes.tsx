// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Canvas } from "react-three-fiber";
import { OrbitControls } from '@react-three/drei';
import RotatingBox from './RotatingBox';

interface WelcomeBoxesProps {
    history?: any;
    setPageText?: any;
}

const WelcomeBoxes = ({ history, setPageText }: WelcomeBoxesProps) => {
    // init
    const [speeds, setSpeeds] = useState({small: 0, big: 0});
    const getRS = (max: number, min: number) => { return Math.random() * (max - min) + min; }
    // Available Colors
    const colors = {
        black: '#000000',
        white: '#FFFFFF',
        red: '#F45D4C',
        pink: 'pink',
        blue: '#B6CCFE',
        orange: '#ffb222' 
    }
    // Set a random speeds for both the big box and small boxes.
    useEffect(() => {
        setSpeeds({
            small: getRS(0.03, 0.002),
            big: getRS(0.015, 0.004)
        })
    }, []);

    return (
        <Canvas colorManagement shadowMap camera={{ position: [4, 1, -10], fov: 65 }}>
            <ambientLight intensity={0.3}/>
            <directionalLight castShadow 
                              position={[0, 10, 0]} 
                              intensity={1.2} 
                              shadow-mapSize-width={1024}
                              shadow-mapSize-height={1024}
                              shadow-camera-far={50}
                              shadow-camera-left={-10}
                              shadow-camera-right={10}
                              shadow-camera-top={10}
                              shadow-camera-bottom={-10} 
            />
            <pointLight position={[-10, 0, -20]} intensity={0.5}/>
            <pointLight position={[0, -15, 0]} intensity={1.2}/>
            <group>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
                    <planeBufferGeometry attach='geometry' args={[100, 100]} />
                    <shadowMaterial attach='material' opacity={0.24} />
                </mesh>
            </group>

            <RotatingBox position={[0, 1, 0]} 
                         color={colors.white} 
                         args={[2.5, 1.8, 1]} 
                         rotation={speeds.big} 
                         speed={1.5} 
                         history={history} 
                         setPageText={setPageText}
                         link='https://www.youtube.com/channel/UC_SyKHqdTL0SEtgjUyxIUtQ'
            />
            <RotatingBox position={[-2, 1, -5]} 
                         color={colors.black} 
                         rotation={speeds.small} 
                         speed={3} 
                         history={history} 
                         setPageText={setPageText}
                         link='https://github.com/vincpinas/'
            />
            <RotatingBox position={[5, 1, -2]} 
                         color={colors.black} 
                         rotation={speeds.small} 
                         speed={3} 
                         history={history} 
                         setPageText={setPageText}
                         link='/founders'
            />
            <fog attach='fog' color={0xDFE9F3} near={6.5} far={25} />
            <OrbitControls />
        </Canvas>
    );
};

export default WelcomeBoxes;
