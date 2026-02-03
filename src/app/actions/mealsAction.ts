"use server";

import { Meal } from "@/types/types";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getMeals = async () => {
    try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/meals`);

        if (!res.ok) {
            return { success: false, message: "Something went wrong while fetching meals." }
        };

        const meals = await res.json();
        return { success: true, data: meals };
    } catch (error) {
        console.error("Error fetching meals:", error);
        return { success: false, message: "Something went wrong while fetching meals." };
    }
};

export const getSingleMeal = async (id: string) => {
    try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/meals/${id}`);

        if (!res.ok) {
            return { success: false, message: "Something went wrong while fetching meals." }
        };

        const meal = await res.json();
        return { success: true, data: meal };
    } catch (error) {
        console.error("Error fetching meals:", error);
        return { success: false, message: "Something went wrong while fetching meals." };
    }
};

export const createMeals = async (data: Meal) => {
    try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/meals`, {
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

        return { success: true, data: result };
    } catch (error) {
        // console.error("Error fetching meals:", error);
        return { success: false, message: "Something went wrong while fetching meals." };
    }
};