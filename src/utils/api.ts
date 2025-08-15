import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube";

// 🔹 Fetch most popular videos by category
export const getHomeVideos = async (categoryId: string, pageToken?: string) => {
    const url = `${BASE_URL}/v3/videos?key=${API_KEY}&part=snippet,statistics,contentDetails&chart=mostPopular${categoryId ? `&videoCategoryId=${categoryId}` : ""
        }${pageToken ? `&pageToken=${pageToken}` : ""}&maxResults=20`;

    const response = await axios.get(url);
    return response.data;
};

// 🔹 Fetch multiple videos by ID
export const getActvitiesVideos = async (videoIds: string[]) => {
    const url = `${BASE_URL}/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoIds.join(",")}`;
    const response = await axios.get(url);
    return response.data;
};

// 🔹 Fetch details for a single video
export const getVideoDetails = async (videoId: string) => {
    const url = `${BASE_URL}/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;
    const response = await axios.get(url);
    return response.data.items;
};

// 🔹 Fetch channel activities
export const getActivities = async (channelId: string, pageToken?: string) => {
    const url = `${BASE_URL}/v3/activities?key=${API_KEY}&part=snippet,contentDetails&channelId=${channelId}${pageToken ? `&pageToken=${pageToken}` : ""
        }&maxResults=20`;

    const response = await axios.get(url);
    return response.data;
};

// 🔹 Fetch comments for a video
export const getVideoComments = async (videoId: string, pageToken?: string) => {
    const url = `${BASE_URL}/v3/commentThreads?key=${API_KEY}&part=snippet,replies&videoId=${videoId}${pageToken ? `&pageToken=${pageToken}` : ""
        }`;

    const response = await axios.get(url);
    return response.data;
};

// 🔹 Fetch replies to a comment
export const getCommentReplies = async (commentId: string) => {
    const url = `${BASE_URL}/v3/comments?key=${API_KEY}&part=snippet&parentId=${commentId}`;
    const response = await axios.get(url);
    return response.data.items;
};

// 🔹 Fetch channel info (single or multiple)
export const getChannelInfo = async (channelId?: string, channelIds?: string[]) => {
    const idParam = channelId ?? channelIds?.join(",");
    const url = `${BASE_URL}/v3/channels?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${idParam}`;
    const response = await axios.get(url);
    return response.data.items;
};

// 🔹 Fetch playlists from a channel
export const getChannelPlaylists = async (channelId: string, pageToken?: string) => {
    const url = `${BASE_URL}/v3/playlists?key=${API_KEY}&part=snippet,contentDetails&channelId=${channelId}${pageToken ? `&pageToken=${pageToken}` : ""
        }&maxResults=8`;

    const response = await axios.get(url);
    return response.data;
};

// 🔹 Fetch details of a single playlist
export const getPlaylistInfo = async (playlistId: string) => {
    const url = `${BASE_URL}/v3/playlists?key=${API_KEY}&part=snippet,contentDetails&id=${playlistId}&maxResults=20`;
    const response = await axios.get(url);
    return response.data.items[0];
};

// 🔹 Fetch videos inside a playlist
export const getPlaylistVideos = async (playlistId: string, pageToken?: string) => {
    const url = `${BASE_URL}/v3/playlistItems?key=${API_KEY}&part=snippet,contentDetails&playlistId=${playlistId}${pageToken ? `&pageToken=${pageToken}` : ""
        }&maxResults=20`;

    const response = await axios.get(url);
    return response.data;
};

// 🔹 Search videos by query
export const getSearchVideos = async (query: string, pageToken?: string) => {
    const url = `${BASE_URL}/v3/search?key=${API_KEY}&part=snippet&q=${encodeURIComponent(query)}${pageToken ? `&pageToken=${pageToken}` : ""
        }&maxResults=20`;

    const response = await axios.get(url);
    return response.data;
};