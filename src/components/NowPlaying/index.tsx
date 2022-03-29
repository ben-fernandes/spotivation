import React from "react";
import AlbumArt from "./AlbumArt";
import SongInfo from "./SongInfo";

const NowPlaying = () => {
    return (
        <div className="text-white rounded-md grid gap-4 grid-cols-2 grid-rows-1">
            <AlbumArt />
            <SongInfo />
        </div>
    );
};

export default NowPlaying;
