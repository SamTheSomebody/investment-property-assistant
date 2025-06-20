import React from "react";

export default function Loading() {
    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-dark"></div>
        </div>
    )
}