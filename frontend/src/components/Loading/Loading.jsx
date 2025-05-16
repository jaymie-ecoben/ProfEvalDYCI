import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-400 rounded-full animate-ping opacity-75"></div>
            </div>
        </div>
    );
};

export default Loading; 