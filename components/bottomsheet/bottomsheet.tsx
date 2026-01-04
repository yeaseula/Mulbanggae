"use client"
import { ReactNode, useEffect } from "react"
import { useBottomSheetDrag } from "./use-bottomsheet-drag"
import styled, {keyframes} from "styled-components"

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
        isDrag,
        pointerDown, pointerMove, pointerUp, initialize
    } = useBottomSheetDrag({onClose, open})

    useEffect(()=>{
        if(!open) return
        const onKeyDown = (e:KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
                initialize()
            }
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
        $isdrag={isDrag}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerLeave={pointerUp}
        onPointerCancel={pointerUp}
        >
        <Handle
            ref={handleRef}
        />
        <InnerContainer ref={contentRef} $state={sheet}>
            <Content >{children}</Content>
        </InnerContainer>
        </Wrapper>
    )
}

const H = {
    hidden: '1px',
    default: '30vh',
    expanded: '80vh'
}

const Wrapper = styled.div<{$open:boolean, $state:SheetState, $isdrag: boolean}>`
    max-width: 390px;
    width: 100%;
    position: fixed;
    bottom: 0;
    border-radius: 16px 16px 0 0;
    z-index: 30;
    touch-action: none;
    user-select: none;
    transform: ${(p)=>p.$open ? 'translateY(0)' : 'translateY(100%)'};
    transition: ${(p)=>p.$isdrag ? 'none' : 'transform 0.3s ease'};
    will-change: transform;
    background-color: #fff;
    opacity: ${(p)=>p.$open ? 1 : 0};
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
`
const slideUpSoft = keyframes`
    0% {
        height: var(--target-height);
    }
    80% {
        height: calc(var(--target-height) - 8px);
    }
    100% {
        height: var(--target-height);
    }
`
const slideDownSoft = keyframes`
    0% {
        height: var(--target-height);
    }
    55% {
        height: calc(var(--target-height) + 8px);
    }
    100% {
        height: var(--target-height);
    }
`

const InnerContainer = styled.div<{$state:SheetState}>`
    overflow-y: auto;
    max-height: calc(${(p)=>H[p.$state]} + 8px);
    background: white;
    &.slideup {
        --target-height : ${(p)=>H[p.$state]};
        animation: ${slideUpSoft} 0.3s ease-in-out;
    }
    &.slidedown {
        --target-height : ${(p)=>H[p.$state]};
        animation: ${slideDownSoft} 0.3s ease-in-out;
    }
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