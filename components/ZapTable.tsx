import { Zap } from "@/types/Zap";
import { LinkButton } from "./buttons/LinkButton";
import { useRouter } from "next/navigation";

export const ZapTable = ({ zaps }: { zaps: Zap[] }) => {
    const router = useRouter();
    return (
        <div className="flex flex-col p-10">
            <div className="flex font-bold">
                <div className="flex-5"></div>
                <div className="flex-10">Workflow ID</div>
                <div className="flex-2">Last used</div>
                <div className="flex-1"></div>
            </div>
            <div className="flex flex-col mt-5">
                {zaps.map((z: Zap) => {
                    return (
                        <div key={z.id} className="flex border-y border-slate-200 py-1">
                            <div className="flex-5">
                                {z.triggers.type.name}{" "}
                                {z.actions.map((a) => {
                                    return a.type.name + " ";
                                })}
                            </div>
                            <div className="flex-10">{z.id}</div>
                            <div className="flex-2">Nov 12, 1961</div>
                            <div className="flex-1 flex justify-center"><LinkButton onClick={() => {router.push("/zap/"+z.id)}}>GO</LinkButton></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
