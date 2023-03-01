import { createContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Buffer } from "buffer";
import pkceChallenge from "pkce-challenge";

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID || "";
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || "";
const SPOTIFY_AUTH_STATE_KEY = "spotify_auth_state";
const SPOTIFY_CODE_VERIFIER_KEY = "spotify_code_verifier";
const SPOTIFY_ACCESS_TOKEN_KEY = "spotify_access_token";
const SPOTIFY_REFRESH_TOKEN_KEY = "spotify_refresh_token";
const SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com";
const REDIRECT_URL = new URL("login/callback", window.location.origin).toString();

const generateState = () => {
    let text = "";
    const length = 16;
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return text;
};

const SpotifyContext = createContext({
    isSignedIn: false,
    initiateSignIn: async () => {},
    requestTokens: async (code: string, state: string) => {},
    signOut: () => {},
    getCurrentTrackStatus: async (): Promise<SpotifyApi.CurrentlyPlayingResponse> => {
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

    // on page load
    useEffect(() => {
        const bearerToken = window.localStorage.getItem(SPOTIFY_ACCESS_TOKEN_KEY);
        setIsSignedIn(bearerToken !== null);
    }, []);

    const initiateSignIn = async () => {
        const { code_verifier: codeVerifier, code_challenge: codeChallenge } = pkceChallenge(128);
        window.localStorage.setItem(SPOTIFY_CODE_VERIFIER_KEY, codeVerifier);

        const state = generateState();
        window.localStorage.setItem(SPOTIFY_AUTH_STATE_KEY, state);

        const authorizeUrl = new URL("authorize", SPOTIFY_AUTH_BASE_URL).toString();
        const searchParams = new URLSearchParams({
            client_id: SPOTIFY_CLIENT_ID,
            response_type: "code",
            redirect_uri: REDIRECT_URL,
            state: state,
            scope: "user-read-playback-state",
            code_challenge_method: "S256",
            code_challenge: codeChallenge,
        }).toString();

        window.location.href = `${authorizeUrl}?${searchParams}`;
    };

    const requestTokens = async (code: string, state: string) => {
        const storedState = window.localStorage.getItem(SPOTIFY_AUTH_STATE_KEY);
        const storedVerifier = window.localStorage.getItem(SPOTIFY_CODE_VERIFIER_KEY) || "";

        if (state !== storedState) {
            // TODO - Do some error handling
        }

        window.localStorage.removeItem(SPOTIFY_AUTH_STATE_KEY);

        const formData = new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URL,
            client_id: SPOTIFY_CLIENT_ID,
            code_verifier: storedVerifier,
        }).toString();

        const tokenUrl = new URL("api/token", SPOTIFY_AUTH_BASE_URL).toString();
        const authString = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
            "base64"
        );
        const responseRaw = await fetch(tokenUrl, {
            method: "POST",
            headers: {
                Authorization: `Basic ${authString}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        window.localStorage.removeItem(SPOTIFY_CODE_VERIFIER_KEY);
        const respJson = await responseRaw.json();
        const { error, access_token, refresh_token } = respJson;
        if (error) return;
        window.localStorage.setItem(SPOTIFY_ACCESS_TOKEN_KEY, access_token);
        window.localStorage.setItem(SPOTIFY_REFRESH_TOKEN_KEY, refresh_token);
        setIsSignedIn(true);
    };

    const signOut = () => {
        window.localStorage.removeItem(SPOTIFY_AUTH_STATE_KEY);
        window.localStorage.removeItem(SPOTIFY_CODE_VERIFIER_KEY);
        window.localStorage.removeItem(SPOTIFY_ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(SPOTIFY_REFRESH_TOKEN_KEY);
        setIsSignedIn(false);
    };

    const getCurrentTrackStatus = async (): Promise<SpotifyApi.CurrentlyPlayingResponse> => {
        const bearerToken = window.localStorage.getItem(SPOTIFY_ACCESS_TOKEN_KEY);
        const cptRaw = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
            },
        });
        const currentPlayingTrack = await cptRaw.json();
        return currentPlayingTrack;
    };

    return (
        <SpotifyContext.Provider
            value={{ isSignedIn, initiateSignIn, requestTokens, signOut, getCurrentTrackStatus }}
        >
            {props.children}
        </SpotifyContext.Provider>
    );
};

export { SpotifyContext, SpotifyProvider };
