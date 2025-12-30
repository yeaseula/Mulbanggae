"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { RiHomeSmile2Line,
    RiHomeSmile2Fill,
    RiMessage2Line,
    RiMessage2Fill,
    RiMapPinLine,
    RiMapPinFill,
    RiShoppingBag4Line,
    RiShoppingBag4Fill,
    RiAccountCircleLine,
    RiAccountCircleFill
} from "@remixicon/react"
import styled from "styled-components"

const NAVIGATION_ITEMS = [{
    id: 'main-home',
    icon: RiHomeSmile2Line,
    activeIcon: RiHomeSmile2Fill,
    href: '/',
    text: '홈',
},{
    id: 'chatting',
    icon: RiMessage2Line,
    activeIcon: RiMessage2Fill,
    href: '/chat',
    text: '채팅',
},{
    id: 'my-location',
    icon: RiMapPinLine,
    activeIcon: RiMapPinFill,
    href: '/location',
    text: '내 주변',
},{
    id: 'my-sellign',
    icon: RiShoppingBag4Line,
    activeIcon: RiShoppingBag4Fill,
    href: '/selling',
    text: '사고팔기',
},{
    id: 'profile',
    icon: RiAccountCircleLine,
    activeIcon: RiAccountCircleFill,
    href: '/profile',
    text: '프로필',
}]

export function Navigation() {
    const pathname = usePathname()
    return (
        <NavigationWrapper>
            {NAVIGATION_ITEMS.map((ele)=>(
                <NavigationDetail key={ele.id} href={ele.href}>
                    {pathname === ele.href ?
                    <ele.activeIcon size={24} color="var(--main_color)"/>
                    : <ele.icon size={24} />
                    }
                    <p className={`${pathname === ele.href ? 'text-(--main_color)' : ''}`}>{ele.text}</p>
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