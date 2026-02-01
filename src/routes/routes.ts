import { Route } from "@/types/routes.type";

export const customerRoutes: Route[] = [
  {
    items: [
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
        title: "Analytics",
        url: "/admin-dashboard/analytics",
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
        title: "Customers",
        url: "/admin-dashboard/customers",
      },
      {
        title: "Providers",
        url: "/admin-dashboard/providers",
      },
    ],
  },
];

