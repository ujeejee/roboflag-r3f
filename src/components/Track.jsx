import { FloorPlane } from './FloorPlane'
import { Barriers } from './Barriers'
import { Flags } from './Flags'
import { Obstacles } from './Obstacles'

// display the track and all its details. It will have to display border, numbering
// Obstacles, flags and actors will be separate components which will be placed on the track
export function Track( {trackWidth, trackHeight, barrierHeight, barrierThickness}) {
  return (
    <>
      <FloorPlane planeWidth={trackWidth} planeHeight={trackHeight}/>
      <Barriers trackWidth={trackWidth} trackHeight={trackHeight} barrierHeight={barrierHeight} barrierThickness={barrierThickness}  />
      <Obstacles trackWidth={trackWidth} trackHeight={trackHeight} />
      <Flags trackWidth={trackWidth} trackHeight={trackHeight} />
    </>
  )
}
