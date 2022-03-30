import React, { useState } from "react";
import Header from "./components/Header";
import NowPlaying from "./components/NowPlaying";
import Upcoming from "./components/Upcoming";
import { ChannelColor, getGradientFromColor, getNextColor } from "./utils";

const App = () => {
    const [channelColor, setChannelColor] = useState<ChannelColor>("red");

    const changeChannelColor = () => {
        setChannelColor(getNextColor(channelColor));
    };

    return (
        <div
            className={`flex flex-col fixed inset-0 bg-gradient-to-b to-black ${getGradientFromColor(
                channelColor
            )}`}
        >
            <Header
                channelColor={channelColor}
                changeChannelColor={changeChannelColor}
            />
            <NowPlaying />
            <Upcoming />
        </div>
    );
};

export default App;
