import { ReactNode } from "react";

export const PrimaryButton = ({
    children,
    onClick,
    size = "small",
}: {
    children: ReactNode;
    onClick: () => void;
    size?: "small" | "big";
}) => {
    return (
        <div
            className={`${
                size === "small" ? "text-sm px-8 py-1" : "text-xl px-10 py-5"
            } bg-orange-500 text-white cursor-pointer hover:bg-orange-600 flex items-center rounded-full font-bold hover:shadow-md`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
