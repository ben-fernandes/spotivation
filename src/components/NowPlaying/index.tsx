import React, { useCallback, useContext, useEffect, useState } from "react";
import { SpotifyContext } from "../../contexts/SpotifyContext";
import AlbumArt from "./AlbumArt";
import SongInfo from "./SongInfo";

const NowPlaying = () => {
    const spotifyContext = useContext(SpotifyContext);
    const [artworkUrl, setArtworkUrl] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [songArtist, setSongArtist] = useState("");
    const [progressMs, setProgressMs] = useState(0);
    const [durationMs, setDurationMs] = useState(0);

    const loadTrackStatusData = useCallback(async () => {
        if (!spotifyContext.isSignedIn) return;
        const result = await spotifyContext.getCurrentTrackStatus();
        result.item && setArtworkUrl(result.item.album.images[0].url);
        result.item && setSongTitle(result.item.name);
        result.item && setSongArtist(result.item.artists[0].name);
        result.progress_ms && setProgressMs(result.progress_ms);
        result.item && setDurationMs(result.item.duration_ms);
    }, [spotifyContext]);

    useEffect(() => {
        const timerId = setInterval(loadTrackStatusData, 1000 * 2);
        return () => clearInterval(timerId);
    }, [loadTrackStatusData]);

    return (
        <div className="relative flex-grow">
            <div className="absolute inset-0 m-8 text-white rounded-md grid gap-4 grid-cols-2 grid-rows-1 items-center justify-items-center">
                <AlbumArt src={artworkUrl} />
                <SongInfo
                    songTitle={songTitle}
                    songArtist={songArtist}
                    progressMs={progressMs}
                    durationMs={durationMs}
                />
            </div>
        </div>
    );
};

export default NowPlaying;
