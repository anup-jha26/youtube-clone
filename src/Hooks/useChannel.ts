import { useState } from 'react';
import {
    ChannelInfoType,
    ChannelPlaylistsType,
    HomeVideoCardType
} from '../utils/Types';
import {
    getActivities,
    getChannelInfo,
    getActvitiesVideos,
    getChannelPlaylists
} from '../utils/api';
import { fetchVideosWithChannels } from '../utils/videoDetailsHelper';
import { parseChannelPlaylists } from '../utils/parseData';

const API_KEY = import.meta.env.VITE_API_KEY;

interface ChannelVideoListState {
    videos: HomeVideoCardType[];
    nextPageToken: string | null;
}

interface ChannelPlayListState {
    playlists: ChannelPlaylistsType[];
    nextPageToken: string | null;
}

type ActivityItem = {
    contentDetails: {
        upload?: { videoId: string };
        playlistItem?: { resourceId: { videoId: string } };
    };
};

export const useChannel = () => {
    const [category, setCategory] = useState<'videos' | 'playlists'>('videos');
    const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);
    const [channelVideoList, setChannelVideoList] = useState<ChannelVideoListState>({
        videos: [],
        nextPageToken: null
    });
    const [channelPlayLists, setChannelPlayLists] = useState<ChannelPlayListState>({
        playlists: [],
        nextPageToken: null
    });
    const [hasMore, setHasMore] = useState(true);

    const fetchChannelInfo = async (channelId: string) => {
        const [info] = await getChannelInfo(channelId);

        const formattedInfo: ChannelInfoType = {
            id: info.id,
            thumbnail: info.snippet.thumbnails.high.url,
            title: info.snippet.title,
            customUrl: info.snippet.customUrl,
            description: info.snippet.description,
            subCount: info.statistics.subscriberCount,
            videoCount: info.statistics.videoCount
        };

        setChannelInfo(formattedInfo);
    };

    const fetchChannelData = async (channelId: string) => {
        if (category === 'videos') {
            const response = await getActivities(channelId, channelVideoList.nextPageToken || '');

            const videoIds: string[] = (response.items as ActivityItem[])
                .map(item => {
                    const uploadId = item.contentDetails.upload?.videoId;
                    const playlistId = item.contentDetails.playlistItem?.resourceId?.videoId;
                    return uploadId || playlistId || null;
                })
                .filter((id): id is string => Boolean(id));

            const videoDetails = await getActvitiesVideos(videoIds);
            const enrichedVideos = await fetchVideosWithChannels(videoDetails.items);

            setChannelVideoList(prev => ({
                videos: [...prev.videos, ...enrichedVideos],
                nextPageToken: response.nextPageToken
            }));

            setHasMore(Boolean(response.nextPageToken));
        } else {
            const response = await getChannelPlaylists(channelId, channelPlayLists.nextPageToken || '');
            const parsedPlaylists = parseChannelPlaylists(response.items);

            setChannelPlayLists(prev => ({
                playlists: [...prev.playlists, ...parsedPlaylists],
                nextPageToken: response.nextPageToken
            }));

            setHasMore(Boolean(response.nextPageToken));
        }
    };

    return {
        category,
        setCategory,
        channelInfo,
        fetchChannelInfo,
        channelVideoList,
        channelPlayLists,
        fetchChannelData,
        hasMore
    };
};