import { Route } from "@/types/routes.type";

export const customerRoutes: Route[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },
      {
        title: "My Orders",
        url: "/dashboard/my-orders",
      },
      {
        title: "Reviews",
        url: "/dashboard/reviews",
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];

export const providerRoutes: Route[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/provider-dashboard",
      },
      {
        title: "Add Meal",
        url: "/provider-dashboard/add-meal",
      },
      {
        title: "Manage Menus",
        url: "/provider-dashboard/manage-menus",
      },
      {
        title: "View Orders",
        url: "/provider-dashboard/view-orders",
      },
    ],
  },
];

export const adminRoutes: Route[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "Menus",
        url: "/admin-dashboard/menus",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
      }
    ],
  },
];

