import type { Student } from '../types';

interface StudentTableProps {
    students: Student[];
    selectedIds: number[];
    allVisibleSelected: boolean;
    onToggleStudent: (id: number) => void;
    onToggleSelectAll: () => void;
    onOpenHistory: (student: Student) => void;
}

export default function StudentTable({
    students,
    selectedIds,
    allVisibleSelected,
    onToggleStudent,
    onToggleSelectAll,
    onOpenHistory,
}: StudentTableProps) {
    return (
        <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-left text-sm text-gray-500">
                        <th className="px-4 py-3">
                            <input
                                type="checkbox"
                                checked={allVisibleSelected}
                                onChange={onToggleSelectAll}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                aria-label="Select all visible students"
                            />
                        </th>

                        <th className="px-4 py-3 font-medium">Student</th>
                        <th className="px-4 py-3 font-medium">Class</th>
                        <th className="px-4 py-3 font-medium">Parent</th>
                        <th className="px-4 py-3 font-medium text-right">
                            Pending
                        </th>
                        <th className="px-4 py-3 font-medium text-right">
                            Overdue
                        </th>
                        <th className="px-4 py-3 font-medium text-right">
                            History
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((s) => (
                        <tr
                            key={s.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                        >
                            <td className="px-4 py-4">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(s.id)}
                                    onChange={() => onToggleStudent(s.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    aria-label={`Select ${s.student}`}
                                />
                            </td>

                            <td className="px-4 py-4 font-medium text-gray-900">
                                {s.student}
                            </td>

                            <td className="px-4 py-4 text-gray-700">
                                {s.className}
                            </td>

                            <td className="px-4 py-4 text-gray-700">
                                {s.parent}
                            </td>

                            <td className="px-4 py-4 text-right font-medium text-gray-900">
                                ₹{s.pending.toLocaleString('en-IN')}
                            </td>

                            <td className="px-4 py-4 text-right text-gray-700">
                                {s.overdueDays}d
                            </td>

                            <td className="px-4 py-4 text-right">
                                <button
                                    onClick={() => onOpenHistory(s)}
                                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                >
                                    History
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}