import { REDIRECT_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./constants";
import { Buffer } from "buffer";

const SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com";

export const getTokens = async (code: string, codeVerifier: string) => {
    const formData = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URL,
        client_id: SPOTIFY_CLIENT_ID,
        code_verifier: codeVerifier,
    }).toString();

    const tokenUrl = new URL("api/token", SPOTIFY_AUTH_BASE_URL).toString();
    const authString = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
        "base64"
    );

    const responseRaw = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            Authorization: `Basic ${authString}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
    });

    const responseJson = await responseRaw.json();

    if (responseJson.error) throw responseJson.error;

    return responseJson;
};
