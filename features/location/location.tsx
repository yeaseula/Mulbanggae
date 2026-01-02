"use client"
import { useEffect, useRef, useState } from "react"
import { BottomSheet } from "@/components/bottomsheet/bottomsheet"
import { LocationSearch } from "@/features/location/location-search"
import { InitMap } from "./initmap"
import { LocationButton } from "./location-button"
import { LocationBottomSheet } from "./location-bottom-sheet"
import { moveToCurrentLocation } from "./move-current-location"
import styled from "styled-components"

export function Location () {

    const [open,setOpen] = useState(false)

    const mapRef = useRef<HTMLDivElement>(null)
    const locationRef = useRef<kakao.maps.Map | null>(null)
    const [mapReady,setMapReady] = useState<boolean>(false)

    console.log(locationRef.current + ': 현재위치')

    useEffect(()=>{
        if (!mapRef.current) return

        const mapload = async() => {
            if (!mapRef.current) return
            const map = await InitMap(mapRef.current)
            locationRef.current = map
            moveToCurrentLocation(map)
            setMapReady(true)
        }

        mapload()

    },[])


    return (
        <>
        <MapArea ref={mapRef}>
        </MapArea>
        <LocationSearch />
        {mapReady &&
        <LocationButton map={locationRef.current} mapReady={mapReady}/>
        }
        <BottomSheet open={open} onClose={()=>setOpen(false)}>
            <LocationBottomSheet />
        </BottomSheet>
        </>
    )
}

const MapArea = styled.div`
    width: 100%;
    height: 100%;
`