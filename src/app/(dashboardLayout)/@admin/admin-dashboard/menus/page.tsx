export const dynamic = 'force-dynamic';
import { getMeals } from "@/app/actions/mealsAction";
import { Button } from "@/components/ui/button";
import { Meal } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const MenusPage = async () => {
    const data = await getMeals();
    console.log(data)

    return (
        <div>
            <div className="text-end my-6">
                <Button asChild variant={"outline"}>
                    <Link
                        href={"/manage-menu/create-meal"}
                        className=""
                    >
                        Create New Meal
                    </Link>
                </Button>
            </div>
            <div>
                {
                    data?.data?.meals.map((meal: Meal, idx: number) => <div
                        key={idx}
                        className="flex justify-between items-center gap-10 border border-gray-400 p-4 rounded-md my-2"
                    >
                        <Image
                            src={meal.imageUrl as string}
                            alt={meal.title}
                            height={100}
                            width={100}
                            loading="lazy"
                            className="w-24 h-24 rounded-md"
                        />
                        <div>
                            <p>{meal.title}</p>
                            <p>{meal.description}</p>
                        </div>
                        <div>
                            <p>${meal.price.toFixed(2)}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MenusPage;