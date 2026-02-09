export const dynamic = 'force-dynamic';
import { getMeals } from "@/app/actions/mealsAction";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Meal } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const MenusPage = async () => {
    const data = await getMeals();

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
            {data?.data ?
                <div>
                    {
                        data?.data?.meals?.map((meal: Meal, idx: number) => <div
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
                :
                <div className="flex justify-center items-center w-full min-h-max">
                    <span className="inline-flex gap-3 items-center text-2xl">
                        <Spinner className="size-7" />
                        Loading...
                    </span>
                </div>
            }
        </div>
    );
};

export default MenusPage;