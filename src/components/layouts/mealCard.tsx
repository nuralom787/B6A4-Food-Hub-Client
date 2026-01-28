"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";

interface MealProps {
    meal: {
        id: string;
        title: string;
        description: string;
        price: number;
        imageUrl: string | null;
        isAvailable: boolean;
    };
}

export default function MealCard({ meal }: MealProps) {
    return (
        <div className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={meal.imageUrl || "/placeholder-food.jpg"}
                    alt={meal.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {!meal.isAvailable && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold px-4 py-2 border-2 border-white rounded-full">
                            Unavailable
                        </span>
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span className="text-xs font-bold text-gray-800">4.5</span>
                </div>
            </div>
            <div className="p-5 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {meal.title}
                    </h3>
                    <span className="text-orange-600 font-bold text-lg">${meal.price}</span>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4 grow">
                    {meal.description}
                </p><button
                    disabled={!meal.isAvailable}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}