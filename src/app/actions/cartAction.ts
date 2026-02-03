"use server";

import { env } from "@/env";
import { updateTag } from "next/cache";

const NEXT_PUBLIC_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const getCartAction = async (userId: string) => {
    try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/cart/${userId}`, { next: { tags: ["cart"] } });

        const data = await res.json();

        return { success: true, data };
    }
    catch (err) {
        return { success: false, message: "Internal Server Error" }
    }
};

export const addToCartAction = async (data: { meal: object, userId: string }) => {
    try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        updateTag("cart");

        return { success: true, result };
    }
    catch (err) {
        return { success: false, message: "Internal Server Error" }
    }

};

export const removeFromCartAction = async (cartItemId: string) => {
    try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/cart/${cartItemId}`, {
            method: "DELETE"
        });

        const data = await res.json();
        updateTag("cart")

        return { success: true, data: data };
    }
    catch (err) {
        return { success: false, message: "Internal Server Error" }
    }
};