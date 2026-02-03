"use server";

import { env } from "@/env";

const NEXT_PUBLIC_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL

export const createOrder = async (data: any) => {
    console.log("From action: ", data)
    try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/orders/placed-order`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        return result;
    }
    catch (err) {
        return { success: false, err: { message: "somethings went wrong! please try again." } }
    }
};