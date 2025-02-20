import { useState, useEffect, useRef } from 'react'
import { Canvas, useThree, useLoader } from "@react-three/fiber"
import { OrbitControls, Environment } from '@react-three/drei'
import { events } from 'aws-amplify/data'
// import { useControls, Leva, LevaInputs} from 'leva'
import * as THREE from 'three'
import { TextureLoader } from 'three'

import { Model } from './Model'
import { Track } from './Track'
import { PointLightWithHelper } from './PointLightWithHelper'
import { currentTimeHHMMSSAsString } from '../utils'

// The overall scene and lighting
export function Scene() {
  const trackWidth = 45.0, trackHeight = 15.0
  // const [actorNumber, setActorNumber] = useState(0)
  const actorRefs = useRef([])
  // const [messages, setMessages] = useState([])

  const leftStartPos = Math.trunc(-(trackWidth/2))
  const rightStartPos = Math.trunc((trackWidth/2))

  const actors = [
    { path: "low poly blue car.glb", initialPosition: [leftStartPos,0,Math.trunc(trackHeight/2)-1], reorient: true, actorId: "Green1", actorIndex: 0, color: "green" },
    { path: "low poly blue car.glb", initialPosition: [leftStartPos,0,Math.trunc(trackHeight/2)-5], reorient: true, actorId: "Green2", actorIndex: 1, color: "green"  },
    { path: "low poly blue car.glb", initialPosition: [leftStartPos,0,-(Math.trunc(trackHeight/2)-5)], reorient: true, actorId: "Green3", actorIndex: 2, color: "green"  },
    { path: "low poly blue car.glb", initialPosition: [leftStartPos,0,-(Math.trunc(trackHeight/2)-1)], reorient: true, actorId: "Green4", actorIndex: 3, color: "green"  },

    { path: "low poly red car.glb", initialPosition: [rightStartPos,0,Math.trunc(trackHeight/2)-1], reorient: false, actorId: "Red1", actorIndex: 4, color: "red"  },
    { path: "low poly red car.glb", initialPosition: [rightStartPos,0,Math.trunc(trackHeight/2)-5], reorient: false, actorId: "Red2", actorIndex: 5, color: "red"  },
    { path: "low poly red car.glb", initialPosition: [rightStartPos,0,-(Math.trunc(trackHeight/2)-5)], reorient: false, actorId: "Red3", actorIndex: 6, color: "red"  },
    { path: "low poly red car.glb", initialPosition: [rightStartPos,0,-(Math.trunc(trackHeight/2)-1)], reorient: false, actorId: "Red4", actorIndex: 7, color: "red"  },
  ]

  useEffect(() => {
    const pr = events.connect(`/default/actor`)
    pr.then((channel) => {
      channel.subscribe({
        next: (data) => {
          // we call the appropriate actor function for the actor number
          // validate the message
          // extract actor number
          // extract the actor move required

          // The message will contain the ActorId. This needs to be used to get the corresponding actorIndex
          const actorId = data.event.ActorId || ''
          const move = data.event.Move.charAt(0).toUpperCase() || '' 
        
          let actorIndex = 99
          if ( actorId) {
            const actor = actors.find( (actor) => actor.actorId == actorId)
            actorIndex = actor.actorIndex
          }

          console.log( "%s - From appsync events - actor: %s, input move: %s, shortened move: %s", currentTimeHHMMSSAsString(), actorId, data.event.Move, move)

          if ( actorIndex !== undefined && actorIndex !== 99) {
            // need to translate the NSEW move received from appsync into actual moves depending on
            // current orientation
            // Assume current orientation is "N"
            // If we receive a "N" move from appsync then we just need to "moveForward"
            // If we receive a "S" move from appsync then we just need to "moveRight, moveRight, moveForward"
            // If we receive a "E" move from appsync then we just need to "moveRight, moveForward"
            // If we receive a "W" move from appsync then we just need to "moveLeft, moveForward"

            // We need to get the current orientation of the actor
            const currentDirection = actorRefs.current[actorIndex].getCurrentDirection()
            if ( currentDirection == 'N') {
              if ( move == 'N') {
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'S') {
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'E') {
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'W') {
                actorRefs.current[ actorIndex].addMove( 'Left')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }            
            }
            else if ( currentDirection == 'S') {
              if ( move == 'N') {
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'S') {
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'E') {
                actorRefs.current[ actorIndex].addMove( 'Left')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'W') {
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }            
            }
            else if ( currentDirection == 'E') {
              if ( move == 'N') {
                actorRefs.current[ actorIndex].addMove( 'Left')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'S') {
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'E') {
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'W') {
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }            
            }
            else if ( currentDirection == 'W') {
              if ( move == 'N') {
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'S') {
                actorRefs.current[ actorIndex].addMove( 'Left')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'E') {
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Right')
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }
              else if (move == 'W') {
                actorRefs.current[ actorIndex].addMove( 'Forward')
              }            
            }
            // for (let i = 0; i < moves.length; i++) {
            //   actorRefs.current[ actorIndex].addMove( moves[i])
            // }
            // setMessages((messages) => [...messages, data.event])
          }

        },
        error: (value) => console.error(value),
      })
    })

    return () => {
      pr?.then((channel) => channel?.close())
    }
  }, [])

  // const lightRef = useRef()

  // useHelper( lightRef, THREE.PointLightHelper, 0.5, 'red')
    
  // const handleActorNumberChange = (event) => {
  //   const inputValue = event.target.value
  //   if (! isNaN( inputValue) || inputValue === '') {
  //     setActorNumber( inputValue)
  //   }
  // }

  // const handleActorRotateLeft = () => { actorRefs.current[actorNumber].rotateLeft()}
  // const handleActorRotateRight = () => { actorRefs.current[actorNumber].rotateRight()}
  // const handleActorMoveForward = () => { actorRefs.current[actorNumber].moveForward()}
  // const handleActorMoveBackward = () => { actorRefs.current[actorNumber].moveBackward()}

  return (
    <div>
      <Canvas shadows="percentage" camera={{ position: [-20, 15, 20], fov: 40 }}>
        {/* <Background /> */}

        <ambientLight intensity={0.6} />
        {/* <hemisphereLight skycolor={0xffffff} groundColor={0xffffff} intensity={0.3} position={[0, 50, 0]} /> */}
        {/* <pointLight position={[-25, 25, 50]} intensity={4.5} color={0xffffff} /> */}
        <PointLightWithHelper position={[-15, 15, 15]} intensity={200} color={0xffffff} />

        {/* <hemisphereLightHelper castShadow light={} /> */}
        {/* <directionalLight position={[-25, 25, 50]} intensity={0.54} castShadow color={0xffffff}/> */}
        <axesHelper args={[30]} />

        <Track trackWidth={trackWidth} trackHeight={trackHeight} barrierHeight={1} barrierThickness={0.1} />

        {actors.map(( data, index) => (
          <Model
            path={data.path}
            key={data.actorIndex}
            ref={el => actorRefs.current[data.actorIndex] = el}
            actorNumber={data.actorIndex}
            actorName={data.actorName}
            initialPosition={data.initialPosition}
            reorient={data.reorient}
            color={data.color}
            actorId={data.actorId}
          />
        ))}

        {/* <Env /> */}
        <OrbitControls autoRotate={false} autoRotateSpeed={2} enablePan={true} enableZoom={true} minPolarAngle={0} maxPolarAngle={Math.PI / 2.3}  />

        {/* <Html>
          <div style={{ position: 'absolute', top: '10px', left: '-310px' }}>
            <input style={{ width: '75px', height: '25px', position: 'absolute', left: '10px', top: '200px'}} 
                type="number" value={actorNumber} 
                onChange={handleActorNumberChange}
                placeholder='Enter the actor number' 
                min={0} max={8} step="1"/>
            <button style={{ width: '75px', height: '25px', position: 'absolute', left: '110px', top: '200px'}} onClick={handleActorRotateLeft}>Left</button>
            <button style={{ width: '75px', height: '25px', position: 'absolute', left: '210px', top: '200px'}} onClick={handleActorRotateRight}>Right</button>
            <button style={{ width: '75px', height: '25px', position: 'absolute', left: '310px', top: '200px'}} onClick={handleActorMoveForward}>Forward</button>
            <button style={{ width: '75px', height: '25px', position: 'absolute', left: '410px', top: '200px'}} onClick={handleActorMoveBackward}>Back</button>
            <textarea
              style={{ position: 'absolute', left: '10px', top: '250px', width: '550px', height: '350px'}} 
              rows={55}
              cols={25}
              placeholder={"Appsync messages"}
              readOnly={true}
              defaultValue={
                  messages.map((message, index) => (
                    JSON.stringify(message) + "\n"
                  ))
              }
            />
          </div>
        </Html> */}

      </Canvas>
            

    </div>
  )
}

function Background() {
  const { scene } = useThree()
  const texture = useLoader(TextureLoader, "textures/sky2.jpg")
  
  scene.background = texture
  return null
}


// function Env() {
//     const [preset, setPreset] = useState('sunset')
//     // You can use the "inTransition" boolean to react to the loading in-between state,
//     // For instance by showing a message
//     const [inTransition, startTransition] = useTransition()
//     const { blur } = useControls({
//       blur: { value: 0.65, min: 0, max: 1 },
//       preset: {
//         value: preset,
//         options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
//         // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
//         // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
//         // That way we can hang onto the current environment until the new one has finished loading ...
//         onChange: (value) => startTransition(() => setPreset(value))
//       }
//     })
//     return <Environment preset={preset} background blur={blur} />
// }
  