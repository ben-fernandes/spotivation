import { SPOTIFY_ACCESS_TOKEN_KEY, SPOTIFY_REFRESH_TOKEN_KEY } from "../apis/spotify/constants";

export const getLocalAccessToken = () => {
    return localStorage.getItem(SPOTIFY_ACCESS_TOKEN_KEY);
};

export const updateLocalAccessToken = (token: string) => {
    localStorage.setItem(SPOTIFY_ACCESS_TOKEN_KEY, token);
};

export const getLocalRefreshToken = () => {
    return localStorage.getItem(SPOTIFY_REFRESH_TOKEN_KEY);
};

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(SPOTIFY_ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(SPOTIFY_REFRESH_TOKEN_KEY, refreshToken);
};

export const removeAuthTokens = () => {
    localStorage.removeItem(SPOTIFY_ACCESS_TOKEN_KEY);
    localStorage.removeItem(SPOTIFY_REFRESH_TOKEN_KEY);
};
