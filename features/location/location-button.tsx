"use client"
import styled from "styled-components"
import { RiCrosshairLine } from "@remixicon/react"
import { moveToCurrentLocation } from "./move-current-location"

export function LocationButton({map,}:{map : kakao.maps.Map}) {
    if(!map) return null

    const handleClick = async () => {
        try {
            await moveToCurrentLocation(map)
        } catch {
            alert('위치정보를 가져올 수 없습니다.')
        }
    }
    return <FloatingButton onClick={handleClick}>
        <RiCrosshairLine size={24} /></FloatingButton>
}

const FloatingButton = styled.button`
    position: absolute;
    width: 42px;
    height: 42px;
    background-color: #fff;
    border-radius: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 16px;
    bottom: 100px;
    z-index: 21;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    cursor: pointer;
`