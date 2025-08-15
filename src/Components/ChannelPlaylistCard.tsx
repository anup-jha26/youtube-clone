import React from 'react';
import { FaList } from 'react-icons/fa';
import { ChannelPlaylistsType } from '../utils/Types';
import { Link } from 'react-router-dom';

function ChannelPlaylistCard({
    item,
    channelId
}: {
    item: ChannelPlaylistsType;
    channelId: string;
}) {
    return (
        <Link to={`/playlist/${channelId}/${item.id}`}>
            <div className="flex flex-col transition-transform duration-200 ease-in-out hover:scale-[1.01]">
                {/* Playlist Thumbnail */}
                <div className="relative">
                    <img
                        src={item.thumbnail}
                        alt="Playlist Thumbnail"
                        className="aspect-[16/9] object-cover rounded bg-neutral-900"
                    />
                    <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-[#0c0c0cd0] px-2 py-0.5 rounded">
                        <FaList />
                        <span className="text-sm">{item.videoCount} videos</span>
                    </div>
                </div>

                {/* Playlist Title */}
                <div className="mt-2">
                    <h2 className="text-sm sm:text-md line-clamp-1">{item.title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default ChannelPlaylistCard;