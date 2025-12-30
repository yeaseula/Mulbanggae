"use client"
import React, { memo } from "react"
import styled from "styled-components"

interface ButtonProps {
    type: 'submit' | 'button'
    children: React.ReactNode;
    disabled: boolean;
    background?: string;
    onClick?: () => void
}

export const SubmitButton = memo(({
    type,
    onClick,
    disabled,
    children
}:ButtonProps)=>{
    console.log(disabled)
    return (
        <Button type={type} disabled={disabled} onClick={onClick}>{children}</Button>
    )
})

const Button = styled.button`
    width: 100%;
    height: 100%;
    color: #fff;
    border-radius: 100px;
    background-color: var(--main_color);
    font-size: 1.4rem;
    cursor: pointer;
    &:disabled {
        cursor: initial;
        background-color: var(--disabled_color);
    }
`

// SubmitButton.displayName = 'SubmitButton'

// export SubmitButton