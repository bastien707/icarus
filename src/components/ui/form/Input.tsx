"use client"

import { ChangeEvent } from "react";

interface InputProps {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({type, name, value, placeholder, changeHandler}: InputProps) {
    return (
        <input
        required
        type={type}
        name={name}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
        className="p-2 block w-full shadow-sm sm:text-sm border-slate-800 border-2"
      />
    );
}