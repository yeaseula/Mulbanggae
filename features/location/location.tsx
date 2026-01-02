"use client"
import { useEffect, useRef, useState } from "react"
import { InitMap } from "./initmap"
import { BottomSheet } from "@/components/bottomsheet/bottomsheet"
import { LocationSearch } from "@/features/location/location-search"
import { LocationButton } from "./location-button"
import { LocationBottomSheet } from "./location-bottom-sheet"
import styled from "styled-components"

export function Location () {

    const [open,setOpen] = useState(false)

    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if (!mapRef.current) return
        InitMap(mapRef.current)
    },[])


    return (
        <>
        <MapArea ref={mapRef}>
        </MapArea>
        <LocationSearch />
        <LocationButton />
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