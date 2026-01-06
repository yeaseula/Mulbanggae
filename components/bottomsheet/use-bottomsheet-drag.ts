'use client'

import { useLocationStore } from '@/store/locationstore'
import React, { useRef, useState, useEffect } from 'react'


type SheetState = 'hidden' | 'default' | 'expanded'
type DragState = 'sheet' | 'content' | null
type DragSource = 'handle' | 'content' | null
type SheetLength = 'short' | 'long'

export function useBottomSheetDrag() {

    const sheetRef = useRef<HTMLDivElement>(null)
    const ScrollRef = useRef<HTMLDivElement>(null)
    const handleRef = useRef<HTMLDivElement>(null)
    const ContentRef = useRef<HTMLDivElement>(null)

    // === 초기화 값이 존재 ===
    const [sheet,setSheet] = useState<SheetState>('default')
    const seetRef = useRef<SheetState>('default')
    const startRef = useRef(0)
    const startHeightRef = useRef(0)
    const isClickRef = useRef(false)
    const dragModeRef = useRef<DragState>(null)
    const dragsourceRef = useRef<DragSource>(null)
    const sheetLength = useRef<SheetLength>('short') // sheet 내용물의 길이에 따라
    const [isDrag,setIsDrag] = useState(false)
    const ContentLengthRef = useRef<number>(0)
    const MAXHEIGHTRef = useRef({
        short: {
            hidden: 33,
            default: ContentLengthRef.current + 33,
            expanded: 0
        },
        long: {
            hidden: 33,
            default: 33,
            expanded: 0
        }
    })

    const searchResult = useLocationStore(state=>state.searchResult)

    useEffect(()=>{
        if(!ContentRef.current || !ScrollRef.current) return
            ScrollRef.current!.style.setProperty('--drag-height', `${window.innerHeight * 0.5 + 90}px`)
            ContentLengthRef.current = ContentRef.current!.offsetHeight

            if(ScrollRef.current!.offsetHeight - 33 >= ContentRef.current!.offsetHeight) {
                sheetLength.current = 'short'
            } else {
                sheetLength.current = 'long'
            }

            MAXHEIGHTRef.current = {
                short: {
                    hidden: 31,
                    default: ContentLengthRef.current + 33,
                    expanded: ContentLengthRef.current + 33
                },
                long: {
                    hidden: 31,
                    default: window.innerHeight * 0.4 + 33,
                    expanded: window.innerHeight - 44
                }
            }
            //검색값이 바뀌면 무조건 default 높이로
            ScrollRef.current!.style.setProperty('--drag-height', `${MAXHEIGHTRef.current[sheetLength.current].default}px`)

    },[searchResult])


    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

    const initialize = () => {
        seetRef.current = 'default'
        ScrollRef.current!.style.setProperty('--drag-height', `${MAXHEIGHTRef.current[sheetLength.current].default}px`)
        startRef.current = 0
        isClickRef.current = false
        dragModeRef.current = null
        dragsourceRef.current = null
    }

    const pointerDown = (e:React.PointerEvent) => {

        ScrollRef.current?.classList?.remove('mouseup')
        startRef.current = e.clientY
        //
        const ScrollRefHeight = ScrollRef.current!.getBoundingClientRect().y
        startHeightRef.current = window.innerHeight - ScrollRefHeight
        //시작 시 높이 저장

        isClickRef.current = true
        dragModeRef.current = null
        setIsDrag(true)

        const clickTarget = e.target as Node

        if(handleRef.current?.contains(clickTarget)) { //click 시작점 판별
            dragsourceRef.current = 'handle'
        } else if (ScrollRef.current?.contains(clickTarget)) {
            dragsourceRef.current = 'content'
        } else {
            dragsourceRef.current = null
        }
    }

    const pointerMove = (e:React.PointerEvent) => {

        if(!isClickRef.current) return
        e.currentTarget.setPointerCapture(e.pointerId)
        const moveDistance = e.clientY - startRef.current;
        const DragSheet = ScrollRef.current!.scrollTop === 0 //스크롤이 맨 위?

        if(Math.abs(moveDistance) <= 10) return // 드래그 중인가?
        setIsDrag(true)

        if(!dragModeRef.current) {
            if(dragsourceRef.current === 'handle') {
                dragModeRef.current = 'sheet' //handle을 잡으면 무조건 움직이도록

            } else if(dragsourceRef.current === 'content'){
                //content를 잡으면 scrolltop 위치에 따라 움직이도록
                if(DragSheet && moveDistance > 0) {
                    dragModeRef.current = 'sheet'
                } else {
                    dragModeRef.current = 'content'
                }
            }
        }

        //현재높이 = 시작높이 - 이동거리만큼
        const currentHeight = startHeightRef.current - moveDistance
        const maxheight = MAXHEIGHTRef.current[sheetLength.current].expanded
        const minheight = MAXHEIGHTRef.current[sheetLength.current].hidden

        //const viewHeight = window.innerHeight - ScrollRef.current!.getBoundingClientRect().y //눈에 보여지는 높이

        if(dragModeRef.current === 'sheet') {
            if(Math.round(currentHeight) > maxheight) return
            //지금 높이가 현재 상황의 최대값보다 크면 리턴
            if(Math.round(currentHeight) < minheight) return
            //지금 높이가 현재 상황의 최소값보다 작으면 리턴

            ScrollRef.current!.style.overflowY = 'initial'

            ScrollRef.current!.style.setProperty('--drag-y', `${moveDistance}px`)
        }
    }

    const pointerUp = (e:React.PointerEvent) => {

        if(!isClickRef.current) return
        isClickRef.current = false //클릭 여부 확인 해제

        if(!isDrag) return
        setIsDrag(false) // 드래그중인지 여부 확인 해제

        if(dragModeRef.current !== 'sheet') return //시트모드가 아니라면 움직이지않음

        const ScrollRefHeight =  ScrollRef.current!.getBoundingClientRect().y
        const viewHeight = window.innerHeight - ScrollRefHeight

        //console.log(viewHeight + ': 현재 스크롤영역의 높이')
        ScrollRef.current!.style.setProperty('--drag-y','0px')
        ScrollRef.current!.style.overflowY = 'auto'
        ScrollRef.current!.style.setProperty('--drag-height',`${viewHeight}px`)
        //마우스 놓은 시점의 높이에서 시작
        ScrollRef.current!.style.setProperty('--startH', `${viewHeight}px`)
        handleTranslate(viewHeight)
    }

    const handleTranslate = (height:number) => {
        const hiddenH = MAXHEIGHTRef.current[sheetLength.current].hidden
        const defaultH = MAXHEIGHTRef.current[sheetLength.current].default
        const expandedH = MAXHEIGHTRef.current[sheetLength.current].expanded

        if(height >= (defaultH + expandedH) / 2) {
            seetRef.current = 'expanded'
        } else if(height >= (defaultH + hiddenH) / 2) {
            seetRef.current = 'default'
        } else {
            seetRef.current = 'hidden'
        }

        const nextHeight = MAXHEIGHTRef.current[sheetLength.current][seetRef.current]
        ScrollRef.current!.style.setProperty('--endH', `${nextHeight}px`)
        requestAnimationFrame(()=>{

            ScrollRef.current?.classList.add('mouseup')
            ScrollRef.current!.style.setProperty('--drag-height', `${nextHeight}px`)
        })
    }

    return {
        seetRef,
        sheetRef,
        ScrollRef,
        handleRef,
        ContentRef,
        sheetLength,
        MAXHEIGHTRef,
        sheet,
        isDrag,
        pointerDown, pointerMove, pointerUp, initialize
    }
}
