import AuthPageImg from '@/components/AuthPageImg'
import LoginForm from '@/components/forms/LoginForm'
import React from 'react'
const Login = () => {
    return (
        <main className='w-full flex items-center h-screen relative bg-gray-50'>
            <div className="w-full relative h-full flex items-center justify-center">
                <LoginForm />
            </div>
            <AuthPageImg />
        </main >
    )
}

export default Login
