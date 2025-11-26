import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const { pathname } = request.nextUrl;
  console.log("Session Cookie in Middleware:", sessionCookie);
  // Redirect authenticated users away from login/signup pages
  if (sessionCookie && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to these routes
  matcher: ["/dashboard", "/login", "/signup"],
};

// import { NextRequest, NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
// export async function proxy(request: NextRequest) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });
//   console.log("MIDDLEWARE SESSION", session);
//   // THIS IS NOT SECURE!
//   // This is the recommended approach to optimistically redirect users
//   // We recommend handling auth checks in each page/route
//   if (!session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   return NextResponse.next();
// }
// export const config = {
//   // Required for auth.api calls
//   matcher: ["/", "/login"], // Specify the routes the middleware applies to
// };
