"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/hooks/use-Cart";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const AddToCartBtn = ({ meal }: { meal: any }) => {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAdd = () => {
        addToCart({
            id: meal.id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
            quantity: 1
        });
        toast.success("Add to cart successfully!");
    };

    return (
        <Button onClick={handleAdd} size="lg" className="flex-1 gap-2 cursor-pointer">
            <ShoppingCart size={20} /> Add to Cart
        </Button>
    );
};

export default AddToCartBtn;