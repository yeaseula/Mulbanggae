"use client"
import styled from "styled-components"

export function LocationSearch() {
    return <FloatingSearch>검색창</FloatingSearch>
}

const FloatingSearch = styled.div`
    position: absolute;
    top: 58px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 21;
`