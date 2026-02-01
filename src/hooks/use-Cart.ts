import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (item) => set((state) => {
                const existingItem = state.cart.find((i) => i.id === item.id);
                if (existingItem) {
                    return {
                        cart: state.cart.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    };
                }
                return { cart: [...state.cart, { ...item, quantity: 1 }] };
            }),
            removeFromCart: (id) => set((state) => ({
                cart: state.cart.filter((i) => i.id !== id),
            })),
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: 'food-hub-cart',
            storage: createJSONStorage(() => localStorage)
        }
    )
);