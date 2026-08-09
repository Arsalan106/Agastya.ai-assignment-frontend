import react from 'react'

interface SummarCardProps {
    actions: number,
    outstandingAmount: number,
    UrgentCases: number,
    reminders: number
}
export default function SummaryCard({ actions, outstandingAmount, UrgentCases, reminders }: SummarCardProps) {

    return (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            <div className='bg-white border border-gray-200 rounded-2xl p-4'>
                <p className='text-sm text-gray-500'>Accounts needing action</p>
                <p className='text-2xl font-bold mt-1'>{actions}</p>
            </div>

            <div className='bg-white border border-gray-200 rounded-2xl p-4'>
                <p className='text-sm text-gray-500'>Outstanding amount</p>
                <p className='text-2xl font-bold mt-1'>
                    ₹{outstandingAmount.toLocaleString('en-IN')}
                </p>
            </div>

            <div className='bg-white border border-gray-200 rounded-2xl p-4'>
                <p className='text-sm text-gray-500'>Urgent cases</p>
                <p className='text-2xl font-bold mt-1'>
                    {UrgentCases}
                </p>
            </div>

            <div className='bg-white border border-gray-200 rounded-2xl p-4'>
                <p className='text-sm text-gray-500'>Reminders sent today</p>
                <p className='text-2xl font-bold mt-1'>{reminders}</p>
            </div>
        </div>
    )
}