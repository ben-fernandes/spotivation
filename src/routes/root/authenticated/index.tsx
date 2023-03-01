import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SpotifyContext } from "../../../contexts/SpotifyContext";

const Authenticated = () => {
    const spotifyContext = useContext(SpotifyContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!spotifyContext.isSignedIn) {
            navigate("/login");
        }
    }, [navigate, spotifyContext.isSignedIn]);

    return <Outlet />;
};

export default Authenticated;
