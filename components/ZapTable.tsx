import { Zap } from "@/types/Zap";
import { LinkButton } from "./buttons/LinkButton";
import { useRouter } from "next/navigation";
import { HOOK_URL } from "@/app/config";

export const ZapTable = ({ zaps }: { zaps: Zap[] }) => {
    const router = useRouter();
    return (
        <div className="flex flex-col p-10">
            <div className="flex font-bold">
                <div className="flex-5"></div>
                <div className="flex-5">Workflow ID</div>
                <div className="flex-7">Webhook URL</div>
                <div className="flex-1"></div>
            </div>
            <div className="flex flex-col mt-5">
                {zaps.map((z: Zap) => {
                    return (
                        <div
                            key={z.id}
                            className="flex border-y border-slate-200 py-1"
                        >
                            <div className="flex flex-5 gap-2 items-center flex-wrap">
                                {z.triggers.type.image ? (
                                    <img
                                        src={z.triggers.type.image}
                                        className="h-5 w-5 rounded"
                                        alt=""
                                    ></img>
                                ) : (
                                    z.triggers.type.name
                                )}{" "}
                                {z.actions.map((a) => {
                                    if (a.type.image) {
                                        return (
                                            <img
                                                key={a.id}
                                                src={a.type.image}
                                                className="h-5 w-5 rounded"
                                                alt=""
                                            ></img>
                                        );
                                    }
                                    return a.type.name + " ";
                                })}
                            </div>
                            <div className="flex-5">{z.id}</div>
                            <div className="flex-7">{HOOK_URL + "/hooks/catch/" + z.userId + "/" + z.id}</div>
                            <div className="flex-1 flex justify-center">
                                <LinkButton
                                    onClick={() => {
                                        router.push("/zap/" + z.id);
                                    }}
                                >
                                    GO
                                </LinkButton>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
