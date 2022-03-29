import React from "react";
import NextSongInfo from "./NextSongInfo";

const Upcoming = () => {
    return (
        <div className="bg-zinc-900/75 text-white p-8">
            <h2 className="text-2xl pb-4">Coming up</h2>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
                <NextSongInfo />
                <NextSongInfo />
            </div>
        </div>
    );
};

export default Upcoming;
