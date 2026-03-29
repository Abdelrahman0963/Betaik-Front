"use client"
import Image from 'next/image'
import React from 'react'
import { RiArrowLeftWideLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const ReastPassword = () => {
    const router = useRouter()
    const loginSchema = z.object({
        email: z.string().email("Invalid email address").min(1, "Email is required"),
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const {
        register,
        handleSubmit,
        setError,
        setFocus,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        console.log(data);
    };
    return (
        <div className="flex h-full flex-col px-4 md:px-6 items-start justify-center gap-8 w-full max-w-md mx-auto">
            <div className="absolute top-4 left-4">
                <Image
                    src="/icons/Beitak.svg"
                    alt="logo"
                    width={120}
                    height={33}
                    priority
                />
            </div>
            <div onClick={() => router.back()} className="absolute top-28 left-10 flex items-center gap-1 cursor-pointer">
                <RiArrowLeftWideLine className="text-[#191B1F] text-[20px] " />
                <div className="text-[24px] font-normal text-[#191B1F] ">Back</div>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Reset Your Password
                </h1>
                <p className="text-sm text-muted-foreground font-light">
                    Enter your email to receive reset instructions.
                </p>
            </div>

            <form
                className="flex flex-col gap-5 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                    </label>
                    <input
                        id="email"
                        {...register("email")}
                        placeholder="Enter your registered email"
                        type="email"
                        className={`border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                    />

                    {errors.email && (
                        <span className="text-red-500 text-xs">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    // disabled={loginMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {/* {loginMutation.isPending ? (
                        <>
                            <Spinner size={20} />
                        </>
                    ) : (
                        "Send Reset Link"
                    )} */}
                    Send Reset Link
                </button>
            </form>
        </div>
    )
}

export default ReastPassword