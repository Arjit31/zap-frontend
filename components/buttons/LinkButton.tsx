import { ReactNode } from "react";

export const LinkButton = ({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className="px-2 py-1 cursor-pointer hover:bg-neutral-200 flex justify-center items-center font-light text-slate-600 rounded"
        >
            {children}
        </div>
    );
};
