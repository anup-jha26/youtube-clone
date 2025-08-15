import {
    ChannelPlaylistsType,
    CommentBodyType,
    HomeVideoCardType
} from "./Types";

// 🔹 Parse video items into HomeVideoCardType[]
export const parseVideos = (items: any[]): HomeVideoCardType[] => {
    return items.map((item: any) => ({
        videoId: item.id,
        videoTitle: item.snippet?.title ?? "",
        videoDescription: item.snippet?.description ?? "",
        videoThumbnail:
            item.snippet?.thumbnails?.standard?.url ??
            item.snippet?.thumbnails?.default?.url ??
            "",
        videoDuration: item.contentDetails?.duration ?? "",
        videoViews: item.statistics?.viewCount ?? "0",
        videoLikes: item.statistics?.likeCount ?? "0",
        videoAge: item.snippet?.publishedAt ?? "",
        channelInfo: {
            id: item.snippet?.channelId ?? "",
            name: item.snippet?.channelTitle ?? ""
        }
    }));
};

// 🔹 Parse channel playlists
export const parseChannelPlaylists = (items: any[]): ChannelPlaylistsType[] => {
    return items.map((item: any) => ({
        id: item.id,
        title: item.snippet?.title ?? "",
        thumbnail:
            item.snippet?.thumbnails?.high?.url ??
            item.snippet?.thumbnails?.standard?.url ??
            "",
        videoCount: item.contentDetails?.itemCount ?? 0
    }));
};

// 🔹 Parse top-level comments
export const parseComments = (items: any[]): CommentBodyType[] => {
    return items.map((comment: any) => {
        const snippet = comment.snippet?.topLevelComment?.snippet ?? {};
        return {
            commentId: comment.id,
            authorChannelId: snippet.authorChannelId?.value ?? "",
            authorProfile: snippet.authorProfileImageUrl ?? "",
            authorName: snippet.authorDisplayName ?? "",
            commentText: snippet.textOriginal ?? "",
            commentLikes: snippet.likeCount ?? 0,
            commentRepliesCount: comment.snippet?.totalReplyCount ?? 0
        };
    });
};

// 🔹 Parse replies to comments
export const parseReplies = (items: any[]): CommentBodyType[] => {
    return items.map((item: any) => ({
        commentId: item.id,
        authorChannelId: item.snippet?.authorChannelId?.value ?? "",
        authorProfile: item.snippet?.authorProfileImageUrl ?? "",
        authorName: item.snippet?.authorDisplayName ?? "",
        commentText: item.snippet?.textOriginal ?? "",
        commentLikes: item.snippet?.likeCount ?? 0
    }));
};

// 🔹 Parse single playlist info
export const parsePlaylistInfo = (item: any) => ({
    id: item.id,
    title: item.snippet?.title ?? "",
    description: item.snippet?.description ?? "",
    thumbnail:
        item.snippet?.thumbnails?.standard?.url ??
        item.snippet?.thumbnails?.high?.url ??
        ""
});