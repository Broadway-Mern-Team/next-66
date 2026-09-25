import { NextRequest, NextResponse } from "next/server";
import { use } from "react";


type Role = "admin" | "customer" | "seller"


const ROUTE_ROLE: Record<string, Role> = {
  '/admin': "admin",
  "/customer": "customer",
  "/seller": "seller"
}


const HOME: Record<Role, string> = {
  admin: "/admin",
  seller: "/seller",
  customer: "/customer"
}

function redirectToLogin(request: NextRequest) {
  const url = new URL("/login", request.url); // /login, /admin/customer/create
  // url.searchParams.set("from", request.nextUrl.pathname)   // /login?from=/admin/customer/create
  return NextResponse.redirect(url);
}


export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/seller/:path*"]
}

export async function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // pathname needs which role?
  // /admin/user
  const requiredRole = Object.entries(ROUTE_ROLE).find(([base]) => {
    return pathname === base || pathname.startsWith(base+'/')
  })?.[1]

  // skipped route which does not require role
  if(!requiredRole) {
    return NextResponse.next();
  }

  // token  if logged in user has token
  const token = request.cookies.get("token")?.value;
  if(!token) {
    return redirectToLogin(request)
  }

  try {
    const userDetail = {role: "admin"};

    const role = userDetail.role as Role | undefined;
    if(role !== requiredRole) {
      const home = role && HOME[role] ? HOME[role] : '/login'
      return NextResponse.redirect(new URL(home, request.url))
    }

    return NextResponse.next()
  } catch {
    const res = redirectToLogin(request)
    res.cookies.delete("token")
    return res;
  }
}