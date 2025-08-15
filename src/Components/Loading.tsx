import React from 'react';

function Loading() {
    return (
        <div className="flex justify-center items-center w-full my-8">
            <div
                className="w-10 h-10 border-[3px] border-red-500 border-t-transparent rounded-full animate-spin"
                role="status"
                aria-label="Loading"
            ></div>
        </div>
    );
}

export default Loading;