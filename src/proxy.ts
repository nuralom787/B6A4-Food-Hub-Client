import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isCustomer = false;
  let isProvider = false;
  let isAdmin = false;

  const session = await userService.getSession();

  if (session) {
    isAuthenticated = true
    isCustomer = session.user.role === Roles.customer;
    isProvider = session.user.role === Roles.provider;
    isAdmin = session.user.role === Roles.admin;
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
    "/provider-dashboard",
    "/provider-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/user",
    "/user/:path*",
  ],
};

