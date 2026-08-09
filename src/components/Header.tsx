import react from 'react';


interface HeaderProps {
    value: string,
    onChange: (value: string) => void
}
const Header = ({ value, onChange }: HeaderProps) => {
    return (
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6'>
            <div>
                <h1 className='text-3xl font-bold'>
                    Fee Follow-up Dashboard
                </h1>
                <p className='text-sm text-gray-500 mt-1'>
                    8 Aug 2026 • Fees due on 5 Aug
                </p>
            </div>

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder='Search student or parent'
                className='w-full md:w-80 rounded-xl border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            />
        </div>
    )
}

export default Header;