import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import bannerLogo from "../../../public/chiken.jpg";
import Image from "next/image";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
}

const Hero = ({
  badge,
  heading,
  description
}: Hero1Props) => {
  return (
    <section className={cn("py-4")}>
      <div className="container">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12  p-16 rounded-lg">
          <div className="gap-5 flex flex-col items-center text-center lg:items-start lg:text-left">
            <p>
              {badge}
            </p>
            <h1 className="text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild className="w-full sm:w-auto">
                <a href="/">
                  Order Now →
                </a>
              </Button>
            </div>
          </div>
          <Image
            src={bannerLogo}
            alt={"image.alt"}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
