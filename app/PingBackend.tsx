"use client";

import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL, HOOK_URL, PROCESSOR_URL, WORKER_URL } from "./config";

export function PingBackend() {
    useEffect(() => {
        const ping = () => {
            axios.get(PROCESSOR_URL);
            axios.get(WORKER_URL);
            axios.get(BACKEND_URL);
            axios.get(HOOK_URL);
        };

        ping();

        const id = setInterval(ping, 3 * 60 * 1000);

        return () => clearInterval(id);
    }, []);

    return null;
}
