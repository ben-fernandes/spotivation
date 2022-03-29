import React from "react";
import AlbumArt from "./AlbumArt";
import SongInfo from "./SongInfo";

const NowPlaying = () => {
    return (
        <div className="bg-gray-900 text-white p-8 rounded-md">
            <AlbumArt />
            <SongInfo />
        </div>
    );
};

export default NowPlaying;
