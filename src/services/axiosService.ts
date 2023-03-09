import axios from "axios";
import { refreshAccessToken } from "../apis/spotify/accounts";
import { SPOTIFY_CLIENT_ID } from "../apis/spotify/constants";
import { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken } from "./tokenService";

const instance = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response && err.response.status === 401 && !originalConfig._retry) {
            // Access Token was expired
            // {status: 401, message: 'The access token expired'}
            originalConfig._retry = true;

            try {
                const refreshToken = getLocalRefreshToken();
                if (!refreshToken) throw new Error("No refresh token");
                const refreshResponse = await refreshAccessToken(refreshToken, SPOTIFY_CLIENT_ID);

                const { access_token } = refreshResponse;
                updateLocalAccessToken(access_token);

                // Retrying the request with the new access token
                return instance(originalConfig);
            } catch (_error) {
                return Promise.reject(_error);
            }
        }

        return Promise.reject(err);
    }
);

export default instance;
