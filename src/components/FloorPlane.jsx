import { useTexture } from '@react-three/drei'
import { RepeatWrapping} from 'three'
import { Text } from '@react-three/drei'

export function FloorPlane({ planeWidth, planeHeight}) {
    const texture = useTexture('floorPanelTile2.png')
    texture.repeat.set(planeWidth, planeHeight)
    texture.wrapS = texture.wrapT = RepeatWrapping

    const fontProps = { font: 'fonts/Inter-Regular.woff', fontSize: 0.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

    let items = []

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[planeWidth, planeHeight]} receiveShadow />
            <meshStandardMaterial map={texture} receiveShadow />

            {/* Text at the left */}
            <Text position={[-23.5, 7, 0]} color={"black"} {...fontProps} >1</Text>
            <Text position={[-23.5, 6, 0]} color={"black"} {...fontProps} >2</Text>
            <Text position={[-23.5, 5, 0]} color={"black"} {...fontProps} >3</Text>
            <Text position={[-23.5, 4, 0]} color={"black"} {...fontProps} >4</Text>
            <Text position={[-23.5, 3, 0]} color={"black"} {...fontProps} >5</Text>
            <Text position={[-23.5, 2, 0]} color={"black"} {...fontProps} >6</Text>
            <Text position={[-23.5, 1, 0]} color={"black"} {...fontProps} >7</Text>
            <Text position={[-23.5, 0, 0]} color={"black"} {...fontProps} >8</Text>
            <Text position={[-23.5, -1, 0]} color={"black"} {...fontProps} >9</Text>
            <Text position={[-23.5, -2, 0]} color={"black"} {...fontProps} >10</Text>
            <Text position={[-23.5, -3, 0]} color={"black"} {...fontProps} >11</Text>
            <Text position={[-23.5, -4, 0]} color={"black"} {...fontProps} >12</Text>
            <Text position={[-23.5, -5, 0]} color={"black"} {...fontProps} >13</Text>
            <Text position={[-23.5, -6, 0]} color={"black"} {...fontProps} >14</Text>
            <Text position={[-23.5, -7, 0]} color={"black"} {...fontProps} >15</Text>

            {/* Text at the right */}
            <Text position={[23.5, 7, 0]} color={"black"} {...fontProps} >1</Text>
            <Text position={[23.5, 6, 0]} color={"black"} {...fontProps} >2</Text>
            <Text position={[23.5, 5, 0]} color={"black"} {...fontProps} >3</Text>
            <Text position={[23.5, 4, 0]} color={"black"} {...fontProps} >4</Text>
            <Text position={[23.5, 3, 0]} color={"black"} {...fontProps} >5</Text>
            <Text position={[23.5, 2, 0]} color={"black"} {...fontProps} >6</Text>
            <Text position={[23.5, 1, 0]} color={"black"} {...fontProps} >7</Text>
            <Text position={[23.5, 0, 0]} color={"black"} {...fontProps} >8</Text>
            <Text position={[23.5, -1, 0]} color={"black"} {...fontProps} >9</Text>
            <Text position={[23.5, -2, 0]} color={"black"} {...fontProps} >10</Text>
            <Text position={[23.5, -3, 0]} color={"black"} {...fontProps} >11</Text>
            <Text position={[23.5, -4, 0]} color={"black"} {...fontProps} >12</Text>
            <Text position={[23.5, -5, 0]} color={"black"} {...fontProps} >13</Text>
            <Text position={[23.5, -6, 0]} color={"black"} {...fontProps} >14</Text>
            <Text position={[23.5, -7, 0]} color={"black"} {...fontProps} >15</Text>

            {/* Text at the back */}
            <Text position={[-22, 9, 0]} color={"black"} {...fontProps} >A</Text>
            <Text position={[-21, 9, 0]} color={"black"} {...fontProps} >B</Text>
            <Text position={[-20, 9, 0]} color={"black"} {...fontProps} >C</Text>
            <Text position={[-19, 9, 0]} color={"black"} {...fontProps} >D</Text>
            <Text position={[-18, 9, 0]} color={"black"} {...fontProps} >E</Text>
            <Text position={[-17, 9, 0]} color={"black"} {...fontProps} >F</Text>
            <Text position={[-16, 9, 0]} color={"black"} {...fontProps} >G</Text>
            <Text position={[-15, 9, 0]} color={"black"} {...fontProps} >H</Text>
            <Text position={[-14, 9, 0]} color={"black"} {...fontProps} >I</Text>
            <Text position={[-13, 9, 0]} color={"black"} {...fontProps} >J</Text>
            <Text position={[-12, 9, 0]} color={"black"} {...fontProps} >K</Text>
            <Text position={[-11, 9, 0]} color={"black"} {...fontProps} >L</Text>
            <Text position={[-10, 9, 0]} color={"black"} {...fontProps} >M</Text>
            <Text position={[ -9, 9, 0]} color={"black"} {...fontProps} >N</Text>
            <Text position={[ -8, 9, 0]} color={"black"} {...fontProps} >O</Text>
            <Text position={[ -7, 9, 0]} color={"black"} {...fontProps} >P</Text>
            <Text position={[ -6, 9, 0]} color={"black"} {...fontProps} >Q</Text>
            <Text position={[ -5, 9, 0]} color={"black"} {...fontProps} >R</Text>
            <Text position={[ -4, 9, 0]} color={"black"} {...fontProps} >S</Text>
            <Text position={[ -3, 9, 0]} color={"black"} {...fontProps} >T</Text>
            <Text position={[ -2, 9, 0]} color={"black"} {...fontProps} >U</Text>
            <Text position={[ -1, 9, 0]} color={"black"} {...fontProps} >V</Text>
            <Text position={[  0, 9, 0]} color={"black"} {...fontProps} >W</Text>

            <Text position={[  1, 9, 0]} color={"black"} {...fontProps} >X</Text>
            <Text position={[  2, 9, 0]} color={"black"} {...fontProps} >Y</Text>
            <Text position={[  3, 9, 0]} color={"black"} {...fontProps} >Z</Text>
            <Text position={[  4, 9, 0]} color={"black"} {...fontProps} >AA</Text>
            <Text position={[  5, 9, 0]} color={"black"} {...fontProps} >AB</Text>
            <Text position={[  6, 9, 0]} color={"black"} {...fontProps} >AC</Text>
            <Text position={[  7, 9, 0]} color={"black"} {...fontProps} >AD</Text>
            <Text position={[  8, 9, 0]} color={"black"} {...fontProps} >AE</Text>
            <Text position={[  9, 9, 0]} color={"black"} {...fontProps} >AF</Text>
            <Text position={[ 10, 9, 0]} color={"black"} {...fontProps} >AG</Text>
            <Text position={[ 11, 9, 0]} color={"black"} {...fontProps} >AH</Text>
            <Text position={[ 12, 9, 0]} color={"black"} {...fontProps} >AI</Text>
            <Text position={[ 13, 9, 0]} color={"black"} {...fontProps} >AJ</Text>
            <Text position={[ 14, 9, 0]} color={"black"} {...fontProps} >AK</Text>
            <Text position={[ 15, 9, 0]} color={"black"} {...fontProps} >AL</Text>
            <Text position={[ 16, 9, 0]} color={"black"} {...fontProps} >AM</Text>
            <Text position={[ 17, 9, 0]} color={"black"} {...fontProps} >AN</Text>
            <Text position={[ 18, 9, 0]} color={"black"} {...fontProps} >AO</Text>
            <Text position={[ 19, 9, 0]} color={"black"} {...fontProps} >AP</Text>
            <Text position={[ 20, 9, 0]} color={"black"} {...fontProps} >AQ</Text>
            <Text position={[ 21, 9, 0]} color={"black"} {...fontProps} >AR</Text>
            <Text position={[ 22, 9, 0]} color={"black"} {...fontProps} >AS</Text>


            {/* Text in the front */}
            <Text position={[-22, -8.5, 0]} color={"black"} {...fontProps} >A</Text>
            <Text position={[-21, -8.5, 0]} color={"black"} {...fontProps} >B</Text>
            <Text position={[-20, -8.5, 0]} color={"black"} {...fontProps} >C</Text>
            <Text position={[-19, -8.5, 0]} color={"black"} {...fontProps} >D</Text>
            <Text position={[-18, -8.5, 0]} color={"black"} {...fontProps} >E</Text>
            <Text position={[-17, -8.5, 0]} color={"black"} {...fontProps} >F</Text>
            <Text position={[-16, -8.5, 0]} color={"black"} {...fontProps} >G</Text>
            <Text position={[-15, -8.5, 0]} color={"black"} {...fontProps} >H</Text>
            <Text position={[-14, -8.5, 0]} color={"black"} {...fontProps} >I</Text>
            <Text position={[-13, -8.5, 0]} color={"black"} {...fontProps} >J</Text>
            <Text position={[-12, -8.5, 0]} color={"black"} {...fontProps} >K</Text>
            <Text position={[-11, -8.5, 0]} color={"black"} {...fontProps} >L</Text>
            <Text position={[-10, -8.5, 0]} color={"black"} {...fontProps} >M</Text>
            <Text position={[ -9, -8.5, 0]} color={"black"} {...fontProps} >N</Text>
            <Text position={[ -8, -8.5, 0]} color={"black"} {...fontProps} >O</Text>
            <Text position={[ -7, -8.5, 0]} color={"black"} {...fontProps} >P</Text>
            <Text position={[ -6, -8.5, 0]} color={"black"} {...fontProps} >Q</Text>
            <Text position={[ -5, -8.5, 0]} color={"black"} {...fontProps} >R</Text>
            <Text position={[ -4, -8.5, 0]} color={"black"} {...fontProps} >S</Text>
            <Text position={[ -3, -8.5, 0]} color={"black"} {...fontProps} >T</Text>
            <Text position={[ -2, -8.5, 0]} color={"black"} {...fontProps} >U</Text>
            <Text position={[ -1, -8.5, 0]} color={"black"} {...fontProps} >V</Text>
            <Text position={[  0, -8.5, 0]} color={"black"} {...fontProps} >W</Text>

            <Text position={[  1, -8.5, 0]} color={"black"} {...fontProps} >X</Text>
            <Text position={[  2, -8.5, 0]} color={"black"} {...fontProps} >Y</Text>
            <Text position={[  3, -8.5, 0]} color={"black"} {...fontProps} >Z</Text>
            <Text position={[  4, -8.5, 0]} color={"black"} {...fontProps} >AA</Text>
            <Text position={[  5, -8.5, 0]} color={"black"} {...fontProps} >AB</Text>
            <Text position={[  6, -8.5, 0]} color={"black"} {...fontProps} >AC</Text>
            <Text position={[  7, -8.5, 0]} color={"black"} {...fontProps} >AD</Text>
            <Text position={[  8, -8.5, 0]} color={"black"} {...fontProps} >AE</Text>
            <Text position={[  9, -8.5, 0]} color={"black"} {...fontProps} >AF</Text>
            <Text position={[ 10, -8.5, 0]} color={"black"} {...fontProps} >AG</Text>
            <Text position={[ 11, -8.5, 0]} color={"black"} {...fontProps} >AH</Text>
            <Text position={[ 12, -8.5, 0]} color={"black"} {...fontProps} >AI</Text>
            <Text position={[ 13, -8.5, 0]} color={"black"} {...fontProps} >AJ</Text>
            <Text position={[ 14, -8.5, 0]} color={"black"} {...fontProps} >AK</Text>
            <Text position={[ 15, -8.5, 0]} color={"black"} {...fontProps} >AL</Text>
            <Text position={[ 16, -8.5, 0]} color={"black"} {...fontProps} >AM</Text>
            <Text position={[ 17, -8.5, 0]} color={"black"} {...fontProps} >AN</Text>
            <Text position={[ 18, -8.5, 0]} color={"black"} {...fontProps} >AO</Text>
            <Text position={[ 19, -8.5, 0]} color={"black"} {...fontProps} >AP</Text>
            <Text position={[ 20, -8.5, 0]} color={"black"} {...fontProps} >AQ</Text>
            <Text position={[ 21, -8.5, 0]} color={"black"} {...fontProps} >AR</Text>
            <Text position={[ 22, -8.5, 0]} color={"black"} {...fontProps} >AS</Text>
        </mesh>
    )
}
