import { Barrier } from './Barrier'

export function Barriers( {trackWidth, trackHeight, barrierHeight, barrierThickness}) {
    return (
        <>
            <Barrier position={[(trackWidth/2.0), 0.5, 0]} size={[barrierThickness, barrierHeight, trackHeight]} />
            <Barrier position={[(trackWidth/2.0) * -1, 0.5, 0]} size={[barrierThickness, barrierHeight, trackHeight]} />
            <Barrier position={[0, 0.5, trackHeight/2.0]} size={[trackWidth, barrierHeight, barrierThickness]} />
            <Barrier position={[0, 0.5, (trackHeight/2.0) * -1]} size={[trackWidth, barrierHeight, barrierThickness]} />
        </>
    );
}
