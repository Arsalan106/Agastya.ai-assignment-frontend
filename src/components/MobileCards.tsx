import React from 'react';
import type { Student } from '../types';

interface MobileStudentCardsProps {
    students: Student[];
    selectedIds: number[];
    onToggleStudent: (id: number) => void;
    onOpenHistory: (student: Student) => void;
}

function MobileStudentCards({
    students,
    selectedIds,
    onToggleStudent,
    onOpenHistory,
}: MobileStudentCardsProps) {
    return (
        <div className="md:hidden space-y-3">
            {students.map((s) => (
                <div
                    key={s.id}
                    className="bg-white border border-gray-200 rounded-2xl p-4"
                >
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(s.id)}
                            onChange={() => onToggleStudent(s.id)}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            aria-label={`Select ${s.student}`}
                        />

                        <div className="flex-1">
                            <div className="flex justify-between items-start gap-3">
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {s.student}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Class {s.className}
                                    </p>
                                </div>

                                <span
                                    className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${s.status === 'urgent'
                                            ? 'bg-red-100 text-red-700'
                                            : s.status === 'partial'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : s.status === 'bounced'
                                                    ? 'bg-orange-100 text-orange-700'
                                                    : s.status === 'instalment'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : s.status === 'withdrawn'
                                                            ? 'bg-gray-200 text-gray-700'
                                                            : s.status === 'credit'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {s.status === 'urgent'
                                        ? 'Overdue'
                                        : s.status === 'partial'
                                            ? 'Partial'
                                            : s.status === 'bounced'
                                                ? 'Bounced'
                                                : s.status === 'instalment'
                                                    ? 'Instalment'
                                                    : s.status === 'withdrawn'
                                                        ? 'Withdrawn'
                                                        : s.status === 'credit'
                                                            ? 'Credit'
                                                            : s.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Pending</p>
                                    <p className="font-semibold">
                                        {s.pending < 0
                                            ? `Credit ₹${Math.abs(s.pending).toLocaleString('en-IN')}`
                                            : `₹${s.pending.toLocaleString('en-IN')}`}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Overdue</p>
                                    <p className="font-semibold">
                                        {s.overdueDays > 0
                                            ? `${s.overdueDays} days`
                                            : '—'}
                                    </p>
                                </div>
                            </div>

                            {s.parent === 'Clive Fernandes' && (
                                <p className="text-xs text-blue-600 mt-3">
                                    Sibling account — chase family once
                                </p>
                            )}

                            <button
                                onClick={() => onOpenHistory(s)}
                                className="mt-4 w-full rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                View payment history
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default React.memo(MobileStudentCards);