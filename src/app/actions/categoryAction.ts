"use server";

import { promises as fs } from "fs";
import path from "path";

export async function getCategories() {
    try {
        const filePath = path.join(process.cwd(), "/public/caregories.json");

        const fileContent = await fs.readFile(filePath, "utf8");

        const categories = JSON.parse(fileContent);

        return { success: true, data: categories };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { success: false, message: "Something went wrong while fetching categories." };
    }
}