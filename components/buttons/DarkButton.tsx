import { ReactNode } from "react";

export const DarkButton = ({
    children,
    onClick,
    disabled = false
}: {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean
}) => {
    return (
        <button
            className={"px-5 py-2 bg-indigo-700 text-white cursor-pointer hover:bg-indigo-800 flex justify-center items-center rounded-sm font-bold hover:shadow-md disabled:cursor-not-allowed"}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
