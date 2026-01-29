"use client";

import { useCartStore } from "@/hooks/use-Cart";

const CartPage = () => {
    const cart = useCartStore((state) => state.cart);


    return (
        <div>
            <h1>Cart Page {JSON.stringify(cart)}</h1>
        </div>
    );
};

export default CartPage;