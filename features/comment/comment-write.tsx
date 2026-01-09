"use client"

import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { CommonWrapper } from "@/styled/layout.styled"
import { RiSendInsLine } from "@remixicon/react"

export function CommentWrite({mentionuser}:{mentionuser:string | null}) {
    const TextRef = useRef<HTMLDivElement | null>(null)
    const SendRef = useRef<HTMLButtonElement | null>(null)

    const [sendReady,setSendReady] = useState(false)
    const [mentionUser,setMentionUser] = useState<string | null>(null)
    const [content, setContent] = useState('')

    useEffect(() => {
        if (mentionuser !== null && mentionuser !== mentionUser) {
            setMentionUser(mentionuser)
            setContent('')
        }
    }, [mentionuser])

    useEffect(() => {
        if (TextRef.current && mentionUser) {
        TextRef.current.innerHTML = `<span class="mention text-(--main_color) pr-2" contenteditable="false">@${mentionUser}</span> `;
        }
         // 포커스 및 커서 이동
        setTimeout(() => {
            if (TextRef.current) {
            TextRef.current.focus();
            const mentionSpan = TextRef.current.querySelector('.mention');
                if (mentionSpan && mentionSpan.nextSibling) {
                    const range = document.createRange()
                    const sel = window.getSelection()
                    range.setStart(mentionSpan.nextSibling, 0)
                    range.collapse(true)
                    sel?.removeAllRanges()
                    sel?.addRange(range)
                }
            }
        }, 0);
    }, [mentionUser])

    useEffect(() => {
        setSendReady(content.trim().length > 0 || mentionUser !== null)
    }, [content, mentionUser])


    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const mentionSpan = e.currentTarget.querySelector('.mention')

        if (mentionUser && !mentionSpan) {
            // 멘션이 삭제됨
            setMentionUser(null)
            setContent(e.currentTarget.textContent || '')
            return
        }

        if (mentionUser && mentionSpan) {
            // 멘션 뒤의 텍스트만 추출
            const allText = e.currentTarget.textContent || ''
            const mentionText = mentionSpan.textContent || ''
            const afterMention = allText.substring(mentionText.length)
            setContent(afterMention)
        } else {
            setContent(e.currentTarget.textContent || '')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {

        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
            return
        }

        if (!mentionUser) return

        const selection = window.getSelection()
        const mentionSpan = TextRef.current?.querySelector('.mention')

        if (!mentionSpan || !selection) return

        const isInMention = mentionSpan.contains(selection.anchorNode)
        const isBeforeMention = selection.anchorNode === TextRef.current && selection.anchorOffset === 0;

        // Backspace: 멘션 영역에서 백스페이스 시 전체 삭제
        if (e.key === 'Backspace') {
            if (isInMention || isBeforeMention) {
                e.preventDefault()
                setMentionUser(null)
                setContent('')
                if (TextRef.current) TextRef.current.innerHTML = ''
                return
            }

            // 멘션 바로 다음 위치에서 백스페이스
            if (selection.anchorNode === mentionSpan.nextSibling && selection.anchorOffset === 0) {
                e.preventDefault()
                setMentionUser(null)
                setContent('')
                if (TextRef.current) TextRef.current.innerHTML = ''
                return
            }
        }

        // Delete: 멘션 전에서 Delete 누르면 전체 삭제
        if (e.key === 'Delete' && (isInMention || isBeforeMention)) {
            e.preventDefault()
            setMentionUser(null)
            setContent('')
            if (TextRef.current) TextRef.current.innerHTML = ''
            return
        }

        // 왼쪽 화살표: 멘션 영역 진입 방지
        if (e.key === 'ArrowLeft') {
            if (selection.anchorNode === mentionSpan.nextSibling && selection.anchorOffset === 0) {
                e.preventDefault()
                return
            }
        }

        // Home 키: 멘션 다음으로 이동
        if (e.key === 'Home') {
            e.preventDefault()
            const range = document.createRange()
            const sel = window.getSelection()

            if (mentionSpan.nextSibling && sel) {
                range.setStart(mentionSpan.nextSibling, 0)
                range.collapse(true)
                sel.removeAllRanges()
                sel.addRange(range)
            }
            return
        }
    }

    const handleSend = () => {
        console.log('보내기')
    }

    return (
        <>
            <CommentWriteContainer className="fixed bottom-0 z-1000 py-5">
                {mentionUser && (
                    <></>
                )}
                <CommonWrapper className="profile flex items-center gap-4 w-full">
                    <TextContainer>
                        <Text
                        ref={TextRef}
                        contentEditable
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        />
                        </TextContainer>
                    <button
                    ref={SendRef}
                    disabled={!sendReady}
                    onClick={handleSend}
                    className="text-[1.4rem] w-14 h-14 flex justify-center items-center rounded-full bg-gray-100">
                        <RiSendInsLine size={16}
                        style={{ color : sendReady ? 'var(--main_color)' : 'var(--gray_medium_color)' }}/>
                    </button>
                </CommonWrapper>
                <p className="mt-3 pl-5.5 text-sm text-gray-600">Enter: 전송, Shift+Enter: 줄바꿈</p>
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
    background: #fff;
    border-top: 1px solid var(--gray_light_color);
`
const TextContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`
const Text = styled.div`
    flex: 1;
    padding: 8px 9px;
    min-height: 37px;
    max-height: 100px;
    overflow-y: scroll;
    border-radius: 5px;
    border: 1px solid var(--gray_medium_color);
    font-size: 1.4rem;
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
