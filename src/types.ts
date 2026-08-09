export type StudentStatus =
    | 'paid'
    | 'urgent'
    | 'partial'
    | 'bounced'
    | 'instalment'
    | 'withdrawn'
    | 'credit';

// ADD THIS
export type PaymentType = 'UPI' | 'Cash' | 'Cheque';

export interface PaymentHistory {
    id: number;
    date: string;
    type: PaymentType;
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
    paymentHistory: PaymentHistory[];
}