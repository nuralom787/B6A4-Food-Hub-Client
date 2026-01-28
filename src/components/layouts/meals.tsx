import { getMeals } from "@/app/actions/mealsAction";
import MealCard from "./mealCard";

const Meals = async () => {
    const { data: meals } = await getMeals();

    return (
        <div className="px-5 md:px-10 lg:px-20 py-10 grid gap-8 space-y-12">
            <div className="text-center">
                <small className="text-sm font-semibold uppercase">Hot & Spicy</small>
                <h1 className="font-bold text-3xl uppercase text-[#f1620c]">Experience Our Delicious Food</h1>
            </div>
            <div className="grid grid-cols-4 gap-6">
                {
                    meals.slice(0, 12).map((meal: any) => (
                        <MealCard key={meal.id} meal={meal} />
                    ))
                }
            </div>
        </div>
    );
};

export default Meals;