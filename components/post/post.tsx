"use client"
import { PostMeta } from "./postmeta"
import { PostEngagement } from "./post-engagement"
import * as S from "./post.styled"

export function Post() {
    return (
        <div className="px-[15px]">
            <S.Wrapper>
                <S.ContentsArea>
                    <S.LinkArea href={'/'}></S.LinkArea>
                    <S.LeftSide>
                        {/* 있으면 노출, 없으면 미노출 */}
                        <div className="mb-5 flex gap-2.5 items-center">
                            <S.Category>category</S.Category>
                            <S.Writer>까망베르</S.Writer>
                        </div>
                        {/* 있으면 노출, 없으면 미노출 끝*/}
                        <div className="text-2xl line-clamp-3">
                            망까룽까망까룽까우리집고양이망까룽까망까룽까망까룽까망까룽까망고양이망까룽까룽까룽룽룽
                            망까룽까망까룽까
                        </div>
                    </S.LeftSide>
                    <S.RightSide>이미지 영역</S.RightSide>
                </S.ContentsArea>
                <div className="mt-5 flex justify-between items-center">
                    <PostMeta></PostMeta>
                    <PostEngagement></PostEngagement>
                </div>
            </S.Wrapper>
        </div>
    )
}