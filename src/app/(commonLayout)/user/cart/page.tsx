"use client";

import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from 'sweetalert2'
import { getCartAction, removeFromCartAction } from "@/app/actions/cartAction";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export interface Cart {
    id: string;
    userId: string;
    items: object[];
    total_count: number;
    subtotal: number;
    deliveryFee: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

const CartPage = () => {
    const [cart, setCart] = useState<Cart>();
    const { data: session } = authClient.useSession();

    useEffect(() => {
        const loadCart = async () => {
            const cart = await getCartAction(session?.user.id as string);
            console.log(cart)
            setCart(cart.data)
        }
        loadCart()
    }, [session])

    const handleRemoveCart = async (id: string) => {
        Swal.fire({
            title: "Do you want to remove this item from cart?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await removeFromCartAction(id);
                if (res.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Item remove from cart successfully",
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div className="my-16">
            <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <ShoppingBag className="text-primary" />Total Item's In Cart ({cart?.total_count})
            </h1>
            <div className="container mx-auto p-10 bg-white dark:bg-slate-800 rounded-md my-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-4">
                        {cart?.items?.map((item: any) => (
                            <Card key={item?.id} className="p-4 overflow-hidden border border-gray-600 shadow-sm bg-slate-50 dark:bg-background">
                                <CardContent className="px-1.5 flex justify-between items-center gap-6">
                                    <div className="flex items-center gap-6">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-24 h-24 rounded-lg object-cover"
                                        />
                                        <div className="">
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="text-primary font-bold">Per Item: ${item.price}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="font-medium">Item: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p className="font-bold text-lg">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="items-end">
                                        <Button onClick={() => handleRemoveCart(item.id)} variant={"ghost"} size={"icon"} className="text-red-500 hover:text-red-700 cursor-pointer">
                                            <Trash2 size={20} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 py-0">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-4">Order Summery</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-400 font-medium">
                                        <span>Subtotal</span>
                                        <span>${cart?.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 font-medium">
                                        <span>Delivery Charge</span>
                                        <span>${cart?.deliveryFee.toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-red-500 dark:text-white">${cart?.total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button disabled={!cart?.items.length} variant={"outline"} className="w-full mt-6 py-6 text-lg gap-2 cursor-pointer">
                                    Checkout <ArrowRight size={20} />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;