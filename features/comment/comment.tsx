"use client"

import Image from "next/image"
import { CommentWrite } from "./comment-write"
import { CommonWrapper } from "@/styled/layout.styled"
import { RiMore2Line, RiChat1Line } from "@remixicon/react"
import { useRef, useState } from "react"

export function Comment() {
    const [commentOpen,setCommentOpen] = useState(false)
    const [mentionUser,setMentionUser] = useState<string | null>(null)
    const mentionRef = useRef<string | null>(null)

    const handleComment = (e:React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget.dataset.writer
        if(!target) return
        setMentionUser(target)
    }

    return (
        <>
        <div className="profile-zone relative py-4">
            <CommonWrapper>
            <div className="profile flex gap-4.5 items-center">
                <Image src={'/images/empty-profile.svg'}
                alt=""
                width={36}
                height={36}
                />
                <span className="text-[1.3rem]">명슬</span>
            </div>
            <div className="pl-[46px]">
                <p className="text-[1.4rem]">귀엽네요</p>

                <div className="mt-4 flex gap-1.5 items-center">
                    <button className="flex gap-1"
                    data-writer={'명슬'}
                    onClick={handleComment}>
                        <RiChat1Line size={14}/>
                        <span className="text-[1.2rem]">댓글달기</span>
                    </button>
                    ·
                    <span className="text-[1.2rem]">방금 전</span>
                </div>
            </div>
            <button className="absolute top-4 right-4">
                <RiMore2Line size={16} />
            </button>
            </CommonWrapper>
        </div>
        {/* 대댓글 */}
        <div className="profile-zone relative py-4 pl-12 bg-gray-50">
            <CommonWrapper>
                <div className="profile flex gap-4.5 items-center">
                    <Image src={'/images/empty-profile.svg'}
                    alt=""
                    width={36}
                    height={36}
                    />
                    <span className="text-[1.3rem]">해나</span>
                </div>
                <div className="pl-[46px]">
                    <p className="text-[1.4rem]">귀엽네요</p>
                    <div className="mt-4 flex gap-1.5 items-center">
                        <button className="flex gap-1"
                        data-writer="해나"
                        onClick={handleComment}
                        >
                            <RiChat1Line size={14}/>
                            <span className="text-[1.2rem]">댓글달기</span>
                        </button>
                        ·
                        <span className="text-[1.2rem]">방금 전</span>
                    </div>
                </div>
                <button className="absolute top-4 right-4">
                    <RiMore2Line size={16} />
                </button>
            </CommonWrapper>
        </div>
        {/* 댓글쓰기 */}
        <CommentWrite mentionuser={mentionUser} />
        </>
    )
}