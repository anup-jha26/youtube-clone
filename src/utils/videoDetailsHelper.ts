import { HomeVideoCardType } from "./Types";
import { getChannelInfo } from "./api";
import { parseVideos } from "./parseData";

const API_KEY = import.meta.env.VITE_API_KEY;

interface ChannelData {
    [key: string]: {
        image: string;
        subCount: string;
    };
}

export const fetchVideosWithChannels = async (items: any[]): Promise<HomeVideoCardType[]> => {
    const videoData = parseVideos(items);

    const channelIds = videoData.map(video => video.channelInfo.id).join(",");

    try {
        const channelResponse = await getChannelInfo(channelIds);

        const channelData: ChannelData = {};

        channelResponse.forEach((channel: any) => {
            const id = channel.id;
            const image = channel.snippet?.thumbnails?.default?.url || "";
            const subCount = channel.statistics?.subscriberCount || "0";

            channelData[id] = { image, subCount };
        });

        const videos = videoData.map(video => ({
            ...video,
            channelInfo: {
                ...video.channelInfo,
                image: channelData[video.channelInfo.id]?.image || "",
                subCount: channelData[video.channelInfo.id]?.subCount || "0",
            },
        }));

        return videos;
    } catch (error) {
        console.error("Error fetching channel info:", error);
        return videoData; // Return basic video data if channel fetch fails
    }
};