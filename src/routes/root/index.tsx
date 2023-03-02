import { useContext, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Outlet } from "react-router-dom";
import { SpotifyContext } from "../../contexts/SpotifyContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Root = () => {
    const spotifyContext = useContext(SpotifyContext);
    const themeContext = useContext(ThemeContext);
    const className = "bg-gray-700 text-white px-2 rounded";

    const [isActive, setIsActive] = useState(false);

    useIdleTimer({
        onIdle: () => setIsActive(false),
        onActive: () => setIsActive(true),
        timeout: 2000,
        throttle: 500,
    });

    return (
        <div className="flex flex-col flex-grow">
            {isActive ? (
                <div className="p-2">
                    <div className="flex gap-2">
                        {spotifyContext.isSignedIn ? (
                            <button className={className} onClick={spotifyContext.signOut}>
                                Sign out
                            </button>
                        ) : (
                            <button className={className} onClick={spotifyContext.initiateSignIn}>
                                Sign in
                            </button>
                        )}
                        <button
                            className={className}
                            onClick={() => themeContext.setThemeColor("red")}
                        >
                            Set red
                        </button>
                        <button
                            className={className}
                            onClick={() => themeContext.setThemeColor("green")}
                        >
                            Set green
                        </button>
                        <button
                            className={className}
                            onClick={() => themeContext.setThemeColor("blue")}
                        >
                            Set blue
                        </button>
                    </div>
                </div>
            ) : null}
            <Outlet />
        </div>
    );
};

export default Root;
