import React, { useCallback, useContext, useEffect, useState } from "react";
import { Track } from "../../apis/spotify/api";
import { SpotifyContext } from "../../contexts/SpotifyContext";
import NextSongInfo from "./NextSongInfo";

const Upcoming = () => {
    const [queue, setQueue] = useState<Track[]>([]);
    const spotifyContext = useContext(SpotifyContext);

    const loadQueueData = useCallback(async () => {
        const result = await spotifyContext.getQueue();
        setQueue(result.queue);
    }, [spotifyContext]);

    useEffect(() => {
        const timerId = setInterval(loadQueueData, 1000 * 2);
        return () => clearInterval(timerId);
    }, [loadQueueData]);

    return (
        <div className="bg-zinc-900/75 text-white p-8">
            <h2 className="text-3xl pb-4">Coming up</h2>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
                {queue[0] && (
                    <NextSongInfo trackName={queue[0].name} artistName={queue[0].artists[0].name} />
                )}
                {queue[1] && (
                    <NextSongInfo trackName={queue[1].name} artistName={queue[1].artists[0].name} />
                )}
            </div>
        </div>
    );
};

export default Upcoming;
