import { useTexture } from '@react-three/drei'
import { RepeatWrapping} from 'three'

export function FloorPlane({ planeWidth, planeHeight}) {
    const texture = useTexture('floorPanelTile2.png')
    texture.repeat.set(planeWidth, planeHeight)
    texture.wrapS = texture.wrapT = RepeatWrapping

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[planeWidth, planeHeight]} receiveShadow />
            <meshStandardMaterial map={texture} receiveShadow />
        </mesh>
    )
}
