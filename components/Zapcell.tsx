import { Dispatch, SetStateAction } from "react";
import { LinkButton } from "./buttons/LinkButton";
import { Action } from "@/types/Action";

export const ZapCell = ({
    name,
    index,
    type,
    actions,
    updateActions,
}: {
    name: string;
    index: number;
    type: "Action" | "Trigger";
    actions: Action[];
    updateActions: (actions: Action[]) => void;
}) => {
    return (
        <>
            <div className="border-2 p-2 w-80 bg-neutral-50">
                <div className="font-bold">{type}</div>
                <div>
                    <div>
                        {index} {name}
                    </div>
                </div>
            </div>
            <div className="h-5 w-0 border-2 border-slate-400"></div>
            <LinkButton
                onClick={() => {
                    const actionArray = [...actions];
                    actionArray.splice(index, 0, {
                        availableActionId: "",
                        availableActionName: "",
                    });
                    console.log(actionArray);
                    updateActions(actionArray);
                }}
            >
                <div className="text-2xl font-extrabold">+</div>
            </LinkButton>
                <div className="h-5 w-0 border-2 border-slate-400"></div>
        </>
    );
};
