import { createContext, useState } from "react";
import { ChannelColor, getNextColor } from "../utils";

const ThemeContext = createContext<{
    themeColor: ChannelColor;
    setThemeColor: (themeColor: ChannelColor) => void;
    nextColor: () => void;
}>({
    themeColor: "green",
    setThemeColor: (_themeColor: ChannelColor) => {},
    nextColor: () => {},
});

const ThemeProvider: React.FC = (props) => {
    const [themeColor, setThemeColor] = useState<ChannelColor>("green");

    const nextColor = () => {
        setThemeColor(getNextColor(themeColor));
    };

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor, nextColor }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };
