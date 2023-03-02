import React from "react";

interface IAlbumArt {
    src: string;
}

const AlbumArt: React.FC<IAlbumArt> = ({ src }) => {
    return <img className="" src={src} alt="Album artwork"></img>;
};

export default AlbumArt;
