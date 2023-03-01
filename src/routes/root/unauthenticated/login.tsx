import React, { useContext } from "react";
import { SpotifyContext } from "../../../contexts/SpotifyContext";

const Login = () => {
    const spotifyContext = useContext(SpotifyContext);

    return <button onClick={spotifyContext.initiateSignIn}>Sign in with Spotify</button>;
};

export default Login;
