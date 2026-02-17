"use server";

import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/service/user.service";

const BACKEND_URL = env.BACKEND_URL;

export const getAllUsers = async () => {
    const session = await userService.getSession();

    try {
        const res = await fetch(`${BACKEND_URL}/api/customers?email=${session?.user.email}`);
        const result = await res.json();

        return result;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};