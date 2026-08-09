import { useMemo, useState } from 'react';
import data from './data/students.json';
import type { Student } from './types';

const students: Student[] = data.students.map((s) => ({
  id: Number(s.id.replace('STU-', '')),
  student: s.name,
  className: `${s.class}-${s.section}`,
  parent: s.guardian.name,
  phone: s.guardian.phone,
  pending: s.balance,
  overdueDays: s.daysOverdue,
  status: (s.status.toLowerCase() === 'overdue' ? 'urgent' : s.status.toLowerCase()) as Student['status'],
  whatsapp: true,
  paymentHistory: (s.payments ?? []).map((p: { id: string; date: string; amount: number; mode: string; note?: string }, i: number) => ({
    id: i + 1,
    date: p.date,
    type: (p.mode === 'UPI' ? 'UPI' : p.mode === 'Cash' ? 'Cash' : 'Cheque') as 'UPI' | 'Cash' | 'Cheque',
    amount: p.amount,
    note: p.note,
  })),
}));

export default function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q =
        s.student.toLowerCase().includes(query.toLowerCase()) ||
        s.parent.toLowerCase().includes(query.toLowerCase());

      const f = filter === 'all' ? true : s.status === filter;

      return q && f && s.pending > 0;
    });
  }, [query, filter]);

  const totalOutstanding = filtered.reduce((a, b) => a + b.pending, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Fee Follow-up Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              8 Aug 2026 • Fees due on 5 Aug
            </p>
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search student or parent"
            className="w-full md:w-80 rounded-xl border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-sm text-gray-500">Overdue students</p>
            <p className="text-2xl font-bold mt-1">{filtered.length}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-sm text-gray-500">Outstanding amount</p>
            <p className="text-2xl font-bold mt-1">
              ₹{totalOutstanding.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-sm text-gray-500">Urgent cases</p>
            <p className="text-2xl font-bold mt-1">
              {filtered.filter((s) => s.status === 'urgent').length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-sm text-gray-500">Reminders sent today</p>
            <p className="text-2xl font-bold mt-1">48</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['all', 'urgent', 'partial', 'bounced'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${filter === f
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
            >
              {f === 'all' ? 'All overdue' : f}
            </button>
          ))}
        </div>

        <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Parent</th>
                <th className="px-4 py-3 font-medium text-right">Pending</th>
                <th className="px-4 py-3 font-medium text-right">Overdue</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">{s.student}</td>
                  <td className="px-4 py-4 text-gray-700">{s.className}</td>
                  <td className="px-4 py-4 text-gray-700">{s.parent}</td>
                  <td className="px-4 py-4 text-right font-medium text-gray-900">
                    ₹{s.pending.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-700">{s.overdueDays}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-3">
          {filtered.map((s) => (
            <div key={s.id} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{s.student}</p>
                  <p className="text-sm text-gray-500">Class {s.className}</p>
                </div>

                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 capitalize">
                  {s.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">Pending</p>
                  <p className="font-semibold">
                    ₹{s.pending.toLocaleString('en-IN')}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Overdue</p>
                  <p className="font-semibold">{s.overdueDays} days</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}