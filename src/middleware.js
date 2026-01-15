import { NextResponse } from "next/server";

export function middleware(request) {
    const isLoggedIn = request.cookies.get("IPM_AT")?.value;

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/error?code=unauthorized", request.url));


    }
}

export const config = {
    matcher: ["/playlist/:path*"],
};
