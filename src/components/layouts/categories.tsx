import { getCategories } from "@/app/actions/categoryAction";
import { Utensils, Pizza, Hamburger, Coffee, IceCream, Salad } from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
    "Burgers": <Hamburger className="w-8 h-8" />,
    "Pizza": <Pizza className="w-8 h-8" />,
    "Pasta": <Utensils className="w-8 h-8" />,
    "Desserts": <IceCream className="w-8 h-8" />,
    "Beverages": <Coffee className="w-8 h-8" />,
    "Salads": <Salad className="w-8 h-8" />,
};

const Categories = async () => {
    const data = await getCategories();

    return (
        <div className="py-10 md:py-12 lg:py-20 lg:px-16 space-y-12">
            <div className="text-center">
                <small className="text-xs md:text-sm font-semibold uppercase">crispy, every bite taste</small>
                <h1 className="font-bold text-xl md:text-3xl uppercase text-[#f1620c]">Popular Food Items</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.success && data.data.map((category: any) => (
                    <div key={category.id} className="border py-4 px-6 rounded-lg flex justify-between items-center">
                        <h2 className="text-sm md:text-base lg:text-xl font-semibold mb-2">{category.name}</h2>
                        <div className="text-orange-500 group-hover:scale-110 transition-transform duration-300 mb-3">
                            {iconMap[category.name] || <Utensils className="w-8 h-8" />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;