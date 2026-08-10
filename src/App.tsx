import { useMemo, useState } from 'react';
import type { Student } from './types';

import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import StudentTable from './components/StudentTable';
import MobileCards from './components/MobileCards';
import BulkAction from './components/BulkActionBar';
import ReminderModal from './components/ReminderModal';
import PaymentHistoryDrawer from './components/PaymentDrawer';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';

import { students } from './lib/students';
import { filterStudents, type Filter } from './lib/filterStudents';
import { useSelection } from './hooks/useSelection';
import { useEscape } from './hooks/useEscape';

const filters: Filter[] = [
  'all',
  'urgent',
  'partial',
  'bounced',
  'instalment',
  'withdrawn',
];

export default function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  // selection state
  const { selectedIds, toggle, clear, toggleAll } = useSelection();

  // demo states required by assignment
  const loading = false;
  const error = '';

  // filtered + sorted students
  const filtered = useMemo(
    () => filterStudents(students, query, filter),
    [query, filter]
  );

  // summary calculations
  const totalOutstanding = useMemo(
    () =>
      filtered
        .filter((s) => s.pending > 0)
        .reduce((sum, s) => sum + s.pending, 0),
    [filtered]
  );

  const urgentCount = useMemo(
    () => filtered.filter((s) => s.status === 'urgent').length,
    [filtered]
  );

  const allVisibleSelected =
    filtered.length > 0 &&
    filtered.every((s) => selectedIds.includes(s.id));

  // close modal/drawer on Escape
  useEscape(() => {
    setShowReminderModal(false);
    setActiveStudent(null);
  });

  const handleSelectAll = () => {
    toggleAll(
      filtered.map((s) => s.id),
      allVisibleSelected
    );
  };

  const handleSendReminders = () => {
    alert(
      `WhatsApp reminders queued for ${selectedIds.length} families`
    );

    clear();
    setShowReminderModal(false);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <Header value={query} onChange={setQuery} />

      <div className='mx-auto max-w-7xl px-4 py-6 space-y-6'>
        {/* Summary cards */}
        <SummaryCard
          actions={filtered.length}
          outstandingAmount={totalOutstanding}
          UrgentCases={urgentCount}
          reminders={48}
        />

        {/* Filters */}
        <div className='flex flex-wrap gap-2'>
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
            <p className='mt-1 text-sm text-gray-500'>
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
              onToggleStudent={toggle}
              onToggleSelectAll={handleSelectAll}
              onOpenHistory={setActiveStudent}
            />

            {/* Mobile cards */}
            <MobileCards
              students={filtered}
              selectedIds={selectedIds}
              onToggleStudent={toggle}
              onOpenHistory={setActiveStudent}
            />
          </>
        )}
      </div>

      {/* Sticky bulk action bar */}
      <BulkAction
        count={selectedIds.length}
        onClear={clear}
        onSend={() => setShowReminderModal(true)}
      />

      {/* Reminder modal */}
      <ReminderModal
        open={showReminderModal}
        count={selectedIds.length}
        onClose={() => setShowReminderModal(false)}
        onConfirm={handleSendReminders}
      />

      {/* Payment history drawer */}
      <PaymentHistoryDrawer
        student={activeStudent}
        onClose={() => setActiveStudent(null)}
      />
    </div>
  );
}