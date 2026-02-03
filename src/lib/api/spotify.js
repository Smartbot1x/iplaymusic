/**
 * Core Spotify API utilities
 */
import { cookies } from "next/headers";

/**
 * Get the Spotify access token from cookies or parameter
 * @param {string} [accessToken] - Optional access token to use
 * @returns {Promise<string|undefined>} The access token
 */
export async function getToken(accessToken) {
    return accessToken ?? (await cookies()).get("IPM_AT")?.value;
}

/**
 * Make an authenticated fetch request to the Spotify API
 * @param {string} url - The Spotify API endpoint URL
 * @param {string} token - The access token
 * @returns {Promise<object>} The JSON response
 * @throws {Error} If the request fails
 */
export async function spotifyFetch(url, token) {
    const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    if (!res.ok) {
        const errorMessages = {
            401: "Access token expired or invalid. Please log in again.",
            403: "Missing permissions. Please log out and log in again to grant required permissions.",
            404: "Resource not found.",
            429: "Too many requests. Please wait a moment.",
        };
        const message = errorMessages[res.status] || `Spotify API error: ${res.status}`;
        throw new Error(message);
    }

    return res.json();
}
