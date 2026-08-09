import React from 'react';

interface BulkActionBarProps {
    count: number;
    onClear: () => void;
    onSend: () => void;
}

export default function BulkActionBar({
    count,
    onClear,
    onSend
}: BulkActionBarProps) {
    if (count === 0) return null;

    return (<div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-white border border-gray-200 shadow-lg rounded-2xl px-4 py-3 flex items-center justify-between gap-3 z-30"> <p className="text-sm font-medium text-gray-900">
        {count} selected </p>
        <div className="flex items-center gap-2">
            <button
                onClick={onClear}
                className="px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Clear
            </button>

            <button
                onClick={onSend}
                className="px-3 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
                Queue WhatsApp reminders
            </button>
        </div>
    </div>

    );
}
