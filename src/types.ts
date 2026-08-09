export type StudentStatus =
    | 'urgent'
    | 'partial'
    | 'bounced'
    | 'waiver';

export interface PaymentRecord {
    id: number;
    date: string;
    type: 'UPI' | 'Cash' | 'Cheque';
    amount: number;
    note?: string;
}

export interface Student {
    id: number;
    student: string;
    className: string;
    parent: string;
    phone: string;
    pending: number;
    overdueDays: number;
    status: StudentStatus;
    whatsapp: boolean;
    paymentHistory: PaymentRecord[];
}