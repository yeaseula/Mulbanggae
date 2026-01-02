"use client"
import styled from "styled-components"
import { RiSearch2Line } from "@remixicon/react"

export function LocationSearch() {
    return (
        <FloatingSearch>
            <SearchForm action="">
                <Search type="text" id="location-search"/>
                <button className="cursor-pointer"><RiSearch2Line size={24}></RiSearch2Line></button>
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