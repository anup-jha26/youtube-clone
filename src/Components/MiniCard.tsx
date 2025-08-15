import React from 'react';
import { HomeVideoCardType } from '../utils/Types';
import { Link } from 'react-router-dom';

function MiniCard({ item }: { item: HomeVideoCardType }) {
    const {
        videoId,
        videoThumbnail,
        videoDuration,
        videoTitle,
        videoViews,
        videoAge,
        channelInfo: { id, name }
    } = item;

    return (
        <Link to={`/watch/${videoId}/${id}`}>
            <div className="flex gap-3 transition-transform duration-200 ease-in-out hover:scale-[1.01]">
                {/* Thumbnail */}
                <div className="relative min-w-fit">
                    <img
                        src={videoThumbnail}
                        alt="Video Thumbnail"
                        className="w-40 aspect-[16/9] object-cover rounded"
                    />
                    <span className="absolute bottom-1 right-1 text-sm sm:text-md bg-[#0c0c0cd0] px-2 py-0.5 rounded">
                        {videoDuration}
                    </span>
                </div>

                {/* Video Info */}
                <div className="flex flex-col justify-center">
                    <h5 className="text-md font-medium line-clamp-2">{videoTitle}</h5>
                    <div className="text-sm text-gray-400 mt-1">
                        <p>{name}</p>
                        <div className="flex items-center gap-2">
                            <span>{videoViews}</span>
                            <span className="w-[4px] h-[4px] bg-gray-400 rounded-full"></span>
                            <span>{videoAge}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MiniCard;