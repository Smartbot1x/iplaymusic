/**
 * Top Items Service - User's top artists and tracks
 */
import { getToken, spotifyFetch } from "./spotify.js";

/**
 * Get the user's top artists
 * @param {string} [accessToken] - Optional access token
 * @param {number} [limit=6] - Number of artists to fetch
 * @param {string} [timeRange='medium_term'] - Time range: short_term, medium_term, long_term
 * @returns {Promise<Array>} Array of artist objects
 */
export async function getTopArtists(accessToken, limit = 6, timeRange = "medium_term") {
    const token = await getToken(accessToken);
    if (!token) throw new Error("Missing access token");

    try {
        const data = await spotifyFetch(
            `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`,
            token
        );
        return data.items || [];
    } catch (error) {
        console.error("Failed to fetch top artists:", error);
        return [];
    }
}

/**
 * Get the user's top tracks
 * @param {string} [accessToken] - Optional access token
 * @param {number} [limit=10] - Number of tracks to fetch
 * @param {string} [timeRange='medium_term'] - Time range: short_term, medium_term, long_term
 * @returns {Promise<Array>} Array of track objects
 */
export async function getTopTracks(accessToken, limit = 10, timeRange = "medium_term") {
    const token = await getToken(accessToken);
    if (!token) throw new Error("Missing access token");

    try {
        const data = await spotifyFetch(
            `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
            token
        );
        return data.items || [];
    } catch (error) {
        console.error("Failed to fetch top tracks:", error);
        return [];
    }
}
