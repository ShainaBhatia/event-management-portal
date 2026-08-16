import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET
);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("admin-token")?.value;

  // No token → send user to login
  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  try {
    // Check whether the token is valid
    await jwtVerify(token, secret);

    // Token is valid → allow request
    return NextResponse.next();
  } catch {
    // Invalid/expired token → send to login
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};