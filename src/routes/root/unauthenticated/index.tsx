import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SpotifyContext } from "../../../contexts/SpotifyContext";

const Unauthenticated = () => {
    const spotifyContext = useContext(SpotifyContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (spotifyContext.isSignedIn) {
            navigate("/");
        }
    }, [navigate, spotifyContext.isSignedIn]);

    return <Outlet />;
};

export default Unauthenticated;
