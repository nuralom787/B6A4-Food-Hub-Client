"use client";

import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from 'sweetalert2'
import { getCartAction, removeFromCartAction } from "@/app/actions/cartAction";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { getAddress } from '@/app/actions/addAddressAction';
import { createOrder } from '@/app/actions/orderAction';
import { toast } from 'react-toastify';

import { env } from "@/env";

const NEXT_PUBLIC_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL

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
};

export interface Address {
    id: string
    userId: string,
    addressLine: string,
    city: string,
    area: string
    createdAt: Date
    updatedAt: Date
};

export interface Item {
    mealId: string
    quantity: string
    price: number
};


const CartPage = () => {
    const [cart, setCart] = useState<Cart>();
    const [addresses, setAddresses] = useState([]);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        const loadCart = async () => {
            const cart = await getCartAction(session?.user.id as string);
            // console.log(cart)
            setCart(cart.data)
        };
        loadCart();
        const loadAddress = async () => {
            const addresses = await getAddress(session?.user.id as string);
            // console.log(addresses)
            setAddresses(addresses.res)
        };
        loadAddress();
    }, [session]);

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
    };

    const placeOrder = async () => {
        const { addressLine, city, area } = addresses[0];
        const menuItems = cart?.items as Item[];

        const customerId = session?.user.id;
        const totalAmount = Number(cart?.total.toFixed(2));
        const orderItems = menuItems?.map(item => ({
            mealId: item.mealId,
            quantity: item.quantity,
            price: item.price
        }));
        const deliveryAddress = `${addressLine}, ${city}, ${area}`;

        const data = { customerId, totalAmount, orderItems, deliveryAddress };

        const createOrder = async () => {
            const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/orders/placed-order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            return result;
        };

        toast.promise(createOrder(),
            {
                pending: "Placing Your Order...",
                success: "Order Placed Successfully.",
                error: "somethings went Wrong! please try again ❌",
            }
        );
    }

    return (
        <div className="my-16">
            <div className='flex items-center justify-between gap-6'>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <ShoppingBag className="text-primary" />Total Item's In Cart ({cart?.total_count})
                </h1>
                <Button asChild variant={"outline"}>
                    <Link href={"/user/add-address"}>Add Address</Link>
                </Button>
            </div>
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
                        <Card className="sticky top-24 py-6">
                            <CardHeader>
                                <h2 className="text-xl font-bold mb-4">Addresses</h2>
                                <div className='grid grid-cols-1 gap-3'>
                                    {
                                        addresses?.map((address: Address) => <div
                                            key={address.id}
                                            className='border border-gray-400 rounded-md p-4'
                                        >
                                            <p className='text-base font-semibold'>{address.addressLine}</p>
                                            <small className='text-sm font-medium'>{address.city}</small>
                                        </div>)
                                    }
                                </div>
                            </CardHeader>
                            <CardContent className="">
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
                                <Button
                                    onClick={placeOrder}
                                    variant={"outline"}
                                    disabled={!cart?.items.length}
                                    className="w-full mt-6 py-6 text-lg gap-2 cursor-pointer"
                                >
                                    Placed Order <ArrowRight size={20} />
                                    {/* <Link href={"/user/checkout"}> */}
                                    {/* </Link> */}
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