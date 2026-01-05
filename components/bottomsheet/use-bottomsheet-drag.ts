import { useLocationStore } from '@/store/locationstore'
import { countReset } from 'console'
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
    const startRef = useRef(0)
    const isClickRef = useRef(false)
    const dragModeRef = useRef<DragState>(null)
    const dragsourceRef = useRef<DragSource>(null)
    const sheetLength = useRef<SheetLength>('short') // sheet 내용물의 길이에 따라
    const [isDrag,setIsDrag] = useState(false)
    const ContentLengthRef = useRef<number>(0)

    const MAXHEIGHT = {
        short: {
            hidden: '1px',
            default: `${ContentLengthRef.current}px`,
            expanded: ''
        },
        long: {
            hidden: '1px',
            default: '30vh',
            expanded: 'calc(100vh - 40px)'
        }
    }
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

    },[searchResult])

    const initialize = () => {
        setSheet('default')
        startRef.current = 0
        isClickRef.current = false
        dragModeRef.current = null
        dragsourceRef.current = null
        sheetLength.current = 'long'
        setIsDrag(false)
        sheetRef.current!.style.transform = ``
    }

    const pointerDown = (e:React.PointerEvent) => {

        startRef.current = e.clientY
        isClickRef.current = true
        dragModeRef.current = null

        ScrollRef.current!.classList.remove('slideup')
        ScrollRef.current!.classList.remove('slidedown')

        setIsDrag(false)

        const clickTarget = e.target as Node

        if(handleRef.current?.contains(clickTarget)) { //click 시작점 판별
            dragsourceRef.current = 'handle'
        } else if (ScrollRef.current?.contains(clickTarget)) {
            dragsourceRef.current = 'content'
        } else {
            dragsourceRef.current = null
        }
        //location에서 사용되는지, 일반모드로 사용되는지
        //location에서 contents 내용이 스크롤되지않을때
    }

    const pointerMove = (e:React.PointerEvent) => {

        if(!isClickRef.current) return
        e.currentTarget.setPointerCapture(e.pointerId)
        const moveDistance = e.clientY - startRef.current;
        //moveDistance > 0 아래로 내림

        //sheet location ? default 조건분기
        // default 단순 close open기능만 가능

        //location 시트 길이에 따라 dragup 가능,불가능

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

        console.log(sheetLength.current)

        const DragSheet = ScrollRef.current!.scrollTop === 0 //스크롤이 맨 위?

        if(Math.abs(moveDistance) <= 15) return // 드래그 중인가?

        //console.log('----드래그중 통과')
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
            if(sheet === 'expanded' && moveDistance < -15 ) return
            if(sheetLength.current === 'short'
                && sheet === 'default'
                && moveDistance < -15) return
            if(sheetLength.current === 'short'
                && sheet === 'hidden'
                && moveDistance < -180
            ) return
            sheetRef.current!.style.transform = `translateY(${moveDistance}px)`
            ScrollRef.current!.style.overflowY = 'initial'
        }

    }

    const pointerUp = (e:React.PointerEvent) => {

        if(!isClickRef.current) return
        isClickRef.current = false

        if(dragModeRef.current !== 'sheet') return

        ScrollRef.current!.style.overflowY = 'auto'

        const moveDistance = e.clientY - startRef.current;

        handleTranslate(moveDistance)
    }

    const handleTranslate = (moveDistance:number) => {

        if(moveDistance < -120) {

            let result:SheetState = 'default'

            if(sheetLength.current === 'long') {
                //위로 당김
                //hidden
                if(sheet === 'hidden') result = 'default'
                //default
                if(sheet === 'default') result = 'expanded'
                //expand
                if(sheet === 'expanded') result = 'expanded'
            } else {
                if(sheet === 'hidden') result = 'default'
            }

            setSheet(result)
            sheetRef.current!.style.transform = `translateY(0)`
            requestAnimationFrame(() => {
                ScrollRef.current!.classList.add('slideup')
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
                ScrollRef.current!.classList.add('slidedown')
            })
        }
        if(moveDistance >= -120 && moveDistance <= 120) {
            setSheet(prev=>prev)
            sheetRef.current!.style.transform = `translateY(0)`
        }
    }

    return {
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
