import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Obstacle } from './Obstacle'

export function Obstacles( { trackWidth, trackHeight}) {
  const obstacleRefs = useRef([])

  const leftStartPos = Math.trunc(-(trackWidth/2))
  const rightStartPos = Math.trunc((trackWidth/2))
  const obstacleHeight = 1

  const roofTexturePath1 = 'textures/blue_tile_roof_texture_0042023.jpg'

  const obstacles = [
    // Left hand side obstacles
    { position: [leftStartPos+Math.trunc(5/2), obstacleHeight/2, 0], size: [5, 1, 1], texturePath: 'textures/office_night/', roofTexturePath: roofTexturePath1},
    { position: [leftStartPos+Math.trunc(5/2), obstacleHeight/2, 4], size: [5, 1, 1], texturePath: 'textures/office_night/', roofTexturePath: roofTexturePath1},
    { position: [leftStartPos+Math.trunc(5/2), obstacleHeight/2, -4], size: [5, 1, 1], texturePath: 'textures/office_night/', roofTexturePath: roofTexturePath1},

    { position: [leftStartPos+Math.trunc(5/2)+4.5, obstacleHeight/2, -3.5], size: [2, 1, 6], texturePath: 'textures/warehouse/', roofTexturePath: roofTexturePath1},
    { position: [leftStartPos+Math.trunc(5/2)+4.5, obstacleHeight/2, 3.5], size: [2, 1, 6], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},

    { position: [leftStartPos+Math.trunc(5/2)+10, obstacleHeight/2, -4], size: [5, 1, 1], texturePath: 'textures/office_night/', roofTexturePath: roofTexturePath1},
    { position: [leftStartPos+Math.trunc(5/2)+10, obstacleHeight/2, -5], size: [1, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},

    { position: [leftStartPos+Math.trunc(5/2)+10, obstacleHeight/2, 0], size: [7, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [leftStartPos+Math.trunc(5/2)+10, obstacleHeight/2, 0], size: [1, 1, 3], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},

    { position: [leftStartPos+Math.trunc(5/2)+13, obstacleHeight/2, 4], size: [1, 1, 3], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},

    { position: [leftStartPos+Math.trunc(5/2)+17.5, obstacleHeight/2, -4], size: [4, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [leftStartPos+Math.trunc(5/2)+16, obstacleHeight/2, 0], size: [1, 1, 5], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [leftStartPos+Math.trunc(5/2)+17.5, obstacleHeight/2, 4], size: [4, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},

    // Right hand side obstacles
    { position: [rightStartPos+Math.trunc(5/2)-21.5, obstacleHeight/2, -4], size: [4, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [rightStartPos+Math.trunc(5/2)-20, obstacleHeight/2, 0], size: [1, 1, 5], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [rightStartPos+Math.trunc(5/2)-21.5, obstacleHeight/2, 4], size: [4, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},

    { position: [rightStartPos+Math.trunc(5/2)-17, obstacleHeight/2, -4], size: [1, 1, 3], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},

    { position: [rightStartPos+Math.trunc(5/2)-14, obstacleHeight/2, 0], size: [7, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [rightStartPos+Math.trunc(5/2)-14, obstacleHeight/2, 0], size: [1, 1, 3], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
        
    { position: [rightStartPos+Math.trunc(5/2)-14, obstacleHeight/2, 4], size: [5, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [rightStartPos+Math.trunc(5/2)-14, obstacleHeight/2, 5], size: [1, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},

    { position: [rightStartPos+Math.trunc(5/2)-8.5, obstacleHeight/2, -3.5], size: [2, 1, 6], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [rightStartPos+Math.trunc(5/2)-8.5, obstacleHeight/2, 3.5], size: [2, 1, 6], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
          
    { position: [rightStartPos-Math.trunc(5/2), obstacleHeight/2, 0], size: [5, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [rightStartPos-Math.trunc(5/2), obstacleHeight/2, 4], size: [5, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
    { position: [rightStartPos-Math.trunc(5/2), obstacleHeight/2, -4], size: [5, 1, 1], texturePath: 'textures/office_building/', roofTexturePath: roofTexturePath1},
  ]

  return (
    <>
    {obstacles.map(( data, index) => (
        <Obstacle 
            key={index}
            texturePath={data.texturePath}
            obstaclePosition={data.position}
            size={data.size}
            ref={el => obstacleRefs.current[index] = el}
            obstacleNumber={index}
            color={data.color}
            roofTexturePath={data.roofTexturePath}
        />
    ))}
    {/* <Obstacle position={[2.5, 0, 0]} size={[1, 2, 1]} color={"lightgreen"} /> */}
    </>
  )
}

