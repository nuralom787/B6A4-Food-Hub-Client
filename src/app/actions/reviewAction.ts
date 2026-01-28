"use server";

import { promises as fs } from "fs";
import path from "path";

export async function getReviews() {
    try {
        const filePath = path.join(process.cwd(), "/public/reviews.json");

        const fileContent = await fs.readFile(filePath, "utf8");

        const reviews = JSON.parse(fileContent);

        return { success: true, data: reviews };
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return { success: false, message: "Something went wrong while fetching reviews." };
    }
}