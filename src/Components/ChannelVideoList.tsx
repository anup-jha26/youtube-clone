import React from 'react';
import ChannelVideoCard from './ChannelVideoCard';
import { HomeVideoCardType } from '../utils/Types';

function ChannelVideoList({
    channelVideos
}: {
    channelVideos?: HomeVideoCardType[];
}) {
    return (
        <div className="grid gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {channelVideos?.map((item, index) => (
                <ChannelVideoCard key={index} item={item} />
            ))}
        </div>
    );
}

export default ChannelVideoList;