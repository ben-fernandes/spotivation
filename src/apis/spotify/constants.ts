export const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID || "";
export const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || "";
export const TITLE_TEXT = process.env.REACT_APP_TITLE_TEXT || "";
export const REDIRECT_URL = new URL("login/callback", window.location.origin).toString();
