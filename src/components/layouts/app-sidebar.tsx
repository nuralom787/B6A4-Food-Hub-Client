import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Roles } from "@/constants/roles";
import { customerRoutes, providerRoutes, adminRoutes } from "@/routes/routes";
import { Route } from "@/types/routes.type";
import Image from "next/image";
import logo from "../../../public/logo1.jpg";
import { Separator } from "../ui/separator";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user.role) {
    case Roles.customer:
      routes = customerRoutes;
      break;
    case Roles.provider:
      routes = providerRoutes;
      break;
    case Roles.admin:
      routes = adminRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center justify-center py-3">
        <div className="relative h-10 w-24">
          <Image
            src={logo.src}
            alt="Food Hub Logo"
            loading="lazy"
            fill
            className="h-full w-full"
          />
        </div>
      </SidebarHeader>
      <Separator
        orientation="horizontal"
        className=""
      />
      <SidebarContent>
        {routes.map((item, idx) => (
          <SidebarGroup key={idx}>
            {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
