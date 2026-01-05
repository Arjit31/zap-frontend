"use client";

import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Zap } from "@/types/Zap";
import { ZapTable } from "@/components/ZapTable";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";

const useZap = () => {
    const [zaps, setZaps] = useState<Zap[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                Authorization: getCookie("token")
            }
        }).then((res) => {
            setZaps(res.data.zaps)
            setLoading(false)
            console.log(res)
        })
    }, [])
    return {zaps, loading}
};

export default function () {
    const {zaps, loading} = useZap();
    const router = useRouter()
    return (
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center pt-8">
                <div className="w-full max-w-5xl flex flex-col">
                    <div className="flex justify-between px-10 items-center">
                        <div className="text-2xl font-bold">My Workflows</div>
                        <DarkButton onClick={() => {router.push("/zap/create")}}>Create</DarkButton>
                    </div>
                    {loading ? "Loading" :  <ZapTable zaps = {zaps} />}
                </div>
            </div>
        </div>
    );
}
