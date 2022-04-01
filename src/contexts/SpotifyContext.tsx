import { createContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const CLIENT_ID = "+++++";
const REDIRECT_URI = window.location.origin;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = "user-read-playback-state";

const SpotifyContext = createContext({
    isSignedIn: false,
    signIn: () => {},
    signOut: () => {},
    getCurrentTrackStatus:
        async (): Promise<SpotifyApi.CurrentlyPlayingResponse> => {
            return {
                timestamp: 0,
                device: {
                    id: null,
                    is_active: false,
                    is_restricted: false,
                    name: "",
                    type: "",
                    volume_percent: null,
                },
                progress_ms: null,
                is_playing: false,
                item: null,
                context: null,
            };
        },
});

const SpotifyProvider: React.FC = (props) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const spotifyApi = new SpotifyWebApi();

    // on page load
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            spotifyApi.setAccessToken(JSON.parse(token).value);
            setIsSignedIn(true);
            // TODO - refresh the token
            // set up a periodic refresh cycle
        } else {
            const hash = window.location.hash;
            if (hash) {
                const tweakedHash = hash.replace("#", "?");
                const hashParams = new URLSearchParams(tweakedHash);

                const tokenItem = {
                    value: hashParams.get("access_token") as string,
                    expiry:
                        new Date().getTime() +
                        parseInt(hashParams.get("expires_in") as string) * 1000,
                };

                window.localStorage.setItem("token", JSON.stringify(tokenItem));
                spotifyApi.setAccessToken(tokenItem.value);
                setIsSignedIn(true);
            } else {
                setIsSignedIn(false);
                return;
            }
        }
    }, []);

    const signIn = () => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
    };

    const signOut = () => {
        window.localStorage.removeItem("token");
        window.location.href = "http://localhost:3000";
    };

    const getCurrentTrackStatus =
        async (): Promise<SpotifyApi.CurrentlyPlayingResponse> => {
            const currentPlayingTrack =
                await spotifyApi.getMyCurrentPlayingTrack();
            return currentPlayingTrack;
        };

    return (
        <SpotifyContext.Provider
            value={{ isSignedIn, signIn, signOut, getCurrentTrackStatus }}
        >
            {props.children}
        </SpotifyContext.Provider>
    );
};

export { SpotifyContext, SpotifyProvider };
