import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from "@react-three/fiber"
import { useGLTF, Text } from '@react-three/drei'

export const Model = forwardRef( (props, ref) => {
  const fontProps = { font: 'fonts/Inter-Bold.woff', fontSize: 0.35, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const modelref = useRef()
  const textRef = useRef()

  const [modelDirection, setModelDirection] = useState( 'W')
  const [moveQueue, setMoveQueue] = useState([])

  function modelRotateLeft() {
    modelref.current.rotation.y += Math.PI / 2
    if ( modelDirection == 'E') {
      setModelDirection( 'N')
    } 
    else if (modelDirection == 'W') {
      setModelDirection( 'S')
    } 
    else if (modelDirection == 'N') {
      setModelDirection( 'W')
    }
    else if (modelDirection == 'S') {
      setModelDirection( 'E')
    }
  }

  function modelRotateRight() {
    modelref.current.rotation.y -= Math.PI / 2
    if ( modelDirection == 'E') {
      setModelDirection( 'S')
    } 
    else if (modelDirection == 'W') {
      setModelDirection( 'N')
    } 
    else if (modelDirection == 'N') {
      setModelDirection( 'E')
    }
    else if (modelDirection == 'S') {
      setModelDirection( 'W')
    }
  }

  function modelMoveForward() {
    // Move depending on orientation
    // const curPosition = modelref.current.position
    if ( modelDirection == 'E') {
      modelref.current.position.x += 1
    } 
    else if (modelDirection == 'W') {
      modelref.current.position.x -= 1
    } 
    else if (modelDirection == 'N') {
      modelref.current.position.z -= 1
    }
    else if (modelDirection == 'S') {
      modelref.current.position.z += 1
    }
    textRef.current.position.set( modelref.current.position)
    textRef.current.position.y = modelref.current.position.y + 2
  }

  function modelMoveBackward() {
    // Move depending on orientation - x axis always stays the same as the actor is moving on that plane
    if ( modelDirection == 'E') {
      modelref.current.position.x -= 1
    } 
    else if (modelDirection == 'W') {
      modelref.current.position.x += 1
    } 
    else if (modelDirection == 'N') {
      modelref.current.position.z += 1
    }
    else if (modelDirection == 'S') {
      modelref.current.position.z -= 1
    }
    textRef.current.position.set( modelref.current.position)
    textRef.current.position.y = modelref.current.position.y + 2
  }
  
  function modelRotate90() {
    modelref.current.rotation.y += Math.PI
    if ( modelDirection == "E") {
      setModelDirection("W")
    }     
    else if (modelDirection == 'W') {
      setModelDirection( 'E')
    } 
    else if (modelDirection == 'N') {
      setModelDirection( 'S')
    }
    else if (modelDirection == 'S') {
      setModelDirection( 'N')
    }
  }

  function setAbsolutePosition( position) {
    modelref.current.position.set( position)
    textRef.current.position.set( modelref.current.position)
    textRef.current.position.y = modelref.current.position.y + 2
  }

  useImperativeHandle(ref, () => ({
    rotateLeft: () => {
      modelRotateLeft()
    },
    rotateRight: () => {
      modelRotateRight()
    },
    moveForward: () => {
      modelMoveForward()
    },
    moveBackward: () => {
      modelMoveBackward()
    },
    rotate90: () => {
      modelRotate90()
    },
    setAbsolutePosition: (position) => {
      setAbsolutePosition( position)
    },
    addMove: (move) => {
      setMoveQueue( prev => [...prev, move])
    },
    getCurrentDirection: () => {
      return modelDirection
    }
  }))

  useFrame(() => {
    if ( modelref.current && moveQueue.length > 0) {
      const singleMove = moveQueue[0]
      if ( singleMove == "Forward") {
        modelMoveForward()
      } else if ( singleMove == "Backward" || singleMove == "Back") {
        modelMoveBackward()
      } else if ( singleMove == "Right") {
        modelRotateRight()
      } else if ( singleMove == "Left") {
        modelRotateLeft()
      }
      setMoveQueue( prev => prev.slice(1))
      textRef.current.position.x = modelref.current.position.x
      textRef.current.position.y = modelref.current.position.y + 1
      textRef.current.position.z = modelref.current.position.z
    }
  })

  useEffect(() => {
    if (modelref.current) {
      // change the orientation if the reorient prop is passed in
      if (props.reorient) {
        modelRotate90()
      }
      textRef.current.position.x = modelref.current.position.x
      textRef.current.position.y = modelref.current.position.y + 1
      textRef.current.position.z = modelref.current.position.z
    }
  }, [])

  const { scene } = useGLTF( props.path)
  scene.traverse((child) => {
    if ( child.isMesh) {
        let meshMaterialColor = child.material.color.getHexString()
        if ( meshMaterialColor !== '464646' && meshMaterialColor != '4b4b4b' && meshMaterialColor != '0e0e0e' ) {
          child.material = child.material.clone();
          child.material.color.set( props.color)
        }
        child.castShadow = true;
        child.receiveShadow = true;
    }
  })  

  return (
    <group castShadow={true} >
      <mesh ref={modelref} position={props.initialPosition} scale={0.5} castShadow={true}>
        <primitive object={scene.clone()} name={props.path + props.actorNumber} />
      </mesh>
      <Text ref={textRef} color={props.color} {...fontProps} >
        {props.actorId}
      </Text>
    </group>
  )
})
