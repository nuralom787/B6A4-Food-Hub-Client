import { Hero } from "@/components/layouts/hero"
import Categories from "@/components/layouts/categories";
import Meals from "@/components/layouts/meals";
import Reviews from "@/components/layouts/reviews";
import { userService } from "@/service/user.service";

export default async function Home() {

  return (
    <div className="space-y-2 md:space-y-6 lg:space-y-6">
      <Hero
        badge="Hot For Every Sunday"
        heading="Enjoy our delicious food"
        description="Savor the taste of our delicious, expertly crafted dishes made with the finest ingredients, offering a perfect blend of flavors."
      />
      <Categories />
      <Meals totalData={12} />
      <Reviews />
    </div>
  );
}
