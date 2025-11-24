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
                size === "small" ? "text-sm px-2 py-4" : "text-xl px-5 py-10"
            } bg-amber-600 text-white cursor-pointer`}
            onClick={onClick}
        >{children}</div>
    );
};
