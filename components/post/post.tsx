"use client"
import styled from "styled-components"
import * as S from "./post.styled"
import { RiHeartLine, RiChat1Line } from "@remixicon/react"

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
                        <div className="text-2xl">
                            망까룽까망까룽까우리집고양이망까룽까망까룽까망까룽까망까룽까망고양이망까룽까룽까룽룽룽
                            망까룽까망까룽까
                        </div>
                    </S.LeftSide>
                    <S.RightSide>이미지 영역</S.RightSide>
                </S.ContentsArea>
                <div className="mt-5 flex justify-between items-center">
                    <div className="flex gap-1.5 items-center">
                        <S.Font>방금 전</S.Font>
                        <S.Font>·</S.Font>
                        <S.Font>조회수 20</S.Font>
                    </div>
                    <div className="flex gap-3">
                        <S.Font2><RiHeartLine size={15} className="relative bottom-1 mr-1"/>3</S.Font2>
                        <S.Font2><RiChat1Line size={15} className="relative bottom-1 mr-1"/>3</S.Font2>
                    </div>
                </div>
            </S.Wrapper>
        </div>
    )
}