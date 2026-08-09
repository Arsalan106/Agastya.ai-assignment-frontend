import React from 'react';

interface ReminderModalProps {
    open: boolean;
    count: number;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ReminderModal({
    open,
    count,
    onClose,
    onConfirm,
}: ReminderModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reminder-title"
        >
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-6 shadow-xl">
                <h2
                    id="reminder-title"
                    className="text-lg font-semibold text-gray-900"
                >
                    Queue reminders
                </h2>

                <p className="text-gray-600 mt-2">
                    Queue reminders for{' '}
                    <span className="font-semibold">{count} families</span>?
                </p>

                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                    Hi, this is a reminder that the school fee for August is overdue.
                    Please clear the pending amount at the earliest.
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Queue reminders
                    </button>
                </div>
            </div>
        </div>
    );
}