import { useRef } from 'react'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

export function PointLightWithHelper( {position, intensity, color}) {
    const lightRef = useRef()
    useHelper(lightRef, THREE.PointLightHelper, .5, 'red')
  
    return (
      <pointLight ref={lightRef} position={position} intensity={intensity} color={color} castShadow={true} distance={0} decay={1.5} />
    )
}
  