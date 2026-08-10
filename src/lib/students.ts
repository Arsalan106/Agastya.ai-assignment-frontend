import rawData from '../data/students.json';
import type { Student } from '../types';

const statusMap: Record<string, Student['status']> = {
    OVERDUE: 'urgent',
    PARTIALLY_PAID: 'partial',
    PAYMENT_FAILED: 'bounced',
    INSTALMENT_PLAN: 'instalment',
    WITHDRAWN: 'withdrawn',
    CREDIT_BALANCE: 'credit',
    PAID: 'paid',
};

export const students: Student[] = rawData.students.map((s) => ({
    id: Number(s.id.replace('STU-', '')),
    student: s.name,
    className: `${s.class}-${s.section}`,
    parent: s.guardian.name,
    phone: s.guardian.phone,
    pending: s.balance,
    overdueDays: s.daysOverdue,
    status: statusMap[s.status] ?? 'paid',
    whatsapp: true,
    paymentHistory: (s.payments ?? []).map((p, i) => ({
        id: i + 1,
        date: p.date,
        type:
            p.mode === 'UPI'
                ? 'UPI'
                : p.mode === 'CASH'
                    ? 'Cash'
                    : 'Cheque',
        amount: p.amount,
        note: p.note,
    })),
}));