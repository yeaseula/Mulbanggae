import { countReset } from 'console'
import React, { useRef, useState, useEffect } from 'react'

interface Props {
    onClose: () => void
    open: boolean
    threshold?: number
}

type SheetState = 'hidden' | 'default' | 'expanded'
type DragState = 'sheet' | 'content' | null
type DragSource = 'handle' | 'content' | null

export function useBottomSheetDrag({ onClose, open, threshold = 150 }: Props) {

    const sheetRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const handleRef = useRef<HTMLDivElement>(null)
    // === 초기화 값이 존재 ===
    const [sheet,setSheet] = useState<SheetState>('default')
    const startRef = useRef(0)
    const isClickRef = useRef(false)
    const dragModeRef = useRef<DragState>(null)
    const dragsourceRef = useRef<DragSource>(null)
    const [isDrag,setIsDrag] = useState(false)

    useEffect(()=>{
        setSheet('default')
        startRef.current = 0
        isClickRef.current = false
        dragModeRef.current = null
        dragsourceRef.current = null
        setIsDrag(false)
    },[open])

    const pointerDown = (e:React.PointerEvent) => {

        startRef.current = e.clientY
        isClickRef.current = true
        dragModeRef.current = null

        contentRef.current!.classList.remove('slideup')
        contentRef.current!.classList.remove('slidedown')

        setIsDrag(false)

        const clickTarget = e.target as Node

        if(handleRef.current?.contains(clickTarget)) { //click 시작점 판별
            dragsourceRef.current = 'handle'
        } else if (contentRef.current?.contains(clickTarget)) {
            dragsourceRef.current = 'content'
        } else {
            dragsourceRef.current = null
        }

    }

    const pointerMove = (e:React.PointerEvent) => {

        if(!isClickRef.current) return
        e.currentTarget.setPointerCapture(e.pointerId)
        const moveDistance = e.clientY - startRef.current;
        //moveDistance > 0 아래로 내림
        const DragSheet = contentRef.current!.scrollTop === 0 //스크롤이 맨 위?

        //dragmod ? 시작점이 handle인가? -> sheet
        //시작점이 content인가? -> 다른 조건 분기

        //default
        //scroll 맨 위일때
        //아래로 내리면 hidden으로 ->'sheet'
        //위로 올리면 스크롤 -> 'content'
        //scroll 중간일때 -> 계속 스크롤상태 -> 'content'
        //scroll 아래일때 -> 계속 스크롤상태 => 'content'

        //expanded
        //scroll 맨 위일때
        //아래로 내리면 default로
        //위로 올리면 스크롤

        //hidden
        //scroll 상관없이
        //위로 올리면 default
        //아래로 내리면 변화없음
        if(Math.abs(moveDistance) <= 15) return // 드래그 중인가?

        //console.log('----드래그중 통과')
        setIsDrag(true)

        if(!dragModeRef.current) {
            if(dragsourceRef.current === 'handle') {
                dragModeRef.current = 'sheet'

            } else if(dragsourceRef.current === 'content'){

                if(DragSheet && moveDistance > 0) {
                    dragModeRef.current = 'sheet'
                } else {
                    dragModeRef.current = 'content'
                }
            }
        }

        if(dragModeRef.current === 'sheet') {
            if(sheet === 'expanded' && moveDistance < -95 ) return

            sheetRef.current!.style.transform = `translateY(${moveDistance}px)`
            contentRef.current!.style.overflowY = 'initial'

        }
    }

    const pointerUp = (e:React.PointerEvent) => {

        if(!isClickRef.current) return
        isClickRef.current = false

        if(dragModeRef.current !== 'sheet') return

        contentRef.current!.style.overflowY = 'auto'

        const moveDistance = e.clientY - startRef.current;

        handleTranslate(moveDistance)
    }

    const handleTranslate = (moveDistance:number) => {

        if(moveDistance < -120) {
            let result:SheetState = 'default'

            //위로 당김
            //hidden
            if(sheet === 'hidden') result = 'default'
            //default
            if(sheet === 'default') result = 'expanded'
            //expand
            if(sheet === 'expanded') result = 'expanded'

            setSheet(result)
            sheetRef.current!.style.transform = `translateY(0)`
            requestAnimationFrame(() => {
                contentRef.current!.classList.add('slideup')
            })
        }
        if(moveDistance > 120) {

            let result:SheetState = 'default'

            //아래로 당김
            //hidden
            if(sheet === 'hidden') result = 'hidden'
            //default
            if(sheet === 'default') result = 'hidden'
            //expand
            if(sheet === 'expanded') result = 'default'

            setSheet(result)
            sheetRef.current!.style.transform = `translateY(0)`
            requestAnimationFrame(() => {
                contentRef.current!.classList.add('slidedown')
            })
        }
        if(moveDistance >= -120 && moveDistance <= 120) {
            setSheet(prev=>prev)
            sheetRef.current!.style.transform = `translateY(0)`
        }
    }

    return {
        sheetRef,
        contentRef,
        handleRef,
        sheet,
        isDrag,
        pointerDown, pointerMove, pointerUp
    }
}
