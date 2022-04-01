import React from "react";
import ProgressBar from "./ProgressBar";

interface ISongInfo {
    songTitle: string;
    songArtist: string;
    progressMs: number;
    durationMs: number;
}

const SongInfo: React.FC<ISongInfo> = ({
    songTitle,
    songArtist,
    progressMs,
    durationMs,
}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-7xl mb-8 text-center">{songTitle}</p>
            <p className="text-5xl mb-8 text-center">{songArtist}</p>
            <ProgressBar currentPos={progressMs} maxPos={durationMs} />
        </div>
    );
};

export default SongInfo;
