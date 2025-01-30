import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Center, useTexture} from '@react-three/drei'
import { RepeatWrapping} from 'three'

export const Obstacle = forwardRef( ( props, ref) => {
    const meshRef = useRef();

    const [colorMap, normalMap, heightMap, roughnessMap, maskMap] = useTexture([
        props.texturePath + 'color.jpg',
        props.texturePath + 'normal.png',
        props.texturePath + 'height.png',
        props.texturePath + 'roughness.jpg',
        props.texturePath + 'mask.jpg'
      ]);

    // Apply texture wrapping and repeat
    [colorMap, normalMap, heightMap, roughnessMap, maskMap].forEach(texture => {
        texture.wrapS = RepeatWrapping
        texture.wrapT = RepeatWrapping
        texture.repeat.set(2, 1); // Adjust repeat as needed
    });
    // const texture = useTexture( props.texturePath)
    // texture.repeat.set(10, 1)
    // texture.wrapS = texture.wrapT = RepeatWrapping

    // const { roughness } = useControls({ roughness: { value: 1, min: 0, max: 1 } })
    return (
        <group position={props.obstaclePosition} ref={meshRef}>
            <mesh castShadow={true}>
                <boxGeometry args={props.size} />

                <meshStandardMaterial map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} />
                {/* <meshStandardMaterial attachArray="material-1" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} />
                <meshStandardMaterial attachArray="material-2" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} />
                <meshStandardMaterial attachArray="material-3" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} />
                <meshStandardMaterial attachArray="material-4" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} />
                <meshStandardMaterial attachArray="material-5" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} /> */}
                {/* <meshBasicMaterial attachArray="material-5" color="gray" transparent/> */}
            </mesh>
        </group>
    );
})
