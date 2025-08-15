import { useState, useEffect } from 'react';
import { CommentBodyType } from '../utils/Types';
import CommentBody from './CommentBody';
import { getCommentReplies } from '../utils/api';
import { parseReplies } from '../utils/parseData';

const API_KEY = import.meta.env.VITE_API_KEY;

function CommentCard({ comment }: { comment: CommentBodyType }) {
    const [replies, setReplies] = useState<CommentBodyType[]>([]);

    useEffect(() => {
        const loadReplies = async () => {
            if (comment.commentRepliesCount) {
                try {
                    const response = await getCommentReplies(comment.commentId);
                    const parsed = parseReplies(response);
                    setReplies(parsed);
                } catch (err) {
                    console.error('Failed to load comment replies');
                }
            }
        };

        loadReplies();
    }, [comment.commentId, comment.commentRepliesCount]);

    return (
        <div className="flex flex-col gap-2">
            <CommentBody item={comment} />
            {replies.length > 0 && (
                <div className="pl-14">
                    {replies.map((reply, index) => (
                        <CommentBody key={index} item={reply} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentCard;