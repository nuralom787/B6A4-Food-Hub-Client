"use server";

import { revalidatePath } from "next/cache";

const BACKEND_URL = process.env.BACKEND_URL;

export const getCategories = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/category`);

        if (!res.ok) {
            return { success: false, message: "Something went wrong! Please Try Again." }
        };

        const result = await res.json();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: "Something went wrong while fetching categories." };
    }
};

export const createCategory = async (data: { name: string }) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/category/create-category`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            return { success: false, message: "Something went wrong! Please Try Again." }
        };
        const result = await res.json();
        revalidatePath("/admin-dashboard/categories");
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: "Something went wrong! Please Try Again." };
    }
}