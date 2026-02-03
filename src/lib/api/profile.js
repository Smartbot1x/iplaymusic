/**
 * Profile Service - User profile information
 */
import { getToken, spotifyFetch } from "./spotify.js";

/**
 * Get the current user's Spotify profile
 * @param {string} [accessToken] - Optional access token
 * @returns {Promise<object|null>} The user profile object or null
 */
export async function getUserProfile(accessToken) {
    const token = await getToken(accessToken);
    if (!token) throw new Error("Missing access token");

    try {
        const profile = await spotifyFetch(
            "https://api.spotify.com/v1/me",
            token
        );
        return profile;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return null;
    }
}
