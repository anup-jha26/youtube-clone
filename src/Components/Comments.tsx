import { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import { CommentBodyType } from '../utils/Types';
import { getVideoComments } from '../utils/api';
import { parseComments } from '../utils/parseData';

const API_KEY = import.meta.env.VITE_API_KEY;

interface CommentState {
    comments: CommentBodyType[];
    nextPageToken: string | null;
}

function Comments({ videoId }: { videoId?: string }) {
    const [commentList, setCommentList] = useState<CommentState>({
        comments: [],
        nextPageToken: null
    });

    const loadComments = async () => {
        if (!videoId || !commentList.nextPageToken && commentList.comments.length > 0) return;

        try {
            const response = await getVideoComments(videoId, commentList.nextPageToken || '');
            const parsedComments = parseComments(response.items);

            setCommentList(prev => ({
                comments: [...prev.comments, ...parsedComments],
                nextPageToken: response.nextPageToken || null
            }));
        } catch (err) {
            console.error('Failed to fetch comments');
        }
    };

    useEffect(() => {
        if (videoId) {
            setCommentList({ comments: [], nextPageToken: null }); // Reset on video change
            loadComments();
        }
    }, [videoId]);

    return (
        <div className="mt-3 flex flex-col gap-2">
            <h2 className="px-4 text-lg sm:text-xl md:text-2xl font-semibold">Comments</h2>
            {commentList.comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
            ))}
            {commentList.nextPageToken && (
                <button
                    className="text-gray-400 hover:underline self-start px-4"
                    onClick={loadComments}
                >
                    Show more...
                </button>
            )}
        </div>
    );
}

export default Comments;