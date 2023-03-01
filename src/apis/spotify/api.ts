const SPOTIFY_API_BASE_URL = "https://api.spotify.com";

export const getCurrentTrackStatusNew = async (bearerToken: string) => {
    const currentPlayingUrl = new URL(
        "v1/me/player/currently-playing",
        SPOTIFY_API_BASE_URL
    ).toString();

    const responseRaw = await fetch(currentPlayingUrl, {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
        },
    });
    const responseJson = await responseRaw.json();

    if (responseJson.error) throw responseJson.error;

    return responseJson;
};
