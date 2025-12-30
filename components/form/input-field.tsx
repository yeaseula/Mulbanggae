"use client"
import { InputType } from "@/types/form-types";
import styled from "styled-components";

export function InputField({
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
        <label
        htmlFor={id}
        className="block text-xl mb-2"
        >{label} {required && <b className="font-bold text-red-700"> *</b>}</label>
        <InputStyle
        id={id}
        className={error && 'error'}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name, rules)}
        {...rest}
        />
        </>
    )
}

const InputStyle = styled.input`
    display: block;
    width: 100%;
    height: 44px;
    border: 1px solid var(--gray_medium_color);
    border-radius: 100px;
    padding: 0 14px;
    font-size: 1.4rem;
    &:placeholder {
        color: var(--gray_dark_color)
    }
    &:focus-visible {
        outline: 2px solid var(--main_color)
    }
    &.error {
        outline: 2px solid var(--error_color)
    }
`