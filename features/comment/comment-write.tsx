"use client"

import { useRef, useState } from "react"
import styled from "styled-components"
import { CommonWrapper } from "@/styled/layout.styled"
import { RiSendInsLine } from "@remixicon/react"

export function CommentWrite() {
    const TextRef = useRef<HTMLTextAreaElement | null>(null)
    const SendRef = useRef<HTMLButtonElement | null>(null)

    const [sendReady,setSendReady] = useState(false)

    const handleResizeHeight = () => {
        if(!TextRef.current) return

        TextRef.current.style.height = 'auto';
        TextRef.current.style.height = TextRef.current.scrollHeight + 'px'

        if(TextRef.current.value !== '') {
            setSendReady(true)
        } else setSendReady(false)
    };
    return (
        <>
            <CommentWriteContainer className="fixed bottom-0 z-1000 py-5">
                <CommonWrapper className="profile flex items-center gap-4 w-full">
                    <Text
                    ref={TextRef}
                    onChange={handleResizeHeight}
                    name="contents-text"
                    id="contents-text"
                    rows={1}
                    maxLength={300} />
                    <button
                    ref={SendRef}
                    disabled={!sendReady}
                    className="text-[1.4rem] w-14 h-14 flex justify-center items-center rounded-full bg-gray-100">
                        <RiSendInsLine size={16}
                        style={{ color : sendReady ? 'var(--main_color)' : 'var(--gray_medium_color)' }}/>
                    </button>
                </CommonWrapper>
            </CommentWriteContainer>
        </>
    )
}

const CommentWriteContainer = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 1000;
    max-width: 390px;
    width: 100%;
    display: flex;
    background: #fff;
    border-top: 1px solid var(--gray_light_color);
`

const Text = styled.textarea`
    flex: 1;
    padding: 5px 9px;
    height: 37px;
    min-height: 37px;
    max-height: 100px;
    border-radius: 5px;
    border: 1px solid var(--gray_medium_color);
    &:focus-visible {
        outline: 2px solid var(--main_color)
    }
    &::-webkit-scrollbar {
        width: 1px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 2px;
    }
`
