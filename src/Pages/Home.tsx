import React, { useEffect } from 'react';
import Card from '../Components/Card';
import { useHome } from '../Hooks/useHome';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Components/Loading';
import { HomeVideoCardType } from '../utils/Types';

function Home({
    filter,
    categoryId
}: {
    filter: string;
    categoryId: string | null;
}) {
    const { homeVideos, error, fetchHomeVideos } = useHome();

    useEffect(() => {
        fetchHomeVideos(filter, categoryId, homeVideos[filter].nextPageToken);
    }, [categoryId]);

    const loadMoreVideos = () => {
        fetchHomeVideos(filter, categoryId, homeVideos[filter].nextPageToken);
    };

    return (
        <div>
            {error ? (
                <div className="text-center mt-8 text-xl text-red-500 font-semibold">
                    {error}
                </div>
            ) : (
                <InfiniteScroll
                    next={loadMoreVideos}
                    hasMore={true}
                    dataLength={homeVideos[filter].videos.length}
                    loader={<Loading />}
                >
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 w-[95%] mx-auto mt-6">
                        {homeVideos[filter].videos.map((item: HomeVideoCardType) => (
                            <Card key={item.videoId} data={item} />
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Home;