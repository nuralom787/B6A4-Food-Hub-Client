"use server";

import { env } from "@/env";

const BACKEND_URL = env.BACKEND_URL;

export const getAllUsers = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/customers`);
        const result = await res.json();

        return result;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};