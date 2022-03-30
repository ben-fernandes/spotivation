import React from "react";
import { ChannelColor, getTextColor } from "../../utils";

interface IHeader {
    channelColor: ChannelColor;
    changeChannelColor: () => void;
}

const Header: React.FC<IHeader> = ({ channelColor, changeChannelColor }) => {
    return (
        <div className="bg-zinc-900/75 p-8 flex justify-between">
            <h1 className="text-4xl font-bold text-white">
                Softwire Party Silent Disco
            </h1>
            <p
                className={`text-4xl font-bold capitalize ${getTextColor(
                    channelColor
                )}`}
                onClick={changeChannelColor}
            >
                {channelColor} channel
            </p>
        </div>
    );
};

export default Header;
