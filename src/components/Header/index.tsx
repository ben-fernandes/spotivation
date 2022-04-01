import React, { useContext } from "react";
import { SpotifyContext } from "../../contexts/SpotifyContext";
import { ChannelColor, getTextColor } from "../../utils";

interface IHeader {
    channelColor: ChannelColor;
    changeChannelColor: () => void;
}

const Header: React.FC<IHeader> = ({ channelColor, changeChannelColor }) => {
    const spotifyContext = useContext(SpotifyContext);
    return (
        <div className="bg-zinc-900/75 p-8 flex justify-between">
            {spotifyContext.isSignedIn ? (
                <h1
                    className="text-4xl font-bold text-white cursor-pointer"
                    onClick={spotifyContext.signOut}
                >
                    Softwire Party Silent Disco
                </h1>
            ) : (
                <h1 className="text-4xl font-bold text-white">
                    Softwire Party Silent Disco
                </h1>
            )}
            {spotifyContext.isSignedIn ? null : (
                <button onClick={spotifyContext.signIn}>Sign in</button>
            )}
            <p
                className={`text-4xl font-bold capitalize cursor-pointer ${getTextColor(
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
