import { Center, useTexture} from '@react-three/drei'
import { RepeatWrapping} from 'three'

export function Barrier( {position, size}) {
  const texture = useTexture('AWS_logo_resized_black_bg.png')
  texture.repeat.set(15, 1)
  texture.wrapS = texture.wrapT = RepeatWrapping

  return (
    <group position={position}>
        <mesh castShadow={true}>
          <boxGeometry args={size}/>
          {/* <meshStandardMaterial metalness={1.5} roughness={roughness} color={color} /> */}
          <meshStandardMaterial map={texture} />
        </mesh>
    </group>
  )
}
