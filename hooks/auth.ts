"use client"

import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        async function init() {
            const isCookiePresent = await hasCookie("token");
            setIsLoggedIn(isCookiePresent);
        }
        init();
    }, []);
    return {isLoggedIn};
}

export function useRedirectOnLogin(){
    const router = useRouter();
    useEffect(() => {
        async function init() {
            const isCookiePresent = await hasCookie("token");
            if(isCookiePresent){
                router.push("/dashboard");
            }
        }
        init();
    }, []);
}