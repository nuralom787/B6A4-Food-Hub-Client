"use server";

import { promises as fs } from "fs";
import path from "path";

export async function getMeals() {
    try {
        const filePath = path.join(process.cwd(), "/public/meals.json");

        const fileContent = await fs.readFile(filePath, "utf8");

        const meals = JSON.parse(fileContent);

        return { success: true, data: meals };
    } catch (error) {
        console.error("Error fetching meals:", error);
        return { success: false, message: "Something went wrong while fetching meals." };
    }
};