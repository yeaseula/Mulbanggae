"use client"

import { ReactNode } from "react"
import styled from "styled-components"

type BottomSheetProps = {
    open: boolean
    children: ReactNode
}

export function BottomSheet({open, children}:BottomSheetProps){
    return (
        <Wrapper data-open={open}>
        <Handle />
        <Content>{children}</Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    max-width: 390px;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 40%;
    background: white;
    border-radius: 16px 16px 0 0;
    transform: translateY(100%);
    transition: transform 0.25s ease;
    z-index: 30;

    &[data-open='true'] {
        transform: translateY(0);
    }
`

const Handle = styled.div`
    width: 36px;
    height: 3px;
    background: var(--gray_semidark_color);
    border-radius: 999px;
    margin: 8px auto;
`

const Content = styled.div`
    height: 100%;
    overflow-y: auto;
`