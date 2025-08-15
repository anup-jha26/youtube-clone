import { useState } from 'react';
import { PlaylistVideotype } from '../utils/Types';
import { getPlaylistVideos } from '../utils/api';

interface PlaylistItemsState {
    videos: PlaylistVideotype[];
    nextPageToken: string | null;
}

export const usePlaylistItems = () => {
    const [playlistItems, setPlaylistItems] = useState<PlaylistItemsState>({
        videos: [],
        nextPageToken: null
    });

    const fetchPlaylistVideos = async (playlistId: string) => {
        const response = await getPlaylistVideos(playlistId);

        const parsedVideos: PlaylistVideotype[] = response.items.map((item: any) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail:
                item.snippet.thumbnails?.high?.url ||
                item.snippet.thumbnails?.standard?.url ||
                ''
        }));

        setPlaylistItems(prev => ({
            videos: [...prev.videos, ...parsedVideos],
            nextPageToken: response.nextPageToken || null
        }));
    };

    return {
        playlistItems,
        fetchPlaylistVideos
    };
};