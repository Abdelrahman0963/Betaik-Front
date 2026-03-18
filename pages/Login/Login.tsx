import AuthPageImg from '@/components/AuthPageImg'
import LoginForm from '@/components/forms/LoginForm'
import React from 'react'

const Login = () => {
    return (
        <section className='W-full  flex items-center w-full h-screen relative'>
            <div className="w-full relative   h-full flex items-center justify-center">
                <LoginForm />
            </div>
            <AuthPageImg />
        </section >
    )
}

export default Login
