"use server";

import { env } from "@/env";
import { userService } from "@/service/user.service";

const BACKEND_URL = env.BACKEND_URL

export const createOrder = async (data: any) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/orders/placed-order`, {
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
        throw err
    }
};

export const getAllOrders = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/orders`);
        const result = await res.json();

        return result;
    }
    catch (err) {
        throw err
    }
};

export const getSpecificOrders = async () => {
    const session = await userService.getSession();

    try {
        const res = await fetch(`${BACKEND_URL}/api/orders/${session?.user?.id}`);
        const result = await res.json();

        return result;
    }
    catch (err) {
        throw err
    }
};