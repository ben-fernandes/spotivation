import axiosService from "../../services/axiosService";

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

export const getCurrentTrackStatusNew = async () => {
    const response = await axiosService.get<CurrentlyPlaying>("/me/player/currently-playing");
    return response.data;
};

export const getQueueNew = async () => {
    const response = await axiosService.get<Queue>("/me/player/queue");
    return response.data;
};
