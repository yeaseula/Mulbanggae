"use client"
import { useEffect, useRef, useState } from "react"
import { useLocationStore } from "@/store/locationstore"
import { BottomSheet } from "@/components/bottomsheet/bottomsheet"
import { LocationSearch } from "@/features/location/location-search"
import { InitMap } from "./initmap"
import { LocationButton } from "./location-button"
import { LocationBottomSheet } from "./location-bottom-sheet"
import { moveToCurrentLocation } from "./move-current-location"
import styled from "styled-components"

export function Location () {

    const { searchState, searchResult } = useLocationStore()

    const [open, setOpen] = useState(false)

    //map 관련 코드
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
            //searchNearbyStores(map, '동물병원')
            setMapReady(true)
        }

        mapload()

        return () => {
            //search 상태 초기화
            useLocationStore.getState().setSearchState(false)

            //전역 marker 비우기
            useLocationStore.getState().clearMarkers()
        }

    },[])

    useEffect(()=>{
        setOpen(searchState)
    },[searchState])


    return (
        <>
        <MapArea ref={mapRef} />
        <LocationSearch map={locationRef.current}/>
        {searchResult &&

        <button className="fixed bottom-40 z-30 border-2"
        onClick={()=>{
            useLocationStore.getState().setSearchState(true)
        }}
        >다시보기</button>
        }
        {mapReady &&
            <LocationButton map={locationRef.current} />
        }
        <BottomSheet open={open} onClose={()=>{
            useLocationStore.getState().setSearchState(false)
        }}>
            <LocationBottomSheet map={locationRef.current}/>
        </BottomSheet>
        </>
    )
}

const MapArea = styled.div`
    width: 100%;
    height: 100%;
`