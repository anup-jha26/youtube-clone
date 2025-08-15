import React, { useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';
import { HomeVideoCardType } from '../utils/Types';
import { Link } from 'react-router-dom';

function VideoDetails({ details }: { details?: HomeVideoCardType }) {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <section className="flex flex-col gap-2 mt-2 mx-1">
            {/* Video Title */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                {details?.videoTitle}
            </h1>

            {/* Channel Info & Action Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-2">
                {/* Channel Info */}
                <div className="flex gap-3 items-center">
                    <Link to={`/channel/${details?.channelInfo.id}`}>
                        <img
                            src={details?.channelInfo.image}
                            alt={`${details?.channelInfo.name} profile`}
                            className="w-12 aspect-square rounded-full object-cover transition-transform duration-200 ease-in-out hover:scale-[1.08]"
                        />
                    </Link>
                    <div className="flex flex-col text-md sm:text-lg">
                        <span className="font-semibold">{details?.channelInfo.name}</span>
                        <span>{details?.channelInfo.subCount} subscribers</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 text-md sm:text-lg cursor-pointer">
                    <div className="flex items-center gap-2 bg-neutral-800 px-3 py-2 rounded-full">
                        <BiLike />
                        <span className="border h-6"></span>
                        <span>{details?.videoLikes}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-neutral-800 px-3 py-2 rounded-full">
                        <FaShare />
                        <span>Share</span>
                    </div>
                </div>
            </div>

            {/* Video Description */}
            <div className="bg-neutral-700 px-3 py-2 rounded-xl text-md sm:text-lg">
                <p className={`whitespace-pre-line ${showDescription ? '' : 'line-clamp-3'}`}>
                    {details?.videoDescription}
                </p>
                <button
                    onClick={() => setShowDescription(prev => !prev)}
                    className="text-sm text-blue-400 mt-1"
                >
                    {showDescription ? '...less' : '...more'}
                </button>
            </div>
        </section>
    );
}

export default VideoDetails;