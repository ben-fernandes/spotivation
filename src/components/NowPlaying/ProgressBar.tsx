import React, { useEffect, useState } from "react";

const ProgressBar = () => {
    const [max, setMax] = useState(100);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setProgress((progress) => progress + 1);
        }, 1000);
    }, []);

    const percentageWidth = `${Math.min((progress / max) * 100, 100)}%`;

    return (
        <div className="h-2 w-3/4 bg-white">
            <div
                className="h-full bg-red-500 transition-all"
                style={{ width: percentageWidth }}
            ></div>
        </div>
    );
};

export default ProgressBar;
