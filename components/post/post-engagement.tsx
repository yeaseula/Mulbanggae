import * as S from "./post.styled"
import { RiHeartLine, RiChat1Line } from "@remixicon/react"

export function PostEngagement ({data}:{data?:any}) {

    const handleLike = () => {
        console.log('like')
    }

    return (
        <div className="flex gap-3">
            {/* 좋아요, 댓글 수*/}
            <S.LickButton onClick={handleLike}>
                <RiHeartLine size={15} className="relative bottom-1 mr-1"/>
                3
            </S.LickButton>
            <S.Font2>
                <RiChat1Line size={15} className="relative bottom-1 mr-1"/>
                3
            </S.Font2>
        </div>
    )
}