import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Admin credentials
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // signed authentication token
    const token = await new SignJWT({
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

    
    const response = NextResponse.json({
      message: "Login successful",
    });

    
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}