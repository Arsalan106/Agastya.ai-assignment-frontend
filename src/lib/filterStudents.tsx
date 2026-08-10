import type { Student } from '../types';

export type Filter =
    | 'all'
    | 'urgent'
    | 'partial'
    | 'bounced'
    | 'instalment'
    | 'withdrawn';

export function filterStudents(
    students: Student[],
    query: string,
    filter: Filter
) {
    const q = query.toLowerCase();

    return students
        .filter((s) => {
            const matchesQuery =
                s.student.toLowerCase().includes(q) ||
                s.parent.toLowerCase().includes(q);

            const matchesFilter =
                filter === 'all' ? s.status !== 'paid' : s.status === filter;

            return matchesQuery && matchesFilter;
        })
        .sort((a, b) => {
            if (a.status === 'urgent' && b.status !== 'urgent') return -1;
            if (a.status !== 'urgent' && b.status === 'urgent') return 1;
            return b.overdueDays - a.overdueDays;
        });
}