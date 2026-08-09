import React from 'react';
import type { Student } from '../types';

interface PaymentHistoryDrawerProps {
    student: Student | null;
    onClose: () => void;
}

export default function PaymentHistoryDrawer({
    student,
    onClose,
}: PaymentHistoryDrawerProps) {
    if (!student) return null;

    return (<div className="fixed inset-0 z-40"> <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-full md:w-[420px] bg-white border-l border-gray-200 shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {student.student}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Class {student.className} • {student.parent}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Close payment history"
                >
                    ✕
                </button>
            </div>

            <div className="p-5 space-y-5">
                <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-gray-200 p-3">
                        <p className="text-xs text-gray-500">Pending</p>
                        <p className="font-semibold mt-1">
                            ₹{Math.abs(student.pending).toLocaleString('en-IN')}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-3">
                        <p className="text-xs text-gray-500">Overdue</p>
                        <p className="font-semibold mt-1">
                            {student.overdueDays} days
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-3">
                        <p className="text-xs text-gray-500">Contact</p>
                        <p className="font-semibold mt-1">
                            {student.whatsapp ? 'WhatsApp' : 'Call'}
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Payment history
                    </h3>

                    <div className="space-y-3">
                        {student.paymentHistory.map((p) => (
                            <div
                                key={p.id}
                                className="rounded-xl border border-gray-200 p-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-medium text-gray-900">{p.type}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {p.date}
                                        </p>
                                    </div>

                                    <p className="font-semibold text-gray-900 whitespace-nowrap">
                                        ₹{p.amount.toLocaleString('en-IN')}
                                    </p>
                                </div>

                                {p.note && (
                                    <div className="mt-3 rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-700">
                                        {p.note}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">
                        Next suggested action
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        {student.status === 'urgent'
                            ? 'Call parent today and flag for principal review.'
                            : student.status === 'bounced'
                                ? 'Request alternate payment method before sending another reminder.'
                                : student.status === 'instalment'
                                    ? 'Do not chase today; next instalment is scheduled.'
                                    : student.status === 'withdrawn'
                                        ? 'Do not chase; refund approval is pending.'
                                        : student.status === 'credit'
                                            ? 'No follow-up required; credit will carry forward.'
                                            : 'Send WhatsApp reminder and follow up in 3 days if unpaid.'}
                    </p>
                </div>
            </div>
        </div>
    </div>

    );
}
