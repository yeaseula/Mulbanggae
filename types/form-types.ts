"use client"
import {InputHTMLAttributes} from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export interface InputType extends Omit<InputHTMLAttributes<HTMLInputElement>, 'width'|'name'> {
    name: string;
    label: string;
    error?: string;
    required?: boolean;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    width?: string | number;
    show?: boolean
}