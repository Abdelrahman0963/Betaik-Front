"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { logIn, tempPassword } from "@/services/AuthApi";
import { useAuthStore } from "@/store";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const router = useRouter();
    const setAuth = useAuthStore((s) => s.setAuth);
    const user = useAuthStore((s) => s.user);

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        setFocus,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginFormData) => {
            const loginRes = await logIn(credentials);
            const tempRes = await tempPassword({ email: credentials.email });

            return {
                authData: loginRes.data,
                isTemp:
                    tempRes.data.isTemporary ||
                    tempRes.data.tempIs ||
                    tempRes.data === true,
            };
        },

        onSuccess: (data) => {
            const { token, refreshToken, role } = data.authData;

            setAuth({
                user: { role },
                token,
                refreshToken,
                isTempPassword: data.isTemp,
            });

            toast.success("Login successful");

            if (data.isTemp) {
                router.replace("/newpassword");
            } else {
                router.replace("/");
            }
        },

        onError: (error: any) => {
            const serverMsg = error?.response?.data?.msg;

            // لو السيرفر رجع رسالة
            if (serverMsg) {
                // نحطها تحت الباسورد (الأغلب)
                setError("password", {
                    type: "server",
                    message: serverMsg,
                });

                setFocus("password");
            } else {
                toast.error("Something went wrong");
            }
        },
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="flex h-full flex-col px-4 md:px-6 items-start justify-center gap-8 w-full max-w-md mx-auto">
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
                <h1 className="text-3xl font-bold tracking-tight">
                    <span className="text-blue-700">{user?.role}</span> Dashboard Login
                </h1>
                <p className="text-sm text-muted-foreground font-light">
                    Access your management panel
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
                        placeholder="Enter your email"
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

                {/* PASSWORD */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            id="password"
                            {...register("password")}
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            className={`border rounded-lg py-3 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {errors.password && (
                        <span className="text-red-500 text-xs">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg disabled:opacity-70 flex items-center justify-center"
                >
                    {loginMutation.isPending ? <Spinner /> : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;