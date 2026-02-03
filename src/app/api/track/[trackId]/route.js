import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { trackId } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("IPM_AT");

    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const res = await fetch(
            `https://api.spotify.com/v1/tracks/${trackId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`,
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch track" },
                { status: res.status }
            );
        }

        const track = await res.json();
        return NextResponse.json(track);
    } catch (error) {
        console.error("Error fetching track:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
