import React from "react";
import { Track } from "../../apis/spotify/api";

interface NextSongInfoProps {
    track: Track;
}

const NextSongInfo: React.FC<NextSongInfoProps> = ({ track }) => {
    return (
        <div className="flex flex-row bg-black p-4 rounded-md space-x-4">
            <img className="h-16" src={track.album.images[0].url} alt={`${track.name} album art`}></img>
            <div>
                <h3 className="text-3xl mb-4">{track.name}</h3>
                <p className="text-xl">{track.artists[0].name}</p>
            </div>
        </div>
    );
};

export default NextSongInfo;
