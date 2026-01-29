"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import CartNavbarItem from "../modules/instance/cartNavbarItem";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo1.jpg",
    alt: "logo",
  },
  menu = [
    {
      title: "HOME",
      url: "/"
    },
    {
      title: "MENUS",
      url: "/menus",
    },
    {
      title: "ORDERS",
      url: "/orders",
    }
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const { data: session } = authClient.useSession();

  return (
    <section className={cn("py-4", className)}>
      <div className=" max-w-screen-2xl mx-auto px-6">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                height={100}
                width={100}
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => <Link
                    key={item.title}
                    href={item.url}
                    className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md">
                    {item.title}
                  </Link>)
                  }
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <CartNavbarItem />
            <ModeToggle />
            {!session?.session ?
              <div className="flex gap-2">
                <Button asChild variant="outline" className="cursor-pointer">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild variant="outline" className="cursor-pointer">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
              :
              <div className="flex gap-2">
                <Button
                  variant={"outline"}
                  className="cursor-pointer"
                  onClick={() => authClient.signOut()}
                >
                  Logout
                </Button>
              </div>
            }
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                height={100}
                width={100}
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <Image
                        height={100}
                        width={100}
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => <Link
                      key={item.title}
                      href={item.url}
                      className="text-md font-semibold">
                      {item.title}
                    </Link>)
                    }
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <ModeToggle />
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
