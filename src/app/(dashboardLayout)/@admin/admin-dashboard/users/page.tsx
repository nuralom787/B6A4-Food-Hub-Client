"use client";
export const dynamic = 'force-dynamic';

import { env } from "@/env";
import { Customer } from "@/types/customer.types";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const loadCustomers = async () => {
            const res = await fetch(`${BACKEND_URL}/api/customers`);
            const result = await res.json();
            console.log(result)
            setCustomers(result);
        }
        loadCustomers()
    }, []);


    const handleStatusChange = async (userId: string, newStatus: string) => {
        const updatePromise = fetch(`${BACKEND_URL}/api/customers/update-status?userId=${userId}&status=${newStatus}`, {
            method: 'PATCH',
        }).then(async (res) => {
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update");
            }
            return res.json();
        });

        toast.promise(updatePromise, {
            pending: "Updating Status...",
            success: "Successfully updated.",
            error: "Something went Wrong! please Try again",
        });
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-extrabold mb-8 tracking-tight">All Users (Customers/providers) Both</h1>
            <div className="rounded-md border bg-white dark:bg-slate-950">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-20">Image</TableHead>
                            <TableHead>Name & Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Joining Date</TableHead>
                            <TableHead>Account Type</TableHead>
                            <TableHead className="text-right">Action (Status)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map((customer: Customer) => (
                            <TableRow key={customer.id} className="hover:bg-muted/30">
                                <TableCell>
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarImage src={customer.image} alt={customer.name} />
                                        <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-800 dark:text-slate-200">{customer.name}</span>
                                        <span className="text-xs text-muted-foreground">{customer.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm">{customer.phone}</TableCell>
                                <TableCell className="text-sm">
                                    {new Date(customer.createdAt).toLocaleDateString('en-BD', {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    })}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-normal capitalize">
                                        {customer.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Select
                                        defaultValue={customer.status}
                                        onValueChange={(value) => handleStatusChange(customer.id, value)}
                                    >
                                        <SelectTrigger className="w-35 ml-auto border-dashed">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customer.status !== "ACTIVE" && (
                                                <SelectItem value="ACTIVE">
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-2 w-2 rounded-full bg-green-500" />
                                                        <span>Active</span>
                                                    </div>
                                                </SelectItem>
                                            )}
                                            {customer.status !== "SUSPENDED" && (
                                                <SelectItem value="SUSPENDED">
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-2 w-2 rounded-full bg-red-500" />
                                                        <span>Suspend</span>
                                                    </div>
                                                </SelectItem>
                                            )}
                                            <SelectItem value={customer.status} className="hidden">
                                                <div className="flex items-center gap-2">
                                                    <span className={`h-2 w-2 rounded-full ${customer.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    <span className="capitalize">{customer.status.toLowerCase()}</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default CustomersPage;