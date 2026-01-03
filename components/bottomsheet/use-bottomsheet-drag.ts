import React, { useRef, useState, useEffect } from 'react'

interface Props {
    onClose: () => void
    open: boolean
    threshold?: number
}

type SheetState = 'hidden' | 'default' | 'expanded'

export function useBottomSheetDrag({ onClose, open, threshold = 150 }: Props) {

    const sheetRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [sheet,setSheet] = useState<SheetState>('default')
    const startRef = useRef(0)
    const isClickRef = useRef(false)

    const pointerDown = (e:React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        startRef.current = e.clientY

        isClickRef.current = true
    }

    const pointerMove = (e:React.PointerEvent) => {

        if(!isClickRef.current) return

        const moveDistance = e.clientY - startRef.current;

        if(Math.abs(moveDistance) > 15) {
            sheetRef.current!.style.transform = `translateY(${moveDistance}px)`
            scrollRef.current!.style.overflowY = 'initial'
        }
    }

    const pointerUp = (e:React.PointerEvent) => {

        if(!isClickRef.current) return

        isClickRef.current = false

        scrollRef.current!.style.overflowY = 'auto'

        const moveDistance = e.clientY - startRef.current;
        handleTranslate(moveDistance)
    }

    const handleTranslate = (moveDistance:number) => {

        if(moveDistance < -120) {
            let result:SheetState = 'default'
            if(sheet === 'default') result = 'expanded'
            if(sheet === 'hidden') result = 'default'

            setSheet(result)
            sheetRef.current!.style.transform = `translateY(0)`
        }
        if(moveDistance > 120) {

            let result:SheetState = 'default'

            if(sheet === 'expanded') result = 'default'
            if(sheet === 'default') result = 'hidden'

            setSheet(result)
            sheetRef.current!.style.transform = `translateY(0)`

        }
        if(moveDistance >= -120 && moveDistance <= 120) {
            setSheet(prev=>prev)
            sheetRef.current!.style.transform = `translateY(0)`
        }
    }

    return {
        sheetRef,
        scrollRef,
        sheet,
        pointerDown, pointerMove, pointerUp
    }
}
