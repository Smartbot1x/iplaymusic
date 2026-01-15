import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div
                className="w-20 h-20 border-15 border-t-[#FF6A00] border-gray-300 rounded-full animate-spin"
            ></div>
        </div>
    );
}

export default Loading;
