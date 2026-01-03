"use client"
import { ReactNode, useEffect } from "react"
import { useBottomSheetDrag } from "./use-bottomsheet-drag"
import styled from "styled-components"

type BottomSheetProps = {
    open: boolean
    onClose: ()=>void
    children: ReactNode
}

type SheetState = 'hidden' | 'default' | 'expanded'

export function BottomSheet({open,onClose,children}:BottomSheetProps){

    const {
        sheetRef,
        scrollRef,
        sheet,
        pointerDown, pointerMove, pointerUp
    } = useBottomSheetDrag({onClose, open})

    useEffect(()=>{
        if(!open) return
        const onKeyDown = (e:KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown',onKeyDown)
        }
    },[open,onClose])

    return (
        <Wrapper
        ref={sheetRef}
        $state={sheet}
        $open={open}
        onPointerUp={pointerUp}
        >
        <Handle
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={pointerUp}
        />
        <InnerContainer ref={scrollRef} $state={sheet}>
            <Content >{children}</Content>
        </InnerContainer>
        </Wrapper>
    )
}
const Y = {
    hidden: '0',
    default: '0',
    expanded: '0'
}

const H = {
    hidden: '0vh',
    default: '40vh',
    expanded: '80vh'
}

const Wrapper = styled.div<{$open:boolean, $state:SheetState}>`
    max-width: 390px;
    width: 100%;
    position: fixed;
    bottom: 0;
    border-radius: 16px 16px 0 0;
    z-index: 30;
    touch-action: none;
    will-change: transform;
    transform: ${(p)=>p.$open ? 'translateY(0)' : 'translateY(100%)'};

    background-color: #fff;
    opacity: ${(p)=>p.$open ? 1 : 0}
`
const InnerContainer = styled.div<{$state:SheetState}>`
    overflow-y: auto;
    max-height: ${(p)=>H[p.$state]};
    transition: height 0.3s ease;
    background: white;
`

const Handle = styled.div`
    width: 100%;
    height: 25px;
    cursor: pointer;
    touch-action: none;
    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translate(-50%);
        width: 36px;
        height: 3px;
        background: var(--gray_semidark_color);
        border-radius: 999px;
    }
`

const Content = styled.div`
    padding-bottom: 50px;
    background: white;
`