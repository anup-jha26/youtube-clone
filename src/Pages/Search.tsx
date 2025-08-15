import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActvitiesVideos, getSearchVideos } from '../utils/api';
import { fetchVideosWithChannels } from '../utils/videoDetailsHelper';
import { HomeVideoCardType } from '../utils/Types';
import Card from '../Components/Card';

function Search({ setSearch }: { setSearch: (q: string) => void }) {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");
    const [searchList, setSearchList] = useState<HomeVideoCardType[] | null>();

    const fetchSearchVideos = async () => {
        if (!searchQuery) return;

        try {
            const searchVideosData = await getSearchVideos(searchQuery);
            console.log(searchVideosData);

            const videoIds: string[] = searchVideosData.items
                .map((item: { id: { videoId?: string | null } }) => item.id.videoId ?? null)
                .filter((id): id is string => typeof id === "string" && id.length > 0);

            const VideosData = await getActvitiesVideos(videoIds);
            const videosArray = await fetchVideosWithChannels(VideosData.items);

            setSearchList(videosArray);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchList([]);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            setSearchList(null);
            fetchSearchVideos();
        }

        return () => {
            setSearchList(null);
            setSearch("");
        };
    }, [searchQuery]);

    return (
        <div className='row row-cols-md-3 row-cols-sm-2 row-cols-1 w-[95%] mx-auto md:mt-6 mt-4'>
            {searchList?.map((item: HomeVideoCardType) => (
                <Card key={item.videoId} data={item} />
            ))}
        </div>
    );
}

export default Search;