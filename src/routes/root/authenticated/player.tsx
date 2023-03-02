import { useState } from "react";
import Header from "../../../components/Header";
import NowPlaying from "../../../components/NowPlaying";
import { ChannelColor, getGradientFromColor, getNextColor } from "../../../utils";

const Player = () => {
    const [channelColor, setChannelColor] = useState<ChannelColor>("red");

    const changeChannelColor = () => {
        setChannelColor(getNextColor(channelColor));
    };

    return (
        <div
            className={`flex flex-col flex-grow bg-gradient-to-b to-black ${getGradientFromColor(
                channelColor
            )}`}
        >
            <Header channelColor={channelColor} changeChannelColor={changeChannelColor} />
            <NowPlaying />
        </div>
    );
};

export default Player;
