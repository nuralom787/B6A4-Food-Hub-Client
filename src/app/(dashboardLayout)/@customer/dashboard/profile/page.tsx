export const dynamic = 'force-dynamic';
import { userService } from "@/service/user.service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, ShieldCheck } from "lucide-react";
import defaultImage from "../../../../../../public/defaultUser.jpg";

const ProfilePage = async () => {
    const { session, user } = await userService.getSession();


    const joiningDate = new Date(user.createdAt).toLocaleDateString("en-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg dark:bg-slate-900">
                <div className="h-32 bg-linear-to-r from-orange-400 to-orange-600" />
                <CardHeader className="relative pb-0">
                    <div className="absolute -top-16 left-6">
                        <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-900 shadow-xl">
                            <AvatarImage src={user.image || defaultImage} alt={user.name} />
                            <AvatarFallback className="text-2xl font-bold bg-muted">
                                {user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                {user.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="capitalize px-3 py-0.5">
                                    {user.role.toLowerCase()}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={`capitalize px-3 py-0.5 ${user.status === "ACTIVE"
                                        ? "bg-green-500/10 text-green-600 border-green-200"
                                        : "bg-red-500/10 text-red-600 border-red-200"
                                        }`}
                                >
                                    {user.status.toLowerCase()}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <Mail className="h-5 w-5 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Email Address</p>
                                <p className="text-sm font-medium">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <Phone className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Contact No</p>
                                <p className="text-sm font-medium">{"0123456789"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <Calendar className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Member From</p>
                                <p className="text-sm font-medium">{joiningDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <ShieldCheck className={`h-5 w-5 ${user.emailVerified ? "text-indigo-500" : "text-slate-400"}`} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Verification</p>
                                <p className="text-sm font-medium">
                                    {user.emailVerified ? "Verified User" : "Not Verified"}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;