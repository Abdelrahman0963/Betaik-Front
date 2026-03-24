"use client"
import AuthPageImg from '@/components/AuthPageImg'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const ChangePas = dynamic(() => import('@/components/forms/ChangePas'), { ssr: false });
const ConfirmPass = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <section className='flex w-full h-screen overflow-hidden bg-white'>
            <div className="w-full lg:w-1/2 h-full flex flex-col bg-white overflow-y-auto relative z-10">
                <div className="absolute top-11 left-24 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <Image
                        src="/icons/beitak main logo blue-01 png 1.svg"
                        loading="lazy"
                        alt="logo"
                        width={120}
                        height={33.4}
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center w-full max-w-120 mx-auto px-8 lg:px-0">
                    <ChangePas />
                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 h-full">
                <AuthPageImg />
            </div>
        </section>
    )
}

export default ConfirmPass