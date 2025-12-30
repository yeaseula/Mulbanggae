"use client"
import { useEffect, useRef } from "react"
import { initMap } from "./initmap"
import styled from "styled-components"

export function Location () {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(!mapRef.current) return

        const map = initMap(mapRef.current)

        return ()=> {
            //map?.destroy?.()
        }
    },[])
    return <MapArea ref={mapRef} />
}

const MapArea = styled.div`
    width: 100%;
    height: 100%;
`