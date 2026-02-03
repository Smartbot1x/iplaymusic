import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();

    // Delete the access and refresh tokens
    cookieStore.delete("IPM_AT");
    cookieStore.delete("IPM_RT");

    return NextResponse.json({ success: true });
}
