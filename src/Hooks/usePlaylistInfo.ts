import { useState } from 'react';
import { PlaylistInfoType } from '../utils/Types';
import { getPlaylistInfo } from '../utils/api';
import { parsePlaylistInfo } from '../utils/parseData';

export const usePlaylistInfo = () => {
    const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfoType | null>(null);
    const [showDescription, setShowDescription] = useState(false);

    const fetchPlaylistInfo = async (playlistId: string) => {
        const response = await getPlaylistInfo(playlistId);
        const parsedInfo = parsePlaylistInfo(response);
        setPlaylistInfo(parsedInfo);
    };

    return {
        playlistInfo,
        showDescription,
        setShowDescription,
        fetchPlaylistInfo
    };
};