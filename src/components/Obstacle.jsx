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
    const sideTexture = useTexture( props.texturePath + 'color.jpg')
    sideTexture.wrapS = RepeatWrapping
    sideTexture.wrapT = RepeatWrapping
    sideTexture.repeat.set(1, 1); // Adjust repeat as needed

    // Load the texture and then use it
    const roofTexture = useTexture( props.roofTexturePath)
    // roofTexture.wrapS = RepeatWrapping
    // roofTexture.wrapT = RepeatWrapping
    // roofTexture.repeat.set( 2, 2)

    // console.log( props.roofTexturePath)
        
    return (
        <group position={props.obstaclePosition} ref={meshRef}>
            <mesh castShadow={true} >
                <boxGeometry attach="geometry" args={props.size} />
                
                <meshStandardMaterial attach="material-0" map={sideTexture} />
                <meshStandardMaterial attach="material-1" map={sideTexture} />
                <meshStandardMaterial attach="material-2" map={roofTexture} />
                <meshStandardMaterial attach="material-3" map={roofTexture} />
                <meshStandardMaterial attach="material-4" map={sideTexture} />
                <meshStandardMaterial attach="material-5" map={sideTexture} />

                {
                    // order is right, left, top, bottom, front, back
                }
            </mesh>
        </group>
    );
})
