import * as S from "./post.styled"
import { RiHeartLine, RiChat1Line } from "@remixicon/react"

export function PostEngagement ({data}:{data?:any}) {
    return (
        <div className="flex gap-3">
            {/* 좋아요, 댓글 수*/}
            <S.Font2>
                <RiHeartLine size={15} className="relative bottom-1 mr-1"/>
                3
            </S.Font2>
            <S.Font2>
                <RiChat1Line size={15} className="relative bottom-1 mr-1"/>
                3
            </S.Font2>
        </div>
    )
}