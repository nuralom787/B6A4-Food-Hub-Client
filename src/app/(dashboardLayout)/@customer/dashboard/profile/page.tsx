"use client";
export const dynamic = 'force-dynamic';

import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const { data: session } = authClient.useSession();

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch(`${BACKEND_URL}/api/customers/${session?.user.id}`);
            const result = await res.json();
            setProfile(result);
        };
        loadUser()
    }, [session]);

    return (
        <div>
            <h1>{JSON.stringify(profile)}</h1>
        </div>
    );
};

export default ProfilePage;