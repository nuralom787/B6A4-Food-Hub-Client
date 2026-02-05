"use client";

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
import { toast } from "sonner";
import { Customer } from "@/types/customer.types";

const CustomerCard = (customers: any[]) => {

    const handleStatusChange = (userId: string, newStatus: string) => {
        // এখানে আপনার Prisma/API আপডেট লজিক লিখবেন
        console.log(`User ${userId} status changing to: ${newStatus}`);

        toast.success(`ইউজার স্ট্যাটাস এখন ${newStatus === 'active' ? 'Active' : 'Suspended'}`);
    };

    return (
        <div className="rounded-md border bg-white dark:bg-slate-950">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-20">ছবি</TableHead>
                        <TableHead>নাম ও ইমেইল</TableHead>
                        <TableHead>ফোন</TableHead>
                        <TableHead>যোগদানের তারিখ</TableHead>
                        <TableHead>রোল</TableHead>
                        <TableHead className="text-right">অ্যাকশন (স্ট্যাটাস)</TableHead>
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
                                {new Date(customer.createdAt).toLocaleDateString('bn-BD')}
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
                                    <SelectTrigger className="w-32.5 ml-auto">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                                <span>Active</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="suspend">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-red-500" />
                                                <span>Suspend</span>
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
    );
};

export default CustomerCard;