import React, { useContext } from "react";
import { TITLE_TEXT } from "../../apis/spotify/constants";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getTextColor } from "../../utils";

const Header: React.FC = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <div className="bg-zinc-900/75 p-8 flex justify-between">
            <h1 className="text-4xl font-bold text-white">{TITLE_TEXT} Silent Disco</h1>

            <p className={`text-4xl font-bold capitalize ${getTextColor(themeContext.themeColor)}`}>
                {themeContext.themeColor} channel
            </p>
        </div>
    );
};

export default Header;
