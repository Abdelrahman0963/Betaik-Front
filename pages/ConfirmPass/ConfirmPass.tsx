"use client"
import AuthPageImg from '@/components/AuthPageImg'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import ChangePas from '@/components/forms/ChangePas'

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

                {/* Form Container */}
                <div className="flex-1 flex flex-col justify-center w-full max-w-[480px] mx-auto px-8 lg:px-0">
                    <div className="flex flex-col gap-2.5 mb-8">
                        <h1 className='text-3xl lg:text-[34px] font-bold text-[#1A1A1A] leading-tight'>
                            Dashboard Login
                        </h1>
                        <p className='text-[15px] text-[#6B7280] font-medium'>
                            Access your management panel
                        </p>
                    </div>
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