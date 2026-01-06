"use client"
import Link from "next/link"
import { useLocationStore } from "@/store/locationstore"
import { MoveLocation } from "./move-location"
import { RiHeartLine, RiPhoneLine, RiLinksLine } from "@remixicon/react"
import styled from "styled-components"

export function LocationBottomSheet ({map, open} :
    {map : kakao.maps.Map | null, open: boolean}
) {

    const { searchResult, searchStatus } = useLocationStore()

    if(searchStatus === 'error') {
        return <>에러가 발생했습니다.</>
    }

    if(searchStatus === 'empty') {
        return <>검색 결과가 없습니다</>
    }

    if(searchStatus === 'loading') {

    }

    if(searchStatus === 'success') {
        return (
            <>
            {searchResult?.map((ele)=>(
                <div
                key={ele.id}
                className="flex justify-between gap-3 pt-6 px-4 mb-3">
                    <div className="relative flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Title>
                                    {ele.place_name}
                                </Title>
                                <button
                                tabIndex={open ? 0 : 1}
                                className="cursor-pointer text-sm py-1 px-3 rounded-sm bg-(--sub_light_color)"
                                onClick={()=>{MoveLocation(map,ele.x,ele.y,ele.id)}}
                                >지도보기</button>
                            </div>
                            <div className="mt-3 text-xl">{ele.address_name}</div>
                        </div>

                        <ButtonWrap className="flex gap-2">
                            <Link
                            tabIndex={open ? 0 : 1}
                            href={`tel:${ele.phone}`}><RiPhoneLine size={16} /></Link>
                            <Link
                            tabIndex={open ? 0 : 1}
                            href={ele.place_url}><RiLinksLine size={16} /></Link>
                            <button
                            tabIndex={open ? 0 : 1}
                            type="button"><RiHeartLine size={16} /></button>
                        </ButtonWrap>
                    </div>
                    <div className="w-[100px] h-[100px] rounded-2xl bg-amber-200">

                    </div>

                </div>
            ))}
            </>
        )
    }
}

const Title = styled.p`
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ButtonWrap = styled.div`
    position: relative;
    z-index: 6;
    > button, a {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--sub_light_color);
        border-radius: 500px;
    }
`