"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { env } from "@/env";
import { Customer } from "@/types/customer.types";
import { toast } from "react-toastify";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const UpdateStatus = ({ customer }: { customer: Customer }) => {

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
    );
};

export default UpdateStatus;