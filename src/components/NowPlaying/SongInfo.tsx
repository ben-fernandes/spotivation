import React from "react";
import ProgressBar from "./ProgressBar";

const SongInfo = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <p>This is the song title</p>
            <p>This is the song artist</p>
            <ProgressBar />
        </div>
    );
};

export default SongInfo;
