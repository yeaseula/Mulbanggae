"use client"
import { Location } from "@/features/location/location"
import styled from "styled-components"

export default function LocationPage() {
    return (
        <Wrapper>
            <Location />
            <FloatingSearch>검색</FloatingSearch>
            <FloatingButton>버튼</FloatingButton>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: 100%;
    height: 100vh;
    position:relative;
    background: #dddddd;
`
const FloatingSearch = styled.div`
    position: absolute;
    top: 58px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 21;
`
const FloatingButton = styled.div`
    position: absolute;
    right: 16px;
    bottom: 76px;
    z-index: 21;
`