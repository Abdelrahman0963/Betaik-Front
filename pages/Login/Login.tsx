import AuthPageImg from '@/components/AuthPageImg'
import LoginForm from '@/components/forms/LoginForm'
import Image from 'next/image'
import React from 'react'

const Login = () => {
    return (
        <section className='flex items-center w-full h-screen relative'>
            <Image src="/icons/beitak main logo blue-01 png 1.svg" loading='lazy' alt="logo" width={120} height={33.4} className='absolute top-11 left-24 transform -translate-x-1/2 -translate-y-1/2' />
            <div className="w-full bg-white h-full flex items-center justify-center">
                <LoginForm />
            </div>
            <AuthPageImg />
        </section >
    )
}

export default Login
