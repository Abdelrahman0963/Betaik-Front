"use client"
import AuthPageImg from '@/components/AuthPageImg'
import { useForm } from 'react-hook-form'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'

const ResetPas = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

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
                <div className="w-full flex flex-col items-start px-8 pt-10 lg:px-16 lg:pt-12">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1 mt-10 text-[#4B5563] hover:text-[#111827] text-xl transition-colors"
                    >
                        <ChevronLeft size={22} strokeWidth={2.5} className="mt-0.5" /> Back
                    </button>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex flex-col justify-center w-full max-w-[480px] mx-auto px-8 lg:px-0 mt-[-40px]">
                    <div className="flex flex-col gap-2.5 mb-8">
                        <h1 className='text-3xl lg:text-[34px] font-bold text-[#1A1A1A] leading-tight'>
                            Reset Your Password
                        </h1>
                        <p className='text-[15px] text-[#6B7280] font-medium'>
                            Enter your email to receive reset instructions.
                        </p>
                    </div>
                    <form className='flex flex-col w-full gap-5' onSubmit={handleSubmit(data => console.log(data))}>
                        <div className="flex flex-col gap-2 items-start">
                            <label htmlFor="email" className="font-bold text-[#374151] text-[14px]">
                                Email Address
                            </label>
                            <input
                                className='border border-[#D1D5DB] rounded-lg p-3 w-full focus:outline-none focus:border-[#155DFC] focus:ring-1 focus:ring-[#155DFC] transition-colors placeholder:text-[#9CA3AF] text-[15px]'
                                type="email"
                                placeholder='Enter your registered email'
                                id="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <p className='text-red-500 text-sm font-medium'>Email is required</p>}
                        </div>
                        <button
                            className='bg-[#155DFC] hover:bg-[#104ec8] transition-colors text-white font-semibold rounded-lg p-3.5 w-full mt-2'
                            type='submit'
                        >
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 h-full">
                <AuthPageImg />
            </div>
        </section>
    )
}

export default ResetPas
