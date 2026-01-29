"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../../hooks/use-Cart";
import Link from "next/link";

const CartNavbarItem = () => {
    const cart = useCartStore((state) => state.cart);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Link href="/user/cart" className="relative border-none outline-none cursor-pointer hover:bg-transparent" >
                <ShoppingCart size={25} />
            </Link>
        );
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Link href="/user/cart" className="relative border-none outline-none cursor-pointer hover:bg-transparent" >
            <ShoppingCart size={25} />
            {
                totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in" >
                        {totalItems}
                    </span>
                )
            }
        </Link>
    );
};

export default CartNavbarItem;