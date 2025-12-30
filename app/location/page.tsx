"use client"
import { Location } from "@/features/location/location"
import styled from "styled-components"

export default function LocationPage() {
    return (
        <Wrapper>
            <Location />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: 100%;
    height: 100vh;
    position:relative;
    background: #dddddd;
`

