"use server";

import { env } from "@/env";
import { revalidatePath } from "next/cache";

const NEXT_PUBLIC_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const addAddress = async (data: { userId: string, addressLine: string, city: string, area: string }) => {
    try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/addresses/add-address`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        revalidatePath("/user/cart");

        return { success: true, result };
    }
    catch (err) {
        return { success: false, message: "Internal Server Error" }
    }
};

export const getAddress = async (id: string) => {
    try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/addresses/${id}`);
        const result = await res.json();

        return result;
    }
    catch (err) {
        return { success: false, message: "Internal Server Error" }
    }
}

