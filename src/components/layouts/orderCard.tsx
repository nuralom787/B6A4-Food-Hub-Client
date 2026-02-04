import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, CreditCard, Calendar } from "lucide-react";

const OrderCard = ({ order }: { order: any }) => {
    const date = new Date(order.createdAt).toLocaleDateString("en-BD", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Card className="w-full mb-6 overflow-hidden transition-all hover:shadow-md dark:bg-slate-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/50 p-4 dark:bg-slate-900/50">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-medium text-muted-foreground">ORDER ID</CardTitle>
                    <p className="font-mono text-xs font-bold uppercase tracking-tighter">#{order.id.split('-')[0]}...</p>
                </div>
                <Badge
                    variant={order.status === "PENDING" ? "outline" : "default"}
                    className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400"
                >
                    {order.status}
                </Badge>
            </CardHeader>
            <CardContent className="grid gap-6 p-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex items-start gap-3 text-sm">
                        <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                        <div>
                            <p className="font-semibold">Delivery Address</p>
                            <p className="text-muted-foreground leading-relaxed">{order.deliveryAddress}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <div>
                            <p className="font-semibold">Payment Method</p>
                            <p className="text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div>
                            <p className="font-semibold">Order Date</p>
                            <p className="text-muted-foreground">{date}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 border-b pb-2">
                        <Package className="h-4 w-4" />
                        <span className="text-sm font-bold">Order Summery</span>
                    </div>
                    <div className="space-y-2">
                        {order?.orderItems?.map((item: any) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{item.meal.title}</span>
                                <span className="text-muted-foreground">Item (x{item.quantity})</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t pt-3 font-bold">
                        <span>Total</span>
                        <span className="text-lg text-primary">${order.totalAmount}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderCard;