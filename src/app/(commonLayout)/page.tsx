import { Hero } from "@/components/layouts/hero"
import foodLogo from "../../../public/chiken.jpg";

export default async function Home() {

  return (
    <div>
      <Hero
        badge="Hot For Every Sunday"
        heading="Enjoy our delicious food"
        description="Savor the taste of our delicious, expertly crafted dishes made with the finest ingredients, offering a perfect blend of flavors."
      />
    </div>
  );
}
