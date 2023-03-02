import { useContext } from "react";
import Header from "../../../components/Header";
import NowPlaying from "../../../components/NowPlaying";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { getGradientFromColor } from "../../../utils";

const Player = () => {
    const themeContext = useContext(ThemeContext)
    return (
        <div
            className={`flex flex-col flex-grow bg-gradient-to-b to-black ${getGradientFromColor(
                themeContext.themeColor
            )}`}
        >
            <Header />
            <NowPlaying />
        </div>
    );
};

export default Player;
