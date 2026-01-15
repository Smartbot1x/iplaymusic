import { cookies } from "next/headers";


export async function getplaylists(accessToken) {
    const token =
        accessToken ??
        (await cookies()).get("IPM_AT")?.value;

    if (!token) throw new Error("Missing access token");

    const getPlaylists = await fetch(
        "https://api.spotify.com/v1/me/playlists?limit=10",
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        }
    );

    if (!getPlaylists.ok) {
        console.error(
            "Failed to fetch playlists",
            getPlaylists.status,
            await getPlaylists.text()
        );
        return [];
    }

    const playlists = await getPlaylists.json();
    console.log("playlistsData", playlists);

    return playlists.items ?? [];
}


/* export default function getFeaturedPlaylists() {



    return null;

}
export default function getArtist() {



    return null;

} */