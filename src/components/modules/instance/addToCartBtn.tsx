"use client"

import { addToCartAction } from "@/app/actions/cartAction";
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddToCartBtn = ({ meal }: { meal: any }) => {
    const { data: session } = authClient.useSession();
    const userId = session?.user.id as string;

    const handleAdd = async () => {
        if (!userId) {
            Swal.fire({
                title: "No User",
                text: "Please login with your account!",
                icon: "warning"
            });
            return;
        };

        const mealData = { meal, userId }

        toast.promise(
            addToCartAction(mealData),
            {
                pending: "Adding into cart...",
                success: "Successfully Added 🛒",
                error: "somethings went Wrong! please try again ❌",
            }
        );
    };

    return (
        <Button onClick={handleAdd} size="lg" className="flex-1 gap-2 cursor-pointer">
            <ShoppingCart size={20} /> Add to Cart
        </Button>
    );
};

export default AddToCartBtn;