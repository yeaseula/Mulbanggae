"use client"
import { InputType } from "@/types/form-types";
import styled from "styled-components";

export function InputAgreeField({
    label,
    error,
    register,
    rules,
    name,
    required,
    ...rest
}:InputType) {
    const id = name;
    return (
        <>
            <Label htmlFor={id}>
                <Checkbox type="checkbox" id={id}
                {...register(name,rules)}
                {...rest}
                />
                {label}
            </Label>
        </>
    )
}

const Label = styled.label`
    position: relative;
    font-size: 1.4rem;
    color: var(--gray_dark_color);
    padding: 0 19px;
`

const Checkbox = styled.input`
    appearance: none;

    &::before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 1px solid var(--gray_semidark_color);
        border-radius: 4px;
        position: absolute;
        top: 0;
        left: 0;
    }

    &:checked {
        &::before {
            border: 1px solid var(--main_color);
            background-color: var(--main_color);
            background-image: url('/images/check-icon.svg');
            background-size: 10px;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
`