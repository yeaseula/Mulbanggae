import { useRef, useState, useEffect } from 'react'

interface Props {
    onClose: () => void
    threshold?: number
}

export function useBottomSheetDrag({ onClose, threshold = 120 }: Props) {

    const sheetRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startY, setStartY] = useState(0)
    const [currentY, setCurrentY]= useState(0)

    const handleDragStart = (clientY: number) => {
        setIsDragging(true);
        setStartY(clientY);
        setCurrentY(clientY);
    };

    const handleDragging = (clientY : number) => {
        if(!isDragging) return

        const deffY = clientY - startY
        if(deffY > 0) {
            setCurrentY(clientY)
        }
    }

    const handleDragEnd = () => {
        if(!isDragging) return

        const deffY = currentY - startY;
        if(deffY > threshold) {
            onClose()
        } else {
            setCurrentY(0)
        }

        setIsDragging(false)
        setStartY(0)
        setCurrentY(0)
    }

    // 마우스 이벤트
    const handleMouseDown = (e: React.MouseEvent) => {
        handleDragStart(e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        handleDragging(e.clientY);
    };

    const handleMouseUp = () => {
        handleDragEnd();
    };

    // 터치 이벤트
    const handleTouchStart = (e: React.TouchEvent) => {
        handleDragStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        handleDragging(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        handleDragEnd();
    };

    useEffect(() => {
        if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isDragging, startY, currentY]);
    return {
        sheetRef,
        currentY,
        handleMouseDown,
        handleTouchStart
    }
}
