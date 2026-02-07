"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { User } from "lucide-react";

const DashboardBtn = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer rounded-full">
                    <User className="" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-100 font-semibold text-sm">
                <DropdownMenuItem className="cursor-pointer">
                    <Link href="/dashboard/profile">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <p className="cursor-pointer" onClick={() => authClient.signOut()}>Logout</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DashboardBtn;