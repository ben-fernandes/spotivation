import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NowPlaying from "./components/NowPlaying";
import Upcoming from "./components/Upcoming";

type ChannelColor = "red" | "green" | "blue";

const getNextColor = (channelColor: ChannelColor): ChannelColor => {
    switch (channelColor) {
        case "red":
            return "green";
        case "green":
            return "blue";
        case "blue":
            return "red";
    }
};

const getStyleForColor = (channelColor: ChannelColor): string => {
    switch (channelColor) {
        case "red":
            return "from-red-900";
        case "green":
            return "from-green-900";
        case "blue":
            return "from-blue-900";
    }
};

const App = () => {
    // todo - change the background gradient dependent on the channel
    const [channelColor, setChannelColor] = useState<ChannelColor>("red");

    const changeChannelColor = () => {
        setChannelColor(getNextColor(channelColor));
    };

    return (
        <div
            className={`flex flex-col fixed inset-0 bg-gradient-to-b to-black ${getStyleForColor(
                channelColor
            )}`}
        >
            <button onClick={changeChannelColor}>Change</button>
            <Header />
            <NowPlaying />
            <Upcoming />
        </div>
    );
};

export default App;
