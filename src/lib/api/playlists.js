/**
 * Playlist Service - Fetch and manage user playlists
 */
import { getToken, spotifyFetch } from "./spotify.js";

/**
 * Get all user playlists with their tracks
 * @param {string} [accessToken] - Optional access token
 * @returns {Promise<Array>} Array of playlist objects with tracks
 */
export async function getPlaylists(accessToken) {
    const token = await getToken(accessToken);
    if (!token) throw new Error("Missing access token");

    try {
        const playlists = await spotifyFetch(
            "https://api.spotify.com/v1/me/playlists?limit=10",
            token
        );

        // Fetch tracks for each playlist
        const playlistsWithTracks = await Promise.all(
            (playlists.items ?? []).map(async (playlist) => {
                try {
                    const tracks = await spotifyFetch(
                        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks?limit=20`,
                        token
                    );
                    return { ...playlist, tracks };
                } catch (error) {
                    console.error(`Failed to fetch tracks for ${playlist.id}:`, error);
                    return playlist;
                }
            })
        );

        return playlistsWithTracks;
    } catch (error) {
        console.error("Failed to fetch playlists:", error);
        return [];
    }
}

/**
 * Get a single playlist by ID with all its tracks
 * @param {string} playlistId - The Spotify playlist ID
 * @param {string} [accessToken] - Optional access token
 * @returns {Promise<object|null>} The playlist object or null
 */
export async function getPlaylistById(playlistId, accessToken) {
    const token = await getToken(accessToken);
    if (!token) throw new Error("Missing access token");

    try {
        const playlist = await spotifyFetch(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            token
        );
        return playlist;
    } catch (error) {
        console.error(`Failed to fetch playlist ${playlistId}:`, error);
        return null;
    }
}
