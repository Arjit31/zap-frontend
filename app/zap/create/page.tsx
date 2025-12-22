"use client";

import { Appbar } from "@/components/Appbar";
import { ZapCell } from "@/components/Zapcell";
import React, { useEffect, useState } from "react";
import { Action } from "@/types/Action";
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { Trigger } from "@/types/Trigger";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

export default function () {
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<Action[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [actionIndex, setActionIndex] = useState<number>(-1);
    const [availableActions, setAvailableActions] = useState<Action[]>([]);
    const [availableTriggers, setAvailableTriggers] = useState<Trigger[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function init() {
            const res1 = await axios.get(
                `${BACKEND_URL}/api/v1/trigger/available`
            );
            const res2 = await axios.get(
                `${BACKEND_URL}/api/v1/action/available`
            );

            setAvailableTriggers(res1.data);
            setAvailableActions(res2.data);
            setLoading(false);
        }
        init();
    }, []);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showModal]);

    function closeModal() {
        setShowModal(false);
    }

    function setActionByModal(index: number, action: Action) {
        setSelectedActions((actionArray) => {
            const newArray: Action[] = [];
            for(let i = 0; i <= actionArray.length; i++){
                if(i < index-1) newArray[i] = actionArray[i];
                else if(i == index-1) newArray[i] = action;
                else newArray[i] = actionArray[i-1];
            }
            return newArray;
        });
    }

    function addAction(index: number) {
        setActionIndex(index);
        setShowModal(true);
    }
    console.log("rendered");

    return (
        <div>
            <Appbar />
            {!loading ? (
                <>
                    <div className="w-full min-h-screen dotted flex flex-col items-center py-20">
                        <ZapCell
                            name={
                                selectedTrigger
                                    ? selectedTrigger
                                    : "Select a trigger"
                            }
                            type="Trigger"
                            index={1}
                            actions={selectedActions}
                            addAction={addAction}
                        />
                        <div className="flex flex-col items-center">
                            {selectedActions.length !== 0 ? (
                                selectedActions.map((a, i) => (
                                    <ZapCell
                                        key={i + 2}
                                        name={a.name}
                                        type="Action"
                                        index={i + 2}
                                        actions={selectedActions}
                                        addAction={addAction}
                                    />
                                ))
                            ) : (
                                <ZapCell
                                    name="Select an Action"
                                    type="Action"
                                    index={2}
                                    actions={selectedActions}
                                    addAction={addAction}
                                />
                            )}
                        </div>
                        {showModal ? (
                            <Modal
                                closeModal={closeModal}
                                index={actionIndex}
                                options={availableActions}
                                setActionByModal={setActionByModal}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center text-3xl p-40">
                    Loading...
                </div>
            )}
        </div>
    );
}

function Modal({
    closeModal,
    index,
    options,
    setActionByModal,
}: {
    closeModal: () => void;
    index: number;
    options: Action[];
    setActionByModal: (index: number, action: Action) => void;
}) {
    const [selectedOption, setSelectedOption] = useState("");
    return (
        <div className="fixed inset-0 bg-opacity-50  overflow-y-auto h-full w-full flex items-center justify-center backdrop-blur-[0.4px]">
            <div className="px-6 py-6 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                        Select an action
                    </h3>

                    <button
                        onClick={closeModal}
                        className="cursor-pointer py-1/2 px-2 text-xl rounded"
                    >
                        x
                    </button>
                </div>
                <div className="mt-2 flex flex-col gap-1 w-full">
                    {options.map((o) => {
                        return (
                            <div
                                key={o.id}
                                onClick={() => {
                                    setActionByModal(index, o);
                                    closeModal();
                                }}
                                className={
                                    "rounded-md px-2 py-1 cursor-pointer hover:bg-slate-100 "
                                }
                            >
                                {o.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
