"use client"

import styled from "styled-components"

export function Header() {
    return (
        <HeaderWrapper>header</HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
    max-width: 390px;
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
`