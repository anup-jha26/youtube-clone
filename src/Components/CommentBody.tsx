import React from 'react';
import { BiLike } from 'react-icons/bi';
import { CommentBodyType } from '../utils/Types';

function CommentBody({ item }: { item: CommentBodyType }) {
    const { authorProfile, authorName, commentText, commentLikes } = item;

    return (
        <div className="flex gap-2 sm:gap-3">
            <img
                src={authorProfile}
                alt={`${authorName}'s profile`}
                className="rounded-full aspect-square sm:w-10 w-9 bg-neutral-900 object-cover"
            />
            <div className="flex flex-col gap-1">
                <h5 className="text-md font-medium">{authorName}</h5>
                <p className="text-neutral-300 whitespace-pre-line">{commentText}</p>
                <div className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                    <BiLike />
                    <span>{commentLikes}</span>
                </div>
            </div>
        </div>
    );
}

export default CommentBody;