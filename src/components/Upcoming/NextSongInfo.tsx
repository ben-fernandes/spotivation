import React from "react";

interface NextSongInfoProps {
    trackName: string;
    artistName: string;
}

const NextSongInfo: React.FC<NextSongInfoProps> = ({ trackName, artistName }) => {
    return (
        <div className="bg-black p-4 rounded-md">
            <h3 className="text-3xl mb-4">{trackName}</h3>
            <p className="text-xl">{artistName}</p>
        </div>
    );
};

export default NextSongInfo;
