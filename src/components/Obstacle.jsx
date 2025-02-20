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
                
                <meshStandardMaterial key="0" attachArray="material" map={sideTexture} />
                <meshStandardMaterial key="1" attachArray="material" map={roofTexture} />
                <meshStandardMaterial key="2" attachArray="material-2" map={roofTexture} />
                <meshStandardMaterial key="3" attachArray="material-3" map={roofTexture} />
                <meshStandardMaterial key="4" attachArray="material-4" map={roofTexture} />
                <meshStandardMaterial key="5" attachArray="material-5" map={roofTexture} />

                {/*right*/}
                {/* <meshStandardMaterial key="0" attachArray="material-0" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} /> */}
                {/*left*/}
                {/* <meshStandardMaterial key="1" attachArray="material-1" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} />  */}
                {/*top*/}
                {/* <meshStandardMaterial key="2" attachArray="material-0" map={roofTexture} /> */}
                {/* if ( hasRoofTexture) { */}
                
                {/* } */}
                {/* else { */}
                    {/* <meshStandardMaterial attachArray="material-2" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} /> */}
                {/* } */}
                
                 {/*bottom*/}
                {/* <meshStandardMaterial key="3" attachArray="material-3" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} />  */}
                {/*front*/}
                {/* <meshStandardMaterial key="4" attachArray="material-4" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} /> */}
                {/*back*/}
                {/* <meshStandardMaterial key="5" attachArray="material-5" map={colorMap} normalMap={normalMap} displacementMap={heightMap} roughnessMap={roughnessMap} alphaMap={maskMap} displacementScale={0.1} />  */}


            </mesh>
        </group>
    );
})
