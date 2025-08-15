import React from 'react';
import { HomeVideoCardType } from '../utils/Types';
import { Link } from 'react-router-dom';

function ChannelVideoCard({ item }: { item: HomeVideoCardType }) {
    const {
        videoId,
        videoThumbnail,
        videoDuration,
        videoTitle,
        videoViews,
        videoAge,
        channelInfo: { id }
    } = item;

    return (
        <Link to={`/watch/${videoId}/${id}`}>
            <div className="flex flex-col transition-transform duration-200 ease-in-out hover:scale-[1.01]">
                {/* Video Thumbnail */}
                <div className="relative">
                    <img
                        src={videoThumbnail}
                        alt="Video Thumbnail"
                        className="aspect-[16/9] object-cover rounded bg-neutral-900"
                    />
                    <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-[14px] sm:text-sm bg-[#0c0c0cd0] px-2 py-0.5 rounded">
                        {videoDuration}
                    </span>
                </div>

                {/* Video Info */}
                <div className="mt-2 flex flex-col gap-1">
                    <h5 className="text-md line-clamp-1">{videoTitle}</h5>
                    <div className="text-sm text-gray-400 flex sm:flex-row flex-col gap-1 sm:gap-3">
                        <span>{videoViews}</span>
                        <span>{videoAge}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ChannelVideoCard;