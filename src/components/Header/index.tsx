import React, { useContext } from "react";
import { SpotifyContext } from "../../contexts/SpotifyContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getTextColor } from "../../utils";

const Header: React.FC = () => {
    const spotifyContext = useContext(SpotifyContext);
    const themeContext = useContext(ThemeContext);

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
                <h1 className="text-4xl font-bold text-white">Softwire Party Silent Disco</h1>
            )}
            <p
                className={`text-4xl font-bold capitalize cursor-pointer ${getTextColor(
                    themeContext.themeColor
                )}`}
                onClick={themeContext.nextColor}
            >
                {themeContext.themeColor} channel
            </p>
        </div>
    );
};

export default Header;
