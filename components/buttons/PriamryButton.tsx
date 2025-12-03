import { ReactNode } from "react";

export const PrimaryButton = ({
    children,
    onClick,
    size = "small",
    disabled = false
}: {
    children: ReactNode;
    onClick: () => void;
    size?: "small" | "big" | "medium";
    disabled?: boolean
}) => {
    return (
        <button
            className={`${
                size === "small" ? "text-sm px-8 py-1" : (size === "medium" ? "text-md px-8 py-2" : "text-xl px-10 py-3")
            } bg-orange-500 text-white cursor-pointer hover:bg-orange-600 flex justify-center items-center rounded-full font-bold hover:shadow-md disabled:cursor-not-allowed`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
