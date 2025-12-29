"use client";

import { Appbar } from "@/components/Appbar";
import { ZapCell } from "@/components/Zapcell";
import React, { useEffect, useState } from "react";
import { Action } from "@/types/Action";
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { Trigger } from "@/types/Trigger";
import { PrimaryButton } from "@/components/buttons/PriamryButton";
import { useRouter } from "next/navigation";
import { DarkButton } from "@/components/buttons/DarkButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

export default function () {
    const [selectedTrigger, setSelectedTrigger] = useState<Trigger>();
    const [selectedActions, setSelectedActions] = useState<Action[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [updateActionStatus, setUpdateActionStatus] =
        useState<boolean>(false);
    const [actionIndex, setActionIndex] = useState<number>(-1);
    const [availableActions, setAvailableActions] = useState<Action[]>([]);
    const [availableTriggers, setAvailableTriggers] = useState<Trigger[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

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
        setUpdateActionStatus(false);
    }

    function setActionByModal(index: number, action: Action) {
        setSelectedActions((actionArray) => {
            const newArray: Action[] = [];
            for (let i = 0; i <= actionArray.length; i++) {
                if (i < index - 1) newArray[i] = actionArray[i];
                else if (i == index - 1) newArray[i] = action;
                else newArray[i] = actionArray[i - 1];
            }
            return newArray;
        });
    }

    function updateActionByModal(index: number, action: Action) {
        if (actionIndex === 1) {
            setSelectedTrigger(action);
            return;
        }
        setSelectedActions((actionArray) => {
            actionArray[index - 2] = action;
            return actionArray;
        });
    }

    function addAction(index: number) {
        setActionIndex(index);
        setShowModal(true);
    }
    function updateAction(index: number) {
        setActionIndex(index);
        setShowModal(true);
        setUpdateActionStatus(true);
    }

    function deleteAction(index: number) {
        if (actionIndex === 1) {
            setSelectedTrigger(undefined);
            return;
        }
        setSelectedActions((actionArray) => {
            const newArray: Action[] = [];
            for (let i = 0; i < actionArray.length; i++) {
                if (i != index - 2) newArray.push(actionArray[i]);
            }
            console.log(newArray);
            return newArray;
        });
    }
    console.log("rendered");

    return (
        <div>
            <Appbar />
            {!loading ? (
                <div className="dotted">
                    <div className="flex justify-end w-full p-2">
                        <SecondaryButton
                            onClick={async () => {
                                try {
                                    if (!selectedTrigger) {
                                        alert("add a trigger");
                                        return;
                                    }
                                    console.log(selectedActions);
                                    if (selectedActions.length === 0) {
                                        alert("add an action");
                                        return;
                                    }
                                    const res = await axios.post(
                                        `${BACKEND_URL}/api/v1/zap`,
                                        {
                                            availableTriggerId:
                                                selectedTrigger.id,
                                            triggerMetadata: {},
                                            actions: selectedActions.map(
                                                (a) => ({
                                                    actionId: a.id,
                                                    availableActionMetadata: {},
                                                })
                                            ),
                                        },
                                        {
                                            headers: {
                                                Authorization:
                                                    localStorage.getItem(
                                                        "token"
                                                    ),
                                            },
                                        }
                                    );
                                    router.push("/dashboard");
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                        >
                            Publish
                        </SecondaryButton>
                    </div>
                    <div className="w-full min-h-screen flex flex-col items-center py-20">
                        <ZapCell
                            name={
                                selectedTrigger
                                    ? selectedTrigger.name
                                    : "Select a trigger"
                            }
                            imageUrl={
                                selectedTrigger
                                    ? selectedTrigger.image
                                    : undefined
                            }
                            type="Trigger"
                            index={1}
                            // actions={selectedActions}
                            addAction={addAction}
                            deleteAction={deleteAction}
                            updateAction={updateAction}
                        />
                        <div className="flex flex-col items-center">
                            {selectedActions.length !== 0 ? (
                                selectedActions.map((a, i) => (
                                    <ZapCell
                                        key={i + 2}
                                        name={a.name}
                                        imageUrl={a.image}
                                        type="Action"
                                        index={i + 2}
                                        // actions={selectedActions}
                                        addAction={addAction}
                                        deleteAction={deleteAction}
                                        updateAction={updateAction}
                                    />
                                ))
                            ) : (
                                <ZapCell
                                    name="Select an Action"
                                    imageUrl={undefined}
                                    type="Action"
                                    index={2}
                                    // actions={selectedActions}
                                    addAction={addAction}
                                    deleteAction={deleteAction}
                                    updateAction={updateAction}
                                />
                            )}
                        </div>
                        {showModal ? (
                            <Modal
                                closeModal={closeModal}
                                index={actionIndex}
                                options={
                                    actionIndex === 1
                                        ? availableTriggers
                                        : availableActions
                                }
                                setActionByModal={setActionByModal}
                                forUpdate={updateActionStatus}
                                updateActionByModal={updateActionByModal}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
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
    forUpdate = false,
    updateActionByModal,
}: {
    closeModal: () => void;
    index: number;
    options: Action[];
    setActionByModal: (index: number, action: Action) => void;
    forUpdate: boolean;
    updateActionByModal: (index: number, action: Action) => void;
}) {
    const [selectedOption, setSelectedOption] = useState("");
    return (
        <div className="fixed inset-0 bg-opacity-50  overflow-y-auto h-full w-full flex items-center justify-center backdrop-blur-[0.4px]">
            <div className="px-6 py-6 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {index === 1 ? (
                            <>Select a trigger</>
                        ) : (
                            <>Select an action</>
                        )}
                    </h3>
                    <button
                        onClick={closeModal}
                        className="cursor-pointer py-1 px-1 text-xl rounded-full hover:bg-neutral-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="h-0 w-full my-2 border border-slate-200"></div>
                <div className="mt-2 flex flex-col gap-1 w-full">
                    {options.map((o) => {
                        return (
                            <div
                                key={o.id}
                                onClick={() => {
                                    if (forUpdate) {
                                        updateActionByModal(index, o);
                                    } else setActionByModal(index, o);
                                    closeModal();
                                }}
                                className={
                                    "rounded-md px-2 py-1 cursor-pointer hover:bg-slate-100 flex items-center gap-2"
                                }
                            >
                                {o.image ? <img className="h-5 w-5 rounded" src={o.image}></img> : <></>}
                                {o.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
