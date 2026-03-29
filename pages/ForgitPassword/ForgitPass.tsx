import AuthPageImg from '@/components/AuthPageImg'
import ReastPassword from '@/components/forms/ReastPassword'
import React from 'react'

const ForgitPass = () => {
    return (
        <main className='w-full flex items-center h-screen relative bg-gray-50'>
            <div className="w-full relative h-full flex items-center justify-center">
                <ReastPassword />
            </div>
            <AuthPageImg />
        </main >
    )
}

export default ForgitPass