import { ReactNode } from "react";

export const SecondaryButton = ({
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
                size === "small" ? "text-sm px-8 py-1" : "text-xl px-10 py-3"
            } border cursor-pointer hover:bg-neutral-200 flex items-center justify-center rounded-sm hover:shadow-md`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
