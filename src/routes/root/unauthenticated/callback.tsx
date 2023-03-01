import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SpotifyContext } from "../../../contexts/SpotifyContext";

const Callback = () => {
    const spotifyContext = useContext(SpotifyContext);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        spotifyContext.requestTokens(code!, state!);
    }, [searchParams, spotifyContext]);

    return <div> Callback</div>;
};

export default Callback;
