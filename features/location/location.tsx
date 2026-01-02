"use client"
import { useEffect, useRef, useState } from "react"
import { BottomSheet } from "@/components/bottomsheet/bottomsheet"
import { LocationSearch } from "@/features/location/location-search"
import { InitMap } from "./initmap"
import { LocationButton } from "./location-button"
import { LocationBottomSheet } from "./location-bottom-sheet"
import { moveToCurrentLocation } from "./move-current-location"
import styled from "styled-components"
import { searchNearbyStores } from "./search-near-stores"

export function Location () {

    const [open,setOpen] = useState(false)

    const mapRef = useRef<HTMLDivElement>(null)
    const locationRef = useRef<kakao.maps.Map | null>(null)
    const [mapReady,setMapReady] = useState<boolean>(false)

    useEffect(()=>{
        if (!mapRef.current) return

        const mapload = async() => {
            if (!mapRef.current) return
            const map = await InitMap(mapRef.current)
            locationRef.current = map

            await moveToCurrentLocation(map) //map center 순서보장을 위해
            searchNearbyStores(map, '동물병원')
            setMapReady(true)
        }

        mapload()

    },[])


    return (
        <>
        <MapArea ref={mapRef}>
        </MapArea>
        <LocationSearch map={locationRef.current}/>
        {mapReady &&
        <LocationButton map={locationRef.current} />
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