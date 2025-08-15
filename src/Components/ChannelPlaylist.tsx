import React from 'react';
import ChannelPlaylistCard from './ChannelPlaylistCard';
import { ChannelPlaylistsType } from '../utils/Types';

function ChannelPlaylist({
    channelId,
    channelPlayLists
}: {
    channelId: string;
    channelPlayLists: ChannelPlaylistsType[];
}) {
    return (
        <div className="grid gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {channelPlayLists.map((playlist) => (
                <ChannelPlaylistCard
                    key={playlist.id}
                    item={playlist}
                    channelId={channelId}
                />
            ))}
        </div>
    );
}

export default ChannelPlaylist;