import { useState, useEffect, useRef, useTransition} from 'react'
import { Canvas, useLoader } from "@react-three/fiber"
import { events } from 'aws-amplify/data'

import { Flag } from './Flag'
import { currentTimeHHMMSSAsString } from '../utils'

export function Flags( { trackWidth, trackHeight}) {
    const flagRefs = useRef([])

    const leftStartPos = Math.trunc(-(trackWidth/2))
    const rightStartPos = Math.trunc((trackWidth/2))

    const flags = [
        { position: [leftStartPos+Math.trunc(5/2)+6, 0, 4], color: "blue", path: "USMC flag.obj", scale: 0.015, flagIndex: 0, flagId: "Flag1"},
        { position: [leftStartPos+Math.trunc(5/2)+6, 0, -4], color: "blue", path: "USMC flag.obj", scale: 0.015, flagIndex: 1, flagId: "Flag2"},
        { position: [leftStartPos+Math.trunc(5/2)+11, 0, 4], color: "blue", path: "USMC flag.obj", scale: 0.015, flagIndex: 2, flagId: "Flag3"},
        { position: [leftStartPos+Math.trunc(5/2)+16, 0, -7], color: "blue", path: "USMC flag.obj", scale: 0.015, flagIndex: 3, flagId: "Flag4"},

        { position: [0, 0, 0], color: "blue", path: "USMC flag.obj", scale: 0.015, flagIndex: 4, flagId: "Flag5"},

        { position: [rightStartPos+Math.trunc(5/2)-10, 0, -4], color: "blue", path: "USMC flag.obj", scale: 0.015, flagIndex: 5, flagId: "Flag6"},
        { position: [rightStartPos+Math.trunc(5/2)-10, 0, 4], color: "blue", path: "USMC flag.obj", scale: 0.015, flagIndex: 6, flagId: "Flag7"},
        { position: [rightStartPos+Math.trunc(5/2)-15, 0, -4], color: "blue", path: "USMC flag.obj", scale: 0.015, flagIndex: 7, flagId: "Flag8"},
        { position: [rightStartPos+Math.trunc(5/2)-20, 0, 7], color: "blue", path: "USMC flag.obj", scale: 0.015, flagIndex: 8, flagId: "Flag9"},
    ]

    useEffect(() => {
        const pr = events.connect(`/default/flag`)
        pr.then((channel) => {
        channel.subscribe({
            next: (data) => {
                const flagId = data.event.flagId || ''
                const status = data.event.claimed ? true : false
                const claimedByTeam = data.event.owner || ''

                const flag = flags.find( (flag) => flag.flagId == flagId )
                if ( flag !== undefined) {
                    console.log( "%s - Flags - flagId: %s, status: %s, claimedByTeam: %s", currentTimeHHMMSSAsString(), flagId, status, claimedByTeam)
                    if (status) {
                        if ( claimedByTeam.toLowerCase() == 'green') {
                            flagRefs.current[ flag.flagIndex].changeFlagColor( "green")
                        }
                        else if ( claimedByTeam.toLowerCase() == 'red') {
                            flagRefs.current[ flag.flagIndex].changeFlagColor( "red")
                        }
                    }
                    else {
                        // need to change back to the original color
                        // get the original color from the flags array
                        flagRefs.current[ flag.flagIndex].changeFlagColor( flag.color)
                    }
                }
            },
            error: (value) => console.error(value),
            })
        })

        return () => {
            pr?.then((channel) => channel?.close())
        }
    }, [])

    return (
        <>
        {flags.map(( data, index) => (
            <Flag 
                key={data.flagIndex}
                path={data.path}
                flagPosition={data.position}
                ref={el => flagRefs.current[index] = el}
                flagNumber={data.flagIndex}
                scale={data.scale}
                color={data.color}
                originlColor={data.color}
                flagId={data.flagId}
            />
        ))}        
        </>

    )
}