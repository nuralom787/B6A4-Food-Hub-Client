import { getMeals } from "@/app/actions/mealsAction";
import MealCard from "./mealCard";

const Meals = async ({ totalData }: { totalData: number }) => {
    const { data: meals } = await getMeals();

    return (
        <div className="py-10 md:py-12 lg:py-16 lg:px-16 space-y-12">
            <div className="text-center">
                <small className="text-xs md:text-sm font-semibold uppercase">Hot & Spicy</small>
                <h1 className="font-bold text-xl md:text-3xl uppercase text-[#f1620c]">Experience Our Delicious Food</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    meals.slice(0, totalData).map((meal: any) => (
                        <MealCard key={meal.id} meal={meal} />
                    ))
                }
            </div>
        </div>
    );
};

export default Meals;