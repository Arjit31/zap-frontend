"use client";

import Image from "next/image";
import { PrimaryButton } from "./buttons/PriamryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { useRouter } from "next/navigation";

export const Hero = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-20 justify-center items-center p-10">
                <div className="max-w-[600px] flex flex-col gap-5">
                    <div className="text-5xl font-medium">
                        Automate your workflow as fast as you can type
                    </div>
                    <div className="text-xl">
                        Build powerful workflows in minutes. Automate tasks,
                        connect tools, and let your systems run themselves.
                    </div>
                    <div className="flex gap-5">
                        <PrimaryButton size="big" onClick={() => {router.push("/signup")}}>
                            Get Started Free
                        </PrimaryButton>
                        <SecondaryButton size="big" onClick={() => {router.push("https://akdevelops.netlify.app/")}}>
                            Contact
                        </SecondaryButton>
                    </div>
                    <div className="font-bold">**The first request like login might take few seconds because of cold restart in free servers but after that the system stays responsive with simple keep-alive pings**</div>
                </div>
                <Image
                    src={"/images/hero-image.png"}
                    alt="hero image"
                    width={250}
                    height={250}
                ></Image>
            </div>
            <img
                src={"/images/hero-motive-image1.png"}
                alt="hero image"
                className="w-full py-10 max-w-[1200px]"
            ></img>
        </div>
    );
};
