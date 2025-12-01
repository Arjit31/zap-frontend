export const InputBox = ({
    label,
    placeholder,
    onChange,
    type = "text"
}: {
    label: string;
    placeholder: string;
    onChange: () => void;
    type? : "text" | "password";
}) => {
    return (
        <>
            <label className="mt-2 font-bold ">{label}</label>
            <input className="border rounded py-2 px-4 text-sm border-slate-400" onChange={onChange} type={type} placeholder={placeholder}></input>
        </>
    );
};
