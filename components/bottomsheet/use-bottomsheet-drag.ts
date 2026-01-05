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

    const [MAXHEIGHT, setMaxHeight] = useState({
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

    //sheet 내용물에 따라 달라짐
    //초기 마운트 이후 고정
    //데이터값 변경 시 재판별
    const searchResult = useLocationStore(state=>state.searchResult)

    useEffect(()=>{

        ContentLengthRef.current = ContentRef.current!.offsetHeight

        if(ScrollRef.current!.offsetHeight >= ContentRef.current!.offsetHeight) {
            sheetLength.current = 'short'
        } else {
            sheetLength.current = 'long'
        }
        // console.log(ScrollRef.current!.offsetHeight + ' : 래퍼 길이')
        // console.log(ContentLengthRef.current + ': 콘텐츠 길이')
        // console.log('----🚀🚀🚀🚀🚀')

        setMaxHeight({
            short: {
                hidden: 33,
                default: ContentLengthRef.current + 33,
                expanded: ContentLengthRef.current + 33
            },
            long: {
                hidden: 33,
                default: window.innerHeight * 0.3 + 33,
                expanded: window.innerHeight * 0.8 - 44
            }
        })
        //검색값이 바뀌면 무조건 default 높이로
        ScrollRef.current!.style.setProperty('--drag-height', `${MAXHEIGHT[sheetLength.current].default}px`)

    },[searchResult])

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

    const initialize = () => {
        seetRef.current = 'default'
        ScrollRef.current!.style.setProperty('--drag-height', `${MAXHEIGHT[sheetLength.current].default}px`)
        startRef.current = 0
        isClickRef.current = false
        dragModeRef.current = null
        dragsourceRef.current = null
    }

    const pointerDown = (e:React.PointerEvent) => {
        startRef.current = e.clientY //
        startHeightRef.current = ScrollRef.current!.getBoundingClientRect().height
        isClickRef.current = true
        dragModeRef.current = null //
        //console.log(isClickRef + ': 클릭상태인가? 🚀🚀🚀🚀🚀🚀')
        setIsDrag(true) //🚀

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

        //console.log(isClickRef.current + ': 클릭상태 🚫🚫🚫')
        if(!isClickRef.current) return
        e.currentTarget.setPointerCapture(e.pointerId)
        const moveDistance = e.clientY - startRef.current;
        const DragSheet = ScrollRef.current!.scrollTop === 0 //스크롤이 맨 위?
        const startHeight = startHeightRef.current
        const nextHeight = clamp (
            startHeight - moveDistance, // 500px에 위로 10이라면 510px
            MAXHEIGHT[sheetLength.current].hidden, // 33px
            MAXHEIGHT[sheetLength.current].expanded // 80vh + 33px ex)800px
        ) // 33px ~800px 내에선 실제 움직인만큼, 33px아래에선 33px 800px위에선 800px 선택

        //console.log(Math.abs(moveDistance) + ': 드래그중인가? 😇😇😇')
        if(Math.abs(moveDistance) <= 10) return // 드래그 중인가?

        //console.log('----드래그중 통과')
        //console.log(isClickRef.current + ': 움직이고있는데 클릭중? 🔜🔜🔜')
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

        if(dragModeRef.current === 'sheet') {
            if(startHeight - moveDistance > MAXHEIGHT[sheetLength.current].expanded) return
            //지금 높이가 현재 상황의 최대값보다 크면 리턴
            if(startHeight - moveDistance < MAXHEIGHT[sheetLength.current].hidden) return
            //지금 높이가 현재 상황의 최소값보다 작으면 리턴

            //console.log(startHeight + ':지금높이????????')
            //console.log(startHeight - moveDistance + ':🚀🚀🚀🚀')
            //console.log(MAXHEIGHT[sheetLength.current].expanded + ':최대높이 🐠🐠🐠')
            //console.log( MAXHEIGHT[sheetLength.current].hidden + ': 최소높이 ⚡⚡⚡')

            // if(sheetLength.current === 'short'
            //     && sheet === 'default'
            //     && moveDistance < -15) return
            // if(sheetLength.current === 'short'
            //     && sheet === 'hidden'
            //     && moveDistance < -100
            // ) return

            //const startHeight = MAXHEIGHT[sheetLength.current][sheet]
            //ScrollRef.current!.style.setProperty('--drag-y',`${moveDistance}px`)
            //transform은 실제 움직인만큼
            ScrollRef.current!.style.setProperty('--drag-height', `${startHeight - moveDistance}px`)
            ScrollRef.current!.style.overflowY = 'initial'
        }
    }

    const pointerUp = (e:React.PointerEvent) => {

        if(!isClickRef.current) return
        isClickRef.current = false //클릭 여부 확인 해제
        //console.log(isClickRef.current + ': 마우스 해제인데 클릭상태? 🩷🩷🩷')

        if(!isDrag) return
        setIsDrag(false) // 드래그중인지 여부 확인 해제

        if(dragModeRef.current !== 'sheet') return //시트모드가 아니라면 움직이지않음

        const currentHeight =  ScrollRef.current!.getBoundingClientRect().height

        // //ScrollRef.current!.style.setProperty('--drag-y',`0px`)
        ScrollRef.current!.style.setProperty('--drag-height',`${currentHeight}px`)
        //마우스 놓은 시점의 높이에서 시작

        ScrollRef.current!.style.overflowY = 'auto'

        const moveDistance = e.clientY - startRef.current;

        handleTranslate(moveDistance)
    }

    const handleTranslate = (moveDistance:number) => {

        const currentHeight = ScrollRef.current!.getBoundingClientRect().height

        const hiddenH = MAXHEIGHT[sheetLength.current].hidden
        const defaultH = MAXHEIGHT[sheetLength.current].default
        const expandedH = MAXHEIGHT[sheetLength.current].expanded

        //console.log(moveDistance + ':해제 후 움직인 거리 계산 😭😭')

        //console.log(moveDistance + ': 얼마나 움직였는지')
            //console.log(currentHeight + ': g현재높이ㅣㅣㅣㅣ')
            //console.log((defaultH + hiddenH) / 2 + ': 최소값과 중간의 평균 😄')
            // let result:SheetState = 'default'

            if(currentHeight >= (defaultH + expandedH) / 2) {
                setSheet('expanded')
                seetRef.current = 'expanded'
            } else if(currentHeight >= (defaultH + hiddenH) / 2) {
                setSheet('default')
                seetRef.current = 'default'
            } else {
                setSheet('hidden')
                seetRef.current = 'hidden'
            }

            const nextHeight = MAXHEIGHT[sheetLength.current][seetRef.current]

            requestAnimationFrame(()=>{
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
        MAXHEIGHT,
        sheet,
        isDrag,
        pointerDown, pointerMove, pointerUp, initialize
    }
}
