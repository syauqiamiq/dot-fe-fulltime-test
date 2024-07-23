import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	let authCookie: any = request.cookies.get("auth-Cookie");

	if (
		!request.cookies.has("auth-Cookie") &&
		request.nextUrl.pathname !== "/login"
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (
		request.nextUrl.pathname === "/login" &&
		request.cookies.has("auth-Cookie")
	) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/login"],
};
