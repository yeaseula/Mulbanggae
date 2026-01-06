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
        sheetLength,
        MAXHEIGHTRef,
        isDrag,
        ContentRef,
        pointerDown, pointerMove, pointerUp, initialize
    } = useBottomSheetDrag()

    const targetLength = MAXHEIGHTRef.current[sheetLength.current][seetRef.current]


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
            <Content ref={ContentRef}>
                {children}
            </Content>
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

const testFrame = keyframes`
    0% {
        max-height: var(--startH);
    }
    100% {
        max-height: var(--endH);
    }
`

const InnerContainer = styled.div<{ $height: number, $isdrag: boolean}>`
    background-color: #fff;
    border-radius: 16px 16px 0 0;
    overflow-y: auto;
    max-height: var(--drag-height, 0px);
    height: auto;
    background: white;
    transform: translateY(var(--drag-y, 0px));
    //transition: ${(p)=>p.$isdrag ? 'none' : 'max-height 0.5s '};
    //transition-delay: 400ms;
    //transition: all 2s;
    will-change: transform,max-height;
    touch-action: pan-y; /* 가로 스크롤 방지 */
    -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */

    &.mouseup {
        animation: ${testFrame} 180ms linear;
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
    background: #fff;
    border-radius: 16px 16px 0 0;
    border-top: 1px solid var(--gray_semidark_color);
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
    padding-bottom: 20px;
    background: white;
`