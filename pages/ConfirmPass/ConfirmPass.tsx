"use client"
import AuthPageImg from '@/components/AuthPageImg'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

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
                    <form className='flex flex-col w-full gap-5' onSubmit={handleSubmit(data => console.log(data))}>
                        <div className="flex flex-col gap-2 items-start relative">
                            <label htmlFor="password" className="font-bold text-[#374151] text-[14px]">
                                Enter New Password
                            </label>
                            <div className="relative w-full">
                                <input
                                    className='border border-[#D1D5DB] rounded-lg p-3 w-full focus:outline-none focus:border-[#155DFC] focus:ring-1 focus:ring-[#155DFC] transition-colors placeholder:text-[#9CA3AF] text-[15px] pr-10'
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter your email'
                                    id="password"
                                    {...register("password", { required: true })}
                                />
                                <button 
                                    type="button" 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className='text-red-500 text-sm font-medium'>Password is required</p>}
                        </div>

                        <div className="flex flex-col gap-2 items-start relative">
                            <label htmlFor="confirmPassword" className="font-bold text-[#374151] text-[14px]">
                                Confirm Password
                            </label>
                            <div className="relative w-full">
                                <input
                                    className='border border-[#D1D5DB] rounded-lg p-3 w-full focus:outline-none focus:border-[#155DFC] focus:ring-1 focus:ring-[#155DFC] transition-colors placeholder:text-[#9CA3AF] text-[15px] pr-10'
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Enter your password'
                                    id="confirmPassword"
                                    {...register("confirmPassword", { required: true })}
                                />
                                <button 
                                    type="button" 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className='text-red-500 text-sm font-medium'>Confirm Password is required</p>}
                        </div>

                        <div className="flex justify-start w-full">
                            <Link href="/login/resetpassword" className="text-[#155DFC] text-sm font-semibold hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            className='bg-[#155DFC] hover:bg-[#104ec8] transition-colors text-white font-semibold rounded-lg p-3.5 w-full mt-2'
                            type='submit'
                        >
                            Login
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

export default ConfirmPass