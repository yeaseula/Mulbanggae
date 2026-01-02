"use client"
import { ReactNode, useEffect } from "react"
import { useBottomSheetDrag } from "./use-bottomsheet-drag"
import styled from "styled-components"

type BottomSheetProps = {
    open: boolean
    onClose: ()=>void
    children: ReactNode
}

export function BottomSheet({open,onClose,children}:BottomSheetProps){

    const {
        sheetRef,
        currentY,
        handleMouseDown,
        handleTouchStart
    } = useBottomSheetDrag({onClose})

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
        data-open={open}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        $translateY={currentY}
        >
        <Handle />
        <Content>{children}</Content>
        </Wrapper>
    )
}

const Wrapper = styled.div<{$translateY:number}>`
    max-width: 390px;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 40%;
    background: white;
    border-radius: 16px 16px 0 0;
    z-index: 30;
    touch-action: none;
    transform: translateY(100%);
    transition: transform 0.5s;
    &[data-open='true'] {
        transform: translateY(${(p)=>p.$translateY});
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
    padding-bottom: 15px;
`