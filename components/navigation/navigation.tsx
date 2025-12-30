"use client"
import Link from "next/link"
import { RiHomeSmile2Line,
    RiMessage2Line,
    RiMapPinLine,
    RiShoppingBag4Line,
    RiAccountCircleLine } from "@remixicon/react"
import styled from "styled-components"

const NAVIGATION_ITEMS = [{
    id: 'main-home',
    icon: RiHomeSmile2Line,
    href: '/',
    text: '홈',
},{
    id: 'chatting',
    icon: RiMessage2Line,
    href: '/chat',
    text: '채팅',
},{
    id: 'my-location',
    icon: RiMapPinLine,
    href: '/location',
    text: '내 주변',
},{
    id: 'my-sellign',
    icon: RiShoppingBag4Line,
    href: '/',
    text: '사고팔기',
},{
    id: 'profile',
    icon: RiAccountCircleLine,
    href: '/profile',
    text: '프로필',
}]

export function Navigation() {
    return (
        <NavigationWrapper>
            {NAVIGATION_ITEMS.map((ele)=>(
                <NavigationDetail key={ele.id} href={ele.href}>
                    <ele.icon size={24} />
                    <p>{ele.text}</p>
                </NavigationDetail>
            ))}
        </NavigationWrapper>
    )
}

const NavigationWrapper = styled.div`
    max-width: 390px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    border-top: 1px solid var(--gray_medium_color);
`

const NavigationDetail = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 11px 0;
    flex: 1;
    gap: 3px;
    font-size: 1rem;
`