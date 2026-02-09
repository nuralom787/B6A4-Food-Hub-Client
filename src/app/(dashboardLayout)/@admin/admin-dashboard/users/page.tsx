export const dynamic = 'force-dynamic';
import { Customer } from "@/types/customer.types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getAllUsers } from "@/app/actions/usersAction";
import UpdateStatus from "@/components/modules/userStatus/updateStatus";
import { Spinner } from "@/components/ui/spinner";

const CustomersPage = async () => {
    const customers = await getAllUsers();

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-extrabold mb-8 tracking-tight">All Users (Customers/providers) Both</h1>
            {customers ?
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
                            {customers?.map((customer: Customer) => (
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
                                        <UpdateStatus customer={customer} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                :
                <div className="flex justify-center items-center w-full min-h-max">
                    <span className="inline-flex gap-3 items-center text-2xl">
                        <Spinner className="size-7" />
                        Loading...
                    </span>
                </div>
            }
        </div>
    );
};

export default CustomersPage;