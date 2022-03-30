export type ChannelColor = "red" | "green" | "blue";

export const getNextColor = (channelColor: ChannelColor): ChannelColor => {
    switch (channelColor) {
        case "red":
            return "green";
        case "green":
            return "blue";
        case "blue":
            return "red";
    }
};

export const getGradientFromColor = (channelColor: ChannelColor): string => {
    switch (channelColor) {
        case "red":
            return "from-red-900";
        case "green":
            return "from-green-900";
        case "blue":
            return "from-blue-900";
    }
}

export const getTextColor = (channelColor: ChannelColor): string => {
    switch (channelColor) {
        case "red":
            return "text-red-500";
        case "green":
            return "text-green-500";
        case "blue":
            return "text-blue-500";
    }
}
