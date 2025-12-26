import { Dispatch, SetStateAction } from "react";
import { LinkButton } from "./buttons/LinkButton";
import { Action } from "@/types/Action";

export const ZapCell = ({
    name,
    imageUrl,
    index,
    type,
    addAction,
    deleteAction,
    updateAction,
}: {
    name: string;
    imageUrl: string | undefined;
    index: number;
    type: "Action" | "Trigger";
    addAction: (index: number) => void;
    deleteAction: (index: number) => void;
    updateAction: (index: number) => void;
}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="border-2 p-2 w-80 bg-neutral-50 flex justify-between items-center">
                <div
                    onClick={() => {
                        updateAction(index);
                    }}
                    className="cursor-pointer"
                >
                    <div className="font-bold">{type}</div>
                    <div className="flex items-center gap-2">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                className="h-5 w-5 rounded"
                                alt=""
                            ></img>
                        ) : (
                            <></>
                        )}

                        <div>
                            {index} {name}
                        </div>
                    </div>
                </div>
                <button
                    className="cursor-pointer hover:bg-neutral-200 p-1 rounded-full"
                    onClick={() => {
                        deleteAction(index);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </button>
            </div>
            <div className="h-5 w-0 border-2 border-slate-400"></div>
            <LinkButton
                onClick={() => {
                    if (name === "Select an Action") addAction(1);
                    else addAction(index);
                }}
            >
                <div className="text-2xl font-extrabold">+</div>
            </LinkButton>
            <div className="h-5 w-0 border-2 border-slate-400"></div>
        </div>
    );
};
