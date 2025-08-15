import React from 'react';
import { PlaylistVideotype } from '../utils/Types';
import { Link } from 'react-router-dom';

function PlaylistItemCard({
    item,
    ind,
    channelId
}: {
    item: PlaylistVideotype;
    ind: number;
    channelId: string;
}) {
    return (
        <Link to={`/watch/${item.id}/${channelId}`}>
            <div className="flex flex-col transition-transform duration-200 ease-in-out hover:scale-[1.01]">
                {/* Thumbnail with Index Overlay */}
                <div className="relative">
                    <img
                        src={item.thumbnail}
                        alt="Playlist Video Thumbnail"
                        className="aspect-[16/9] object-cover rounded bg-neutral-900"
                    />
                    <div className="absolute top-0 left-0 h-full w-[60px] sm:w-[100px] flex items-center justify-center bg-[#0c0c0cd0]">
                        <span className="text-xl text-neutral-400 text-center w-full">{ind + 1}</span>
                    </div>
                </div>

                {/* Video Title */}
                <div className="mt-2">
                    <h2 className="text-sm sm:text-md line-clamp-1">{item.title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PlaylistItemCard;