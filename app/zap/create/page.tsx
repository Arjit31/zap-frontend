"use client";

import { Appbar } from "@/components/Appbar";
import { ZapCell } from "@/components/Zapcell";
import { useState } from "react";
import { Action } from "@/types/Action";

export default function () {
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<Action[]>([]);

    function updateActions(actions: Action[]) {
        setSelectedActions((a) => actions);
        console.log(selectedActions);
    }
    console.log("rendered");
    
    return (
        <div>
            <Appbar />
            <div className="w-full min-h-screen dotted flex flex-col items-center pt-20">
                <ZapCell
                    name={
                        selectedTrigger ? selectedTrigger : "Select a trigger"
                    }
                    type="Trigger"
                    index={1}
                    actions={selectedActions}
                    updateActions={updateActions}
                />
                <div className="flex flex-col items-center">
                    {selectedActions.length !== 0 ? (
                        selectedActions.map((a, i) => (
                            <ZapCell
                                key={i+2}
                                name={a.availableActionName}
                                type="Action"
                                index={i + 2}
                                actions={selectedActions}
                                updateActions={updateActions}
                            />
                        ))
                    ) : (
                        <ZapCell
                            name="Select an Action"
                            type="Action"
                            index={2}
                            actions={selectedActions}
                            updateActions={updateActions}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
