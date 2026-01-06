import { ChangeEvent } from "react";

export const InputBox = ({
    label,
    placeholder,
    onChange,
    type = "text",
    value = ""
}: {
    label: string;
    placeholder: string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
    type? : "text" | "password";
    value?: string
}) => {
    return (
        <>
            <label className="mt-2 font-bold ">{label}</label>
            <input className="border rounded py-2 px-4 text-sm border-slate-400" defaultValue={value} onChange={onChange} type={type} placeholder={placeholder}></input>
        </>
    );
};
