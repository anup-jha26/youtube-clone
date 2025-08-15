import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { usePlaylistInfo } from '../Hooks/usePlaylistInfo';
import { usePlaylistItems } from '../Hooks/usePlaylistItems';
import PlaylistItems from '../Components/PlaylistItems';

function Playlist() {
    const { channelId, playlistId } = useParams();
    const {
        playlistInfo,
        showDescription,
        setShowDescription,
        fetchPlaylistInfo
    } = usePlaylistInfo();
    const {
        playlistItems,
        fetchPlaylistVideos
    } = usePlaylistItems();

    useEffect(() => {
        if (playlistId) {
            fetchPlaylistInfo(playlistId);
            fetchPlaylistVideos(playlistId);
        }
    }, [playlistId]);

    return (
        <div className="relative">
            {/* Description Modal */}
            {showDescription && playlistInfo?.description && (
                <div className="absolute z-10 left-1/2 top-14 transform -translate-x-1/2 bg-neutral-800 rounded-xl overflow-hidden">
                    <div className="w-[600px] max-h-[500px] p-8 overflow-y-auto flex flex-col gap-2 items-end">
                        <AiOutlineClose
                            onClick={() => setShowDescription(false)}
                            className="text-2xl text-neutral-200 cursor-pointer"
                        />
                        <p className="text-lg whitespace-pre-line">
                            {playlistInfo.description}
                        </p>
                    </div>
                </div>
            )}

            {/* Playlist Info */}
            <div className="w-[90%] mx-auto mt-4 ms:mt-8">
                <div className="row row-cols-2 bg-neutral-900 p-3 md:p-5 rounded-xl">
                    {/* Thumbnail */}
                    <div className="col-12 col-md-4">
                        <img
                            src={playlistInfo?.thumbnail}
                            alt="Playlist Thumbnail"
                            className="aspect-[16/9] object-cover mx-auto bg-neutral-900"
                        />
                    </div>

                    {/* Details */}
                    <div className="col-12 col-md-8 flex flex-col gap-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            {playlistInfo?.title}
                        </h1>
                        {playlistInfo?.description && (
                            <div>
                                <p className="text-neutral-400 whitespace-pre-line line-clamp-3">
                                    {playlistInfo.description}
                                </p>
                                <button
                                    onClick={() => setShowDescription(true)}
                                    className="font-semibold"
                                >
                                    more
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Playlist Items */}
                <PlaylistItems
                    videos={playlistItems.videos}
                    channelId={channelId || ''}
                />
            </div>
        </div>
    );
}

export default Playlist;