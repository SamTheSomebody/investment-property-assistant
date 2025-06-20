import React from "react";

export default function ErrorDisplay({ message }: { message: string }) {
    return (
        <div className="flex-1 flex justify-center items-center">
            <div style={{ color: "red" }}>Error: {message}</div>
        </div>
    )
}