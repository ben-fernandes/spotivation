import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getTextColor } from "../../utils";

const Header: React.FC = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <div className="bg-zinc-900/75 p-8 flex justify-between">
            <h1 className="text-4xl font-bold text-white">Softwire Party Silent Disco</h1>

            <p className={`text-4xl font-bold capitalize ${getTextColor(themeContext.themeColor)}`}>
                {themeContext.themeColor} channel
            </p>
        </div>
    );
};

export default Header;
