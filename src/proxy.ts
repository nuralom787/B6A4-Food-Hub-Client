import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isCustomer = false;
  let isProvider = false;
  let isAdmin = false;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true
    isCustomer = data.user.role === Roles.customer;
    isProvider = data.user.role === Roles.provider;
    isAdmin = data.user.role === Roles.admin;
  };

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  };

  if (isCustomer && (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/provider-dashboard"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  };

  if (isProvider && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin-dashboard"))) {
    return NextResponse.redirect(new URL("/provider-dashboard", request.url));
  };

  if (isAdmin && (pathname.startsWith("/dashboard") || pathname.startsWith("/provider-dashboard"))) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  };

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
