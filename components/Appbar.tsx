'use client'

import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PriamryButton";

export const Appbar = () => {
    const router = useRouter();
    return (
        <div className="flex border-b border-slate-300 justify-between items-center py-3 px-15 bg-neutral-100">
            <div className="font-extrabold text-2xl">
                Workflow
            </div>
            <div className="flex gap-2">
                <LinkButton onClick={() => {}}>Contact</LinkButton>
                <LinkButton onClick={() => {router.push('/login')}}>Log in</LinkButton>
                <PrimaryButton onClick={() => {router.push('/signup')}}>Sign up</PrimaryButton>
            </div>
        </div>
    )
}