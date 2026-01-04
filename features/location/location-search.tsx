"use client"
import { useEffect, useRef, useState } from "react"
import { searchStores } from "./search-store"
import { useLocationStore } from "@/store/locationstore"
import styled from "styled-components"
import { RiSearch2Line, RiCloseLine } from "@remixicon/react"

export function LocationSearch({map}:{ map : kakao.maps.Map | null}) {

    const valRef = useRef<string | number>(null)
    const [value,setValue] = useState<string | number | null>(null)

    let debounce = false

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        //valRef.current = e.currentTarget.value
        setValue(e.currentTarget.value)
    }

    useEffect(()=>{console.log(value)},[value])

    const handleSearch = () => {
        // if(debounce) return
        // debounce = true;
        if(!map) return
        if(!value) {
            alert('검색어를 입력해주세요.')
            return
        }
        searchStores(map,value);
    }

    const handleClose = () => {
        setValue(null) //input value초기화
        useLocationStore.getState().setSearchState(false) //bottom sheet종료
    }

    return (
        <FloatingSearch>
            <SearchForm action="">
                <Search
                type="text"
                value={value || ''}
                onChange={handleInput}
                />
                {(value || value !== '') &&
                    <button type="button" className="cursor-pointer" onClick={handleClose}>
                        <RiCloseLine size={24} />
                    </button>
                }
                <button type="button" className="cursor-pointer" onClick={handleSearch}>
                    <RiSearch2Line size={24} />
                </button>
            </SearchForm>
        </FloatingSearch>
    )
}

const FloatingSearch = styled.div`
    width: calc(100% - 30px);
    position: absolute;
    top: 58px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 21;
`
const SearchForm = styled.form`
    width: 100%;
    height: 44px;
    padding: 0 15px;
    border-radius: 500px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--gray_medium_color);
    &:focus-within {
        outline: 2px solid var(--main_color);
    }
`
const Search = styled.input`
    flex: 1;
    &:focus {
        outline: none;
    }
`