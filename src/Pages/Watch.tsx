import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoDetails from '../Components/VideoDetails';
import MiniCard from '../Components/MiniCard';
import { HomeVideoCardType } from '../utils/Types';
import Comments from '../Components/Comments';
import { getActivities, getActvitiesVideos, getVideoDetails } from '../utils/api';
import { fetchVideosWithChannels } from '../utils/videoDetailsHelper';

function Watch() {
    const { videoId, channelId } = useParams();
    const [activities, setActivities] = useState<HomeVideoCardType[]>();
    const [details, setDetails] = useState<HomeVideoCardType>();

    const fetchDetails = async () => {
        try {
            const res = await getVideoDetails(videoId!);
            const videoDetails = await fetchVideosWithChannels(res);
            setDetails(videoDetails[0]);
        } catch (error) {
            console.error("Failed to fetch video details:", error);
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await getActivities(channelId!);

            const videoIds: string[] = response.items
                .map((item: {
                    contentDetails: {
                        upload?: { videoId: string };
                        playlistItem?: { resourceId: { videoId: string } };
                    };
                }) => item.contentDetails.upload?.videoId ?? null)
                .filter((id): id is string => typeof id === "string" && id.length > 0);

            const vidResponse = await getActvitiesVideos(videoIds);
            const videosArray = await fetchVideosWithChannels(vidResponse.items);
            setActivities(videosArray);
        } catch (error) {
            console.error("Failed to fetch activities:", error);
        }
    };

    useEffect(() => {
        fetchDetails();
        fetchActivities();
    }, [videoId, channelId]);

    return (
        <div className='w-[95%] mx-auto mt-6 mb-12'>
            <div className="row">
                <div className="col-xl-8 col-lg-7">
                    <iframe
                        className="w-full aspect-[16/9] bg-neutral-900"
                        src={`https://www.youtube.com/embed/${details?.videoId}?autoplay=1`}
                        title='Youtube video player'
                        allow='autoplay; picture-inpicture;'
                        allowFullScreen
                    />
                    <VideoDetails details={details} />
                    <div className="lg:block hidden">
                        <Comments videoId={details?.videoId} />
                    </div>
                </div>
                <div className="col-xl-4 col-lg-5 flex flex-col gap-3 lg:mt-0 mt-3">
                    {activities?.map((item) => (
                        <MiniCard key={item.videoId} item={item} />
                    ))}
                </div>
                <div className="block lg:hidden">
                    <Comments videoId={details?.videoId} />
                </div>
            </div>
        </div>
    );
}

export default Watch;