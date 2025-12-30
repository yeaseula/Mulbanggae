"use client"
import styled from "styled-components"

export function LocationButton() {
    return <FloatingButton>버튼</FloatingButton>
}

const FloatingButton = styled.div`
    position: absolute;
    right: 16px;
    bottom: 76px;
    z-index: 21;
`