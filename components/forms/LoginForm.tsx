"use client"
import Link from 'next/link';
import React from 'react'
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type FormValues = {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = (path: string) => { window.location.href = path }
    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data)
        navigate("/")
    }

    return (
        <div className='flex flex-col items-start justify-start gap-8'>
            <div className="flex flex-col items-start gap-3">
                <h1 className="text-3xl font-semibold">Dashboard Login</h1>
                <p className="text-sm text-gray-600 font-light">Access your management panel</p>
            </div>

            <form
                className='flex flex-col gap-4 w-full'
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className="flex flex-col w-90 gap-2">
                    <label htmlFor="email" className="text-sm font-semibold">Email</label>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        {...register("email")}
                        className="border border-blue-500 rounded-md py-3 px-4"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="flex flex-col w-90 gap-2">
                    <label htmlFor="password" className="text-sm font-semibold">Password</label>

                    <div className="relative">
                        <input
                            id="password"
                            placeholder='Enter your password'
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            className="border border-blue-500 rounded-md py-3 px-4 w-full"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                        >
                            {showPassword ? <AiOutlineEyeInvisible className="inline-block text-lg mr-1" /> : <AiOutlineEye className="inline-block text-lg mr-1" />}
                        </button>

                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <Link href="/forgot-password" className="text-sm text-blue-500 font-light">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="cursor-pointer bg-blue-700 hover:bg-blue-500 text-white py-3 px-4 rounded-md"
                >
                    Login
                </button>

            </form>
        </div>
    )
}

export default LoginForm