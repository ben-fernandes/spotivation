import React from "react";
import ProgressBar from "./ProgressBar";

const SongInfo = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-7xl mb-8">Dancing Queen</p>
            <p className="text-5xl mb-8">ABBA</p>
            <ProgressBar />
        </div>
    );
};

export default SongInfo;
