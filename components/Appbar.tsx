"use client";

import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PriamryButton";
import { hasCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";

export const Appbar = () => {
    const router = useRouter();
    const {isLoggedIn} = useAuth();
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // useEffect(() => {
    //     async function init(){
    //         const isCookiePresent = await hasCookie("token");
    //         setIsLoggedIn(isCookiePresent);
    //     }
    //     init();
    // }, []);
    return (
        <div className="flex border-b border-slate-300 justify-between items-center py-3 px-15 bg-neutral-100">
            <div className="font-extrabold text-2xl">Workflow</div>
            <div className="flex gap-2">
                <LinkButton onClick={() => {router.push("https://akdevelops.netlify.app/")}}>Contact</LinkButton>
                {isLoggedIn === true ? (
                    <LinkButton
                        onClick={() => {
                            deleteCookie("token");
                            router.push("/login");
                        }}
                    >
                        Logout
                    </LinkButton>
                ) : (
                    <>
                        <LinkButton
                            onClick={() => {
                                router.push("/login");
                            }}
                        >
                            Log in
                        </LinkButton>
                        <PrimaryButton
                            onClick={() => {
                                router.push("/signup");
                            }}
                        >
                            Sign up
                        </PrimaryButton>
                    </>
                )}
            </div>
        </div>
    );
};
