"use client"
import Link from "next/link"
import { useLocationStore } from "@/store/locationstore"
import { RiHeartLine, RiPhoneLine, RiLinksLine } from "@remixicon/react"
import styled from "styled-components"

export function LocationBottomSheet () {

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
                <div key={ele.id} className="flex justify-between gap-3 pt-6 px-4">
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="font-bold">{ele.place_name}</div>
                            <div className="mt-3 text-xl">{ele.address_name}</div>
                        </div>

                        <ButtonWrap className="flex gap-2">
                            <Link href={`tel:${ele.phone}`}><RiPhoneLine size={16} /></Link>
                            <Link href={ele.place_url}><RiLinksLine size={16} /></Link>
                            <button type="button"><RiHeartLine size={16} /></button>
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

const ButtonWrap = styled.div`
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