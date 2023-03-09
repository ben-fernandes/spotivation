import { REDIRECT_URL } from "./constants";
import { Buffer } from "buffer";
import axios from "axios";

type TokenType = "Bearer";

interface RefreshAccessTokenResponse {
    access_token: string;
    token_type: TokenType;
    scope: string;
    expires_in: number;
}

interface GetTokensResponse extends RefreshAccessTokenResponse {
    refresh_token: string;
}

export const getTokens = async (
    code: string,
    codeVerifier: string,
    clientId: string,
    clientSecret: string
) => {
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");


    const response = await axios.post<GetTokensResponse>(
        "https://accounts.spotify.com/api/token",
        {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URL,
            client_id: clientId,
            code_verifier: codeVerifier,
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${authString}`,
            },
        }
    );
    return response.data;
};

export const refreshAccessToken = async (refreshToken: string, clientId: string) => {
    const response = await axios.post<RefreshAccessTokenResponse>(
        "https://accounts.spotify.com/api/token",
        {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: clientId,
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return response.data;
};
