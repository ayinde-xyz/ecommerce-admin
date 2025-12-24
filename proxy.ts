import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  // const sessionCookie =
  //   request.cookies.get("better-auth.session_token") ||
  //   request.cookies.get("__Secure-better-auth.session_token");

  // const { pathname } = request.nextUrl;

  // // Redirect unauthenticated users trying to access protected routes
  // if (!sessionCookie && pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/auth/signup", request.url));
  // }
  // console.log("Session Cookie in Middleware:", sessionCookie);
  // // Redirect authenticated users away from login/signup pages
  // if (sessionCookie && ["/auth/login", "/auth/signup"].includes(pathname)) {
  //   return NextResponse.redirect(new URL("/dashboard/[storeId]", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to these routes
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
