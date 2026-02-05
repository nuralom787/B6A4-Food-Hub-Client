"use client";

import OrderCard from "@/components/layouts/orderCard";
import { env } from "@/env";
import { OrderItems } from "@/types/order.types";
import { useEffect, useState } from "react";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const ViewOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const res = await fetch(`${BACKEND_URL}/api/orders`);
            const result = await res.json();
            setOrders(result);
        }
        loadOrders();
    }, []);


    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-extrabold mb-8 tracking-tight">All Orders</h1>
            <div className="flex flex-col gap-2">
                {orders.map((order: OrderItems) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
};

export default ViewOrdersPage;