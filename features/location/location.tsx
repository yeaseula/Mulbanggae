"use client"
import { useEffect, useRef } from "react"
import { initMap } from "./initmap"
import { BottomSheet } from "@/components/bottomsheet/bottomsheet"
import { LocationSearch } from "@/features/location/location-search"
import { LocationButton } from "./location-button"
import { LocationBottomSheet } from "./location-bottom-sheet"
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
    return (
        <>
        <MapArea ref={mapRef} />
        <LocationSearch />
        <LocationButton />
        <BottomSheet open>
            <LocationBottomSheet />
        </BottomSheet>
        </>
    )
}

const MapArea = styled.div`
    width: 100%;
    height: 100%;
`