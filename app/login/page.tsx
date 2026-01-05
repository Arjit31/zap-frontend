"use client";

import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PriamryButton";
import { InputBox } from "@/components/InputBox";
import { CheckCircle } from "@deemlol/next-icons";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";

export default function () {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return (
        <div className="h-screen">
            <Appbar></Appbar>
            <div className="h-full p-10 flex text-sm">
                <div className="flex flex-col gap-10 w-1/2 justify-center h-full px-5">
                    <div className="font-bold text-3xl">
                        Automate your workflow as fast as you can type.
                    </div>
                    <div>
                        Create powerful automation in just a few clicks. Replace
                        repetitive work with smart, connected workflows that run
                        themselves.
                    </div>
                    <ul>
                        <li className="flex gap-2 mb-4">
                            <CheckCircle size={24} color="green" />
                            Build once, use forever
                        </li>
                        <li className="flex gap-2 mb-4">
                            <CheckCircle size={24} color="green" />
                            Works across all your tools
                        </li>
                        <li className="flex gap-2 mb-4">
                            <CheckCircle size={24} color="green" />
                            Create, customize, and deploy in minutes
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center items-center h-full w-1/2 px-5">
                    <div className="border rounded flex flex-col w-110 justify-center p-5 gap-1 border-slate-200">
                        <div className="text-center text-3xl font-bold mb-2">
                            Log in to your account
                        </div>
                        <div>* indicates a required field.</div>
                        <InputBox
                            placeholder=""
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            label="*Working email"
                        ></InputBox>
                        <InputBox
                            placeholder=""
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            label="*Password"
                            type="password"
                        ></InputBox>
                        <div className="mb-5"></div>
                        <PrimaryButton
                            size="medium"
                            disabled={!email || !password ? true : false}
                            onClick={async () => {
                                try {
                                    const res = await axios.post(
                                        `${BACKEND_URL}/api/v1/user/signin`,
                                        {
                                            email: email,
                                            password: password,
                                        }
                                    );
                                    if (res.status !== 200) {
                                        router.push("/signup");
                                        return;
                                    }
                                    await setCookie("token", res.data.token);
                                    router.push("/dashboard");
                                } catch (error) {
                                    console.error(error);
                                    router.push("/signup");
                                }
                            }}
                        >
                            Continue
                        </PrimaryButton>
                        <hr className="mt-2 bg-slate-200 border-0 h-px"></hr>
                        <div className="text-center">
                            Don't have a Workflow account yet?{" "}
                            <Link
                                className="text-blue-700 underline"
                                href={"/signup"}
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
