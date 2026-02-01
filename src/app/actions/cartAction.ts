"use server";

import { env } from "@/env";

const BACKEND_URL = env.BACKEND_URL;

export const addToCartAction = async (data: { meal: object, userId: string }) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/cart`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        return { success: true, result };
    }
    catch (err) {
        return { success: false, message: "Internal Server Error" }
    }

};

export const getCartAction = async (userId: string) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/cart/${userId}`);

        const data = await res.json();

        return { success: true, data };
    }
    catch (err) {
        return { success: false, message: "Internal Server Error" }
    }
};

export const removeFromCartAction = async (cartItemId: string) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/cart/${cartItemId}`, {
            method: "DELETE"
        });

        const data = await res.json();

        return { success: true, data: data };
    }
    catch (err) {
        return { success: false, message: "Internal Server Error" }
    }
};