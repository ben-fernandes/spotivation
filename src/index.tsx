import React from "react";
import "./index.css";
import Player from "./routes/root/authenticated/player";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Callback from "./routes/root/unauthenticated/callback";
import { SpotifyProvider } from "./contexts/SpotifyContext";
import Authenticated from "./routes/root/authenticated";
import Unauthenticated from "./routes/root/unauthenticated";
import Login from "./routes/root/unauthenticated/login";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Authenticated />,
                children: [{ index: true, element: <Player /> }],
            },
            {
                path: "login",
                element: <Unauthenticated />,
                children: [
                    {
                        index: true,
                        element: <Login />,
                    },
                    {
                        path: "callback",
                        element: <Callback />,
                    },
                ],
            },
        ],
    },
]);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <SpotifyProvider>
            <RouterProvider router={router} />
        </SpotifyProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
