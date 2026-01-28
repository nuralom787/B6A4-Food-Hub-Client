import { Hero } from "@/components/layouts/hero"
import foodLogo from "../../../public/chiken.jpg";
import Categories from "@/components/layouts/categories";
import Meals from "@/components/layouts/meals";
import Reviews from "@/components/layouts/reviews";

export default async function Home() {

  return (
    <div className="space-y-16">
      <Hero
        badge="Hot For Every Sunday"
        heading="Enjoy our delicious food"
        description="Savor the taste of our delicious, expertly crafted dishes made with the finest ingredients, offering a perfect blend of flavors."
      />
      <Categories />
      <Meals />
      <Reviews />
    </div>
  );
}
