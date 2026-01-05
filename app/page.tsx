"use client"

import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { useRedirectOnLogin } from "@/hooks/auth";

export default function Home() {
  useRedirectOnLogin();
  return (
    <div className="">
      <Appbar />
      <Hero />
    </div>
  );
}
