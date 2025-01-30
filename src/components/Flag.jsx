import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame, useLoader} from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { Text } from '@react-three/drei'

export const Flag = forwardRef( (props, ref) => {
    const meshRef = useRef();
    const textRef = useRef()
    const fontProps = { font: 'fonts/Inter-Regular.woff', fontSize: 0.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
     
    // const materialRef = useRef();

    // useFrame(({ clock }) => {
    //     const time = clock.getElapsedTime();
    //     const positions = meshRef.current.geometry.attributes.position.array;

    //     for (let i = 0; i < positions.length; i += 3) {
    //         const x = positions[i];
    //         const y = positions[i + 1];
    //         positions[i + 2] = Math.sin(x * 2 + time * 3) * 0.2 * Math.sin(y * 2 + time * 2);
    //     }

    //     meshRef.current.geometry.attributes.position.needsUpdate = true;
    // });

    useImperativeHandle(ref, () => ({
        changeFlagColor: ( newColor) => {
            meshRef.current.traverse( (child) => {
                if ( child.isMesh) {
                    child.material = child.material.clone();
                    child.material.color.set( newColor)
                }
            })
            textRef.current.color.set( newColor)
        }
    }))

    let obj = {}
    if ( props.path.includes( ".obj")) {
        obj = useLoader( OBJLoader, props.path)
        // const { scene } = ( props.path)
    }
    else if (props.path.includes( ".glb")) {
        obj = useLoader( GLTFLoader, props.path)
        // const { scene } = useGLTF( props.path)
    }
    else if (props.path.includes(".fbx")) {
        obj = useLoader( FBXLoader, props.path)
    }
    obj.traverse((child) => {
        if ( child.isMesh) {
            child.material = child.material.clone();
            child.material.color.set( props.color)
            child.castShadow = true;
            child.receiveShadow = true;
        }
    })
        
    return (
        <group position={props.flagPosition} >
            <mesh ref={meshRef} scale={props.scale} castShadow={true}>
                <primitive object={obj.clone()} name={props.path + props.flagNumber} castshadow />
            </mesh>
            <Text position={[0, 3, 0]} ref={textRef} color={props.color} {...fontProps} >
                {props.flagId}
            </Text>
        </group>
    );
})
