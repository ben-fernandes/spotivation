export const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID || "";
export const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || "";
export const TITLE_TEXT = process.env.REACT_APP_TITLE_TEXT || "";
export const REDIRECT_URL = new URL("login/callback", window.location.origin).toString();

// Local storage keys
export const SPOTIFY_ACCESS_TOKEN_KEY = "spotify_access_token";
export const SPOTIFY_REFRESH_TOKEN_KEY = "spotify_refresh_token";
export const SPOTIFY_AUTH_STATE_KEY = "spotify_auth_state";
export const SPOTIFY_CODE_VERIFIER_KEY = "spotify_code_verifier";