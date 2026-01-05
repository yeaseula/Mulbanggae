"use client"
import { useEffect } from "react"
import { useTransformStore, useLocationStore } from "@/store/locationstore"
import styled from "styled-components"
import { RiCrosshairLine } from "@remixicon/react"
import { moveToCurrentLocation } from "./move-current-location"

export function LocationButton({map}:{map : kakao.maps.Map | null}) {

    const searchResult = useLocationStore(state=>state.searchResult)

    useEffect(()=>{
        const height = !!searchResult ? -195 : 0
        useTransformStore.getState().setTransform(height)
    },[searchResult])

    if(!map) return null

    //초기값 0
    //바텀시트의 존재 유무에 따라 변화
    //drag할때 transform 추적 변화
    //마우스 놓을때 sheet 값에 따라 고정값 변화 (hidden / default)

    //transform table
    //bottm shett 유-> -195 // 무-> 0
    //store 추적
    //hidden ->0 / default -> -195

    const transformState = useTransformStore(state=>state.transformState)

    const handleClick = async () => {
        try {
            await moveToCurrentLocation(map)
        } catch {
            alert('위치정보를 가져올 수 없습니다.')
        }
    }
    return <FloatingButton onClick={handleClick} $position={transformState}>
        <RiCrosshairLine size={24} /></FloatingButton>
}

const FloatingButton = styled.button<{$position:number}>`
    position: fixed;
    width: 42px;
    height: 42px;
    background-color: #fff;
    border-radius: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    // right: 16px;
    bottom: 100px;
    transform: ${(p)=> `translateY(calc(${p.$position}px))`};
    z-index: 21;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    cursor: pointer;
`