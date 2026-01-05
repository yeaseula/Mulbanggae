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
        seetRef,
        sheetRef,
        ScrollRef,
        handleRef,
        sheet,
        sheetLength,
        MAXHEIGHT,
        isDrag,
        ContentRef,
        pointerDown, pointerMove, pointerUp, initialize
    } = useBottomSheetDrag()

    const targetLength = MAXHEIGHT[sheetLength.current][seetRef.current]

    useEffect(()=>{
        if(!open) return
        const onKeyDown = (e:KeyboardEvent) => {
            if (e.key === 'Escape') {
                //
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
        $open={open}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerLeave={pointerUp}
        onPointerCancel={pointerUp}
        >
        <InnerContainer ref={ScrollRef} $isdrag={isDrag} $height={targetLength}>
            <Handle
                ref={handleRef}
            />
            <Content ref={ContentRef}>{children}</Content>
        </InnerContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div<{$open:boolean}>`
    max-width: 390px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 30;
    touch-action: none;
    user-select: none;
    transform: ${(p)=>p.$open ? 'translateY(0)' : 'translateY(100%)'};
    transition: transform 0.25s ease-in-out;
    will-change: transform;
    opacity: ${(p)=>p.$open ? 1 : 0};
`

const InnerContainer = styled.div<{ $height: number, $isdrag: boolean}>`
    background-color: #fff;
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
    border-radius: 16px 16px 0 0;
    overflow-y: auto;
    //max-height: ${(p)=>p.$height};
    max-height: var(--drag-height, ${(p)=>p.$height}px);
    background: white;
    transform: translateY(var(--drag-y, 0px));
    transition: ${(p)=>p.$isdrag ? 'none' : 'max-height 0.35s '};
    //transition: all 0.6s;
    //transition :   transform 0.25s cubic-bezier(.2,.8,.2,1),
  max-height 0.25s cubic-bezier(.2,.8,.2,1);
    will-change: transform,max-height;
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
    background: #fff;
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