import React from 'react';
import { PlaylistVideotype } from '../utils/Types';
import PlaylistItemCard from './PlaylistItemCard';

function PlaylistItems({
    videos,
    channelId
}: {
    videos: PlaylistVideotype[];
    channelId: string;
}) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 mt-4">
            {videos.map((video, index) => (
                <PlaylistItemCard
                    key={video.id}
                    item={video}
                    ind={index}
                    channelId={channelId}
                />
            ))}
        </div>
    );
}

export default PlaylistItems;