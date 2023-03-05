const SPOTIFY_API_BASE_URL = "https://api.spotify.com";

export interface Artist {
    name: string;
}

export interface Image {
    url: string;
}

export interface Album {
    images: Image[];
}

export interface Track {
    name: string;
    duration_ms: number;
    artists: Artist[];
    album: Album;
}

export interface CurrentlyPlaying {
    item: Track;
    progress_ms: number;
}

export interface Queue {
    currently_playing: Track;
    queue: Track[];
}

const getRequest = async (url: string, bearerToken: string) => {
    const currentPlayingUrl = new URL(url, SPOTIFY_API_BASE_URL).toString();

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

export const getCurrentTrackStatusNew = async (bearerToken: string) => {
    return await getRequest("v1/me/player/currently-playing", bearerToken);
};

export const getQueueNew = async (bearerToken: string): Promise<Queue> => {
    return await getRequest("v1/me/player/queue", bearerToken);
};
