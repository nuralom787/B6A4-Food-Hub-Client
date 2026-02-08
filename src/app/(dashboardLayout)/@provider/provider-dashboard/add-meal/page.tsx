export const dynamic = 'force-dynamic';
import MealForm from "@/components/modules/meals/meal-form";
import { userService } from "@/service/user.service";

const AddMealPage = async () => {
    const { session, user } = await userService.getSession();

    return (
        <div>
            <MealForm userData={user} />
        </div>
    );
};

export default AddMealPage;