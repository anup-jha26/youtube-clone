import React from 'react';
import { Link } from 'react-router-dom';
import { HomeVideoCardType } from '../utils/Types';

function Card({ data }: { data: HomeVideoCardType }) {
    const {
        videoId,
        videoThumbnail,
        videoDuration,
        videoTitle,
        videoViews,
        videoAge,
        channelInfo: { id, image, name }
    } = data;

    return (
        <div className="flex flex-col gap-3 pb-3 transition-transform duration-200 ease-in-out hover:scale-[1.01]">
            {/* Video Thumbnail Section */}
            <div className="relative">
                <Link to={`/watch/${videoId}/${id}`}>
                    <img
                        src={videoThumbnail}
                        alt="Video Thumbnail"
                        className="w-full aspect-[16/9] object-cover rounded-xl bg-neutral-900"
                    />
                </Link>
                <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-sm bg-[#0c0c0cd0] px-2 py-0.5 rounded">
                    {videoDuration}
                </span>
            </div>

            {/* Channel and Video Info */}
            <div className="flex gap-2">
                <Link to={`/channel/${id}`} className="h-8 md:h-10 aspect-square">
                    <img
                        src={image}
                        alt="Channel Avatar"
                        className="rounded-full object-cover bg-gray-300 transition-transform duration-200 ease-in-out hover:scale-[1.08]"
                    />
                </Link>
                <div className="flex flex-col justify-center">
                    <h5 className="text-md sm:text-lg line-clamp-2">{videoTitle}</h5>
                    <div className="text-sm sm:text-md">
                        <h6>{name}</h6>
                        <div className="flex gap-1">
                            <span>{videoViews}</span>
                            <span>•</span>
                            <span>{videoAge}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;