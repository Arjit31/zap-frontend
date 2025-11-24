'use client'

import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PriamryButton";

export const Appbar = () => {
    const router = useRouter();
    return (
        <div className="flex border-b justify-between items-center">
            <div>
                Workflow
            </div>
            <div className="flex">
                <LinkButton onClick={() => {router.push('/login')}}>Login</LinkButton>
                <PrimaryButton onClick={() => {router.push('/signup')}}>Signup</PrimaryButton>
            </div>
        </div>
    )
}