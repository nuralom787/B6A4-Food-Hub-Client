import { Star, Clock, ShoppingCart, User, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import AddToCartBtn from '@/components/modules/instance/addToCartBtn';
import { getSingleMeal } from '@/app/actions/mealsAction';


const MealDetails = async ({ params, }: { params: Promise<{ mealId: string }> }) => {
    const { mealId } = await params;
    const { data } = await getSingleMeal(mealId);

    const meal = data.meal;

    // const meal = {
    //     id: mealId,
    //     title: "Grilled Chicken Teriyaki Bowl",
    //     description: "Freshly grilled chicken served with steamed broccoli, carrots, and our signature teriyaki sauce over a bed of jasmine rice.",
    //     price: 12.99,
    //     imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    //     providerId: "Health Kitchen BD",
    //     rating: 4.8,
    //     reviewsCount: 124,
    //     prepTime: "20-30 min",
    //     categoryId: "Healthy",
    //     isAvailable: "Available"
    // };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative rounded-2xl overflow-hidden shadow-lg w-full h-full">
                    <Image
                        src={meal.imageUrl}
                        alt={meal.title}
                        loading='lazy'
                        fill
                        className="w-full h-full"
                    />
                    {/* <Badge className="absolute top-4 left-4 bg-green-500">{meal.category}</Badge> */}
                </div>
                <div className="flex flex-col space-y-5">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{meal.title}</h1>
                        <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center text-yellow-500">
                                <Star size={18} fill="currentColor" />
                                <span className="ml-1 font-semibold text-orange-500">{meal.rating}</span>
                            </div>
                            <span className="text-gray-400">({meal.reviewsCount} Reviews)</span>
                            <span className="flex items-center text-gray-500">
                                <Clock size={18} className="mr-1" /> {meal.prepTime}
                            </span>
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {meal.description}
                    </p>
                    <div className="text-3xl font-bold text-primary">
                        ${meal.price}
                    </div>
                    <Card className="bg-slate-50 dark:bg-gray-800 border-none">
                        <CardContent className="p-4 flex items-center space-x-3">
                            <div className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm">
                                <User className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-200 italic">Provided by</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{meal.provider}</p>
                            </div>
                            <CheckCircle size={16} className="text-blue-500 ml-auto" />
                        </CardContent>
                    </Card>
                    <div className="flex gap-4 pt-4">
                        <AddToCartBtn meal={meal} />
                        <Button size="lg" variant="outline" className=' cursor-pointer'>
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-16 border-t pt-8">
                <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-xl shadow-sm bg-white">
                        <div className="flex text-yellow-500 mb-2"><Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /></div>
                        <p className="text-sm text-gray-600">"The taste was amazing! High quality ingredients."</p>
                        <p className="text-xs mt-3 font-bold text-gray-400">- User Name</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;