"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getCartAction } from "@/app/actions/cartAction";
import { authClient } from "@/lib/auth-client";
import { Cart } from "@/app/(commonLayout)/user/cart/page";

const CartNavbarItem = () => {
    const { data: session } = authClient.useSession();
    const [cart, setCart] = useState<Cart>();

    useEffect(() => {
        const loadCart = async () => {
            const cart = await getCartAction(session?.user.id as string);
            setCart(cart.data)
        }
        loadCart()
    }, [session])

    return (
        <Link href="/user/cart" className="relative border-none outline-none cursor-pointer hover:bg-transparent" >
            <ShoppingCart size={25} />
            {
                cart?.total_count as number > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in" >
                        {cart?.total_count as number}
                    </span>
                )
            }
        </Link>
    );
};

export default CartNavbarItem;