'use client'

import { LinkButton } from "./buttons/LinkButton"

export const Appbar = () => {
    return (
        <div className="flex border-b justify-between">
            <div>
                Workflow
            </div>
            <div>
                <LinkButton onClick={() => {}}>Login</LinkButton>
            </div>
        </div>
    )
}