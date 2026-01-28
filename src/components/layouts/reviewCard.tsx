"use client";

import { Star, Quote, UserCircle } from "lucide-react";

interface ReviewProps {
    review: {
        id: string;
        rating: number;
        comment: string | null;
        customerName: string;
        createdAt: string;
        mealName?: string;
    };
}

export default function ReviewCard({ review }: ReviewProps) {
    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star key={index} className={`w-4 h-4 ${index < rating ? "text-orange-500 fill-orange-500" : "text-gray-300"}`} />
        ));
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col h-full group">
            <Quote className="absolute top-4 right-6 w-8 h-8 text-orange-50 group-hover:text-orange-100 transition-colors" />
            <div className="flex gap-1 mb-4">
                {renderStars(review.rating)}
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed mb-6 grow">
                "{review.comment || "No comment provided."}"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="bg-orange-100 p-2 rounded-full">
                    <UserCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">{review.customerName}</h4>
                    <p className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                </div>
            </div>
            {review.mealName && (
                <div className="mt-3">
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md uppercase font-bold tracking-wider">
                        Ordered: {review.mealName}
                    </span>
                </div>
            )}
        </div>
    );
}