"use server";

import { env } from "@/env";
import { Meal } from "@/types/types";

const BACKEND_URL = env.BACKEND_URL;

export const getMeals = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/meals`);

        if (!res.ok) {
            throw new Error("Somethings Went Wrong! please try again")
        };

        const meals = await res.json();
        return { success: true, data: meals };
    } catch (error) {
        console.error("Error fetching meals:", error);
        throw error;
    }
};

export const getSingleMeal = async (id: string) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/meals/${id}`);

        if (!res.ok) {
            throw new Error("Somethings Went Wrong! please try again")
        };

        const meal = await res.json();
        return { success: true, data: meal };
    } catch (error) {
        console.error("Error fetching meals:", error);
        throw error;
    }
};

export const createMeals = async (data: Meal) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/meals`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Somethings Went Wrong! please try again")
        };

        const result = await res.json();

        return { success: true, data: result };
    } catch (error) {
        console.error("Error fetching meals:", error);
        throw error;
    }
};