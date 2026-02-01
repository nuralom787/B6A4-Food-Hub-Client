import { getSingleProvider } from "@/app/actions/providerAction";
import MealCard from "@/components/layouts/mealCard";
import { Meal } from "@/types/types";
import { MapPin } from "lucide-react";
import Image from "next/image";

const providers = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    const { data } = await getSingleProvider(id);

    const { businessName, address, description, imageUrl, meals } = data;

    // console.log("From Providers: ", data)
    return (
        <div className="p-4 space-y-8">
            <div className="flex gap-6">
                <Image
                    width={400}
                    height={400}
                    src={imageUrl === 'something' ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5' : imageUrl}
                    alt="Food Hub Providers"
                    loading="lazy"
                    className="rounded-md"
                />
                <div className="p-4 bg-white dark:bg-background w-full rounded-md space-y-4">
                    <h1 className="text-4xl font-semibold uppercase">{businessName}</h1>
                    <small className="text-base font-medium inline-flex gap-4"><MapPin /> {address}</small>
                    <p>{description}</p>
                </div>
            </div>
            <hr />
            <h1 className="my-6">Meal From <span className="uppercase font-bold text-lg">{businessName}</span></h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    meals?.map((meal: any) => <MealCard key={meal.id} meal={meal}></MealCard>)
                }
            </div>
        </div>
    );
};

export default providers;