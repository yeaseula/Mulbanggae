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
        contentRef,
        handleRef,
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
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerLeave={pointerUp}
        onPointerCancel={pointerUp}
        >
        <Handle
            ref={handleRef}
            // onPointerDown={pointerDown}
            // onPointerMove={pointerMove}
            // onPointerUp={pointerUp}
        />
        <InnerContainer ref={contentRef} $state={sheet}>
            <Content >{children}</Content>
        </InnerContainer>
        </Wrapper>
    )
}

const H = {
    hidden: '1px',
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
    transform: ${(p)=>p.$open ? 'translateY(0)' : 'translateY(100%)'};
    will-change: transform;
    background-color: #fff;
    opacity: ${(p)=>p.$open ? 1 : 0};
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
`
const InnerContainer = styled.div<{$state:SheetState}>`
    overflow-y: auto;
    max-height: ${(p)=>H[p.$state]};
    transition: height 0.4s linear;
    background: white;
    &::-webkit-scrollbar {
        width: 2px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 2px;
    }
`

const Handle = styled.div`
    width: 100%;
    height: 33px;
    cursor: pointer;
    touch-action: none;
    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 14px;
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