import { useEffect, useMemo, useState } from 'react';
import data from './data/students.json';
import type { Student } from './types';
import ReminderModal from './components/ReminderModal';
import PaymentHistoryDrawer from './components/PaymentDrawer';
import BulkAction from './components/BulkActionBar';
import SummaryCard from './components/SummaryCard';
import StudentTable from './components/StudentTable';
import Header from './components/Header'
import MobileCards from './components/MobileCards'
import ErrorState from './components/states/ErrorState'
import LoadingState from './components/states/LoadingState'
function mapStatus(raw: string): Student['status'] {
  switch (raw) {
    case 'OVERDUE':
      return 'urgent';
    case 'PARTIALLY_PAID':
      return 'partial';
    case 'PAYMENT_FAILED':
      return 'bounced';
    case 'INSTALMENT_PLAN':
      return 'instalment';
    case 'WITHDRAWN':
      return 'withdrawn';
    case 'CREDIT_BALANCE':
      return 'credit';
    case 'PAID':
    default:
      return 'paid';
  }
}

const students: Student[] = data.students.map((s) => ({
  id: Number(s.id.replace('STU-', '')),
  student: s.name,
  className: `${s.class}-${s.section}`,
  parent: s.guardian.name,
  phone: s.guardian.phone,
  pending: s.balance,
  overdueDays: s.daysOverdue,
  status: mapStatus(s.status),
  whatsapp: true,
  paymentHistory: (s.payments ?? []).map(
    (
      p: {
        id: string;
        date: string;
        amount: number;
        mode: string;
        note?: string;
      },
      i: number
    ) => ({
      id: i + 1,
      date: p.date,
      type: (p.mode === 'UPI'
        ? 'UPI'
        : p.mode === 'CASH'
          ? 'Cash'
          : 'Cheque') as 'UPI' | 'Cash' | 'Cheque',
      amount: p.amount,
      note: p.note,
    })
  ),
}));

const filters = [
  'all',
  'urgent',
  'partial',
  'bounced',
  'instalment',
  'withdrawn',
] as const;

export default function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  // demo states required by assignment
  const [loading] = useState(false);
  const [error] = useState('');
  const openHistory = (student: Student) => {
    setActiveStudent(student);
  };
  const filtered = useMemo(() => {
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
  }, [query, filter]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowReminderModal(false);
        setActiveStudent(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const totalOutstanding = useMemo(() => filtered.filter((s) => s.pending > 0).reduce((a, b) => a + b.pending, 0), [filtered]);

  const allVisibleSelected =
    filtered.length > 0 &&
    filtered.every((s) => selectedIds.includes(s.id));

  const toggleStudent = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const filteredIds = filtered.map((s) => s.id);

    if (allVisibleSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !filteredIds.includes(id))
      );
    } else {
      setSelectedIds((prev) =>
        Array.from(new Set([...prev, ...filteredIds]))
      );
    }
  };

  const sendReminders = () => {
    alert(
      `WhatsApp reminders queued for ${selectedIds.length} families`
    );
    setSelectedIds([]);
    setShowReminderModal(false);
  };

  if (loading) {
    return (
      <LoadingState />
    );
  }

  if (error) {
    return (
      <ErrorState />
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900'>
      <div className='mx-auto max-w-7xl p-4 md:p-6'>
        {/* Header */}
        <Header
          value={query}
          onChange={setQuery}
        />
        {/* Summary cards */}
        <SummaryCard
          actions={filtered.length}
          outstandingAmount={totalOutstanding}
          UrgentCases={filtered.filter((s) => s.status === 'urgent').length}
          reminders={48}
        />
        {/* Filters */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {filters.map((f) => (
            <button
              key={f}
              aria-label={`Filter ${f} students`}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${filter === f
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
            >
              {f === 'all' ? 'All needing action' : f}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className='rounded-2xl border border-gray-200 bg-white p-8 text-center'>
            <p className='font-medium text-gray-900'>
              No students match your filters
            </p>
            <p className='text-sm text-gray-500 mt-1'>
              Try clearing the search or choosing a different status.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <StudentTable
              students={filtered}
              selectedIds={selectedIds}
              allVisibleSelected={allVisibleSelected}
              onToggleStudent={toggleStudent}
              onToggleSelectAll={toggleSelectAll}
              onOpenHistory={openHistory}
            />
            {/* Mobile cards */}
            <MobileCards
              students={filtered}
              selectedIds={selectedIds}
              onToggleStudent={toggleStudent}
              onOpenHistory={openHistory}
            />
          </>
        )}
      </div>
      {/* Sticky bulk action bar */}
      <BulkAction
        count={selectedIds.length}
        onClear={() => setSelectedIds([])}
        onSend={() => setShowReminderModal(true)}
      />
      {/* Reminder modal */}
      <ReminderModal
        open={showReminderModal}
        count={selectedIds.length}
        onClose={() => setShowReminderModal(false)}
        onConfirm={sendReminders}
      />

      {/* Payment history drawer */}
      <PaymentHistoryDrawer
        student={activeStudent}
        onClose={() => setActiveStudent(null)}
      />
    </div>
  );
}