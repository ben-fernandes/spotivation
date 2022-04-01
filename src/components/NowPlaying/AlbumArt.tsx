import React from "react";

interface IAlbumArt {
    src: string;
}

const AlbumArt: React.FC<IAlbumArt> = ({ src }) => {
    return (
        <div className="flex justify-center">
            <img
                className="h-full aspect-square"
                src={src}
                alt="Album artwork"
            ></img>
        </div>
    );
};

export default AlbumArt;
