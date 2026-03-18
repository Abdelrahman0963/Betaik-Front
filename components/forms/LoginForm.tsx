"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// الاستيرادات الخاصة بـ React Query
import { useMutation } from '@tanstack/react-query';
import { logIn, tempPassword } from '@/services/AuthApi';
import { useAuthStore } from '@/store';
import { Spinner } from '../ui/spinner';

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const router = useRouter();
    const setAuth = useAuthStore((s) => s.setAuth);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // استخدام useMutation للتعامل مع الـ Login
    // هذا يوفر لك Memoization داخلي لحالة الـ loading والـ error والبيانات
    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginFormData) => {
            // تنفيذ الطلبين بالتوازي لتحسين الأداء
            const [loginRes, tempRes] = await Promise.all([
                logIn(credentials),
                tempPassword(credentials)
            ]);

            return {
                authData: loginRes.data,
                isTemp: tempRes.status === 200
            };
        },
        onSuccess: (data) => {
            const { token, refreshToken, role } = data.authData;
            setAuth({
                user: { role },
                token,
                refreshToken,
                isTempPassword: data.isTemp
            });
            if (data.isTemp) {
                router.replace("/login/newpassword");
            } else {
                router.replace("/");
            }
        },
        onError: (error: any) => {
            console.error("Login failed:", error);
        }
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className='flex h-full  flex-col items-start    justify-center gap-8 w-full max-w-md mx-auto'>
            <div className="absolute top-4 left-4">
                <Image
                    src="/icons/beitak main logo blue-01 png 1.svg"
                    alt="logo"
                    width={120}
                    height={33}
                    priority
                />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Login</h1>
                <p className="text-sm text-muted-foreground font-light">
                    Enter your credentials to access the panel
                </p>
            </div>

            <form className='flex flex-col gap-5 w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                        {...register("email")}
                        placeholder="Enter your email"
                        type="email"
                        className={`placeholder:text-gray-400 focus:placeholder:text-gray-200 border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                        <input
                            {...register("password")}
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            className={`placeholder:text-gray-400 focus:placeholder:text-gray-200 border rounded-lg py-3 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* عرض رسالة الخطأ من Mutation مباشرة */}
                {loginMutation.isError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                        {(loginMutation.error as any)?.response?.data?.msg || "Login failed"}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full cursor-pointer bg-blue-700 text-white py-3 rounded-lg disabled:opacity-70 flex items-center justify-center gap-2"
                >
                    {loginMutation.isPending ? <Spinner /> : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;