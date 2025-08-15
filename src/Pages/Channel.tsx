import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useChannel } from '../Hooks/useChannel';
import ChannelVideoList from '../Components/ChannelVideoList';
import ChannelPlaylist from '../Components/ChannelPlaylist';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Components/Loading';

function Channel() {
    const { channelId } = useParams();
    const {
        category,
        setCategory,
        channelInfo,
        fetchChannelInfo,
        channelVideoList,
        channelPlayLists,
        fetchChannelData,
        hasMore
    } = useChannel();

    const [showDescriptionModal, setShowDescriptionModal] = useState(false);

    const loadMoreVideos = () => {
        if (channelId && channelVideoList.nextPageToken) {
            fetchChannelData(channelId);
        }
    };

    useEffect(() => {
        if (channelId) {
            fetchChannelInfo(channelId);
            fetchChannelData(channelId);
        }
    }, [category]);

    return (
        <div className="relative mb-12">
            {/* Description Modal */}
            {showDescriptionModal && channelInfo?.description && (
                <div className="absolute z-10 left-1/2 top-14 transform -translate-x-1/2 bg-neutral-800 rounded-xl overflow-hidden">
                    <div className="w-[600px] max-h-[500px] p-8 overflow-y-auto flex flex-col gap-2 items-end">
                        <AiOutlineClose
                            onClick={() => setShowDescriptionModal(false)}
                            className="text-2xl text-neutral-200 cursor-pointer"
                        />
                        <p className="text-lg whitespace-pre-line">{channelInfo.description}</p>
                    </div>
                </div>
            )}

            {/* Content */}
            <InfiniteScroll
                next={loadMoreVideos}
                hasMore={hasMore}
                dataLength={channelVideoList.videos.length}
                loader={<Loading />}
            >
                <div className="w-[95%] mx-auto mt-6 md:mt-8">
                    {/* Channel Header */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-center">
                            <img
                                src={channelInfo?.thumbnail}
                                alt="Channel Thumbnail"
                                className="rounded-full object-cover aspect-square w-36 sm:w-40 md:w-52"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                                {channelInfo?.title}
                            </h1>
                            <div className="mt-2 text-md sm:text-lg text-neutral-400 flex flex-wrap gap-4">
                                <span>{channelInfo?.customUrl}</span>
                                <span>{channelInfo?.subCount} Subscribers</span>
                                <span>{channelInfo?.videoCount} Videos</span>
                            </div>
                            {channelInfo?.description && (
                                <div className="mt-2">
                                    <p className="text-neutral-400 line-clamp-3 whitespace-pre-line w-[600px]">
                                        {channelInfo.description}
                                    </p>
                                    <button
                                        onClick={() => setShowDescriptionModal(true)}
                                        className="font-semibold mt-1"
                                    >
                                        more
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category Toggle */}
                    <div className="my-3">
                        <button
                            onClick={() => setCategory('videos')}
                            className={`w-32 md:w-44 py-2 text-lg sm:text-xl font-semibold ${category === 'videos' ? 'border-b' : ''
                                }`}
                        >
                            Videos
                        </button>
                        <button
                            onClick={() => setCategory('playlists')}
                            className={`w-32 md:w-44 py-2 text-lg sm:text-xl font-semibold ${category === 'playlists' ? 'border-b' : ''
                                }`}
                        >
                            Playlists
                        </button>
                        <hr className="h-1" />
                    </div>

                    {/* Content List */}
                    {category === 'videos' ? (
                        <ChannelVideoList channelVideos={channelVideoList.videos} />
                    ) : (
                        <ChannelPlaylist
                            channelId={channelInfo?.id || ''}
                            channelPlayLists={channelPlayLists.playlists}
                        />
                    )}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default Channel;