const ErrorState = () => {
    return (
        <div className='min-h-screen bg-gray-50 p-6'>
            <div className='mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700'>
                Failed to load fee records.
            </div>
        </div>
    )
}
export default ErrorState;