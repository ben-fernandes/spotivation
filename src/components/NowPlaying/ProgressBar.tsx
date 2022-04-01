import React, { useEffect, useState } from "react";

interface IProgressBar {
    currentPos: number;
    maxPos: number;
}

const ProgressBar: React.FC<IProgressBar> = ({ currentPos, maxPos }) => {
    const percentageWidth = `${Math.min((currentPos / maxPos) * 100, 100)}%`;

    return (
        <div className="h-2 w-3/4 bg-zinc-900/75">
            <div
                className="h-full bg-white transition-all"
                style={{ width: percentageWidth }}
            ></div>
        </div>
    );
};

export default ProgressBar;
