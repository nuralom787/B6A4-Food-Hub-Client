// import { number, string } from "zod"

export interface OrderItems {
    id: string
    mealId: string
    orderId: string
    price: number
    quantity: number
}

export interface Order {
    id: string;
    customerId: string;
    deliveryAddress: string;
    orderItems: OrderItems[];
    paymentMethod: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}