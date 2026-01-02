"use client"
import styled from "styled-components"
import { RiCrosshairLine } from "@remixicon/react"

export function LocationButton() {
    return <FloatingButton>
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