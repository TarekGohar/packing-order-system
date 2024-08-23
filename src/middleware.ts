import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Retrieve the cookie from the incoming request
  const cookie = request.cookies.get("gtsession");

  // Extract the pathname from the request URL
  const { pathname } = new URL(request.url);

  // Avoid redirecting if the user is on the login or signup page
  if (pathname === "/signin" || pathname === "/signup") {
    // Allow the request to continue without redirect
    return NextResponse.next();
  }

  // If the cookie does not exist and the user is not on login/signup, redirect them to the login page
  if (!cookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  } else {
    const response = NextResponse.next();
    response.cookies.set("gtsession", cookie.value, {
      maxAge: 3600, // 1 hour in seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/images|.*\\.svg$).*)"],
};

//https://nextjs.org/docs/app/building-your-application/authentication
