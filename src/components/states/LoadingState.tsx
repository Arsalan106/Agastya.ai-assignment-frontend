const LoadingState = () => {
    return (
        <div className='min-h-screen grid place-items-center bg-gray-50'>
            <div className='text-center'>
                <div className='mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600' />
                <p className='mt-3 text-sm text-gray-600'>
                    Loading fee records…
                </p>
            </div>
        </div>
    )
}

export default LoadingState