"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { changeYourPassword } from "@/services/AuthApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";

// ✅ Schema (مع confirm validation)
const schema = z
    .object({
        currentPassword: z
            .string()
            .min(6, "Current password must be at least 6 characters"),
        newPassword: z
            .string()
            .min(6, "New password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Confirm password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type FormData = z.infer<typeof schema>;

const ChangePassword = () => {
    // ✅ show لكل input لوحده
    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const {
        register,
        handleSubmit,
        setError,
        setFocus,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: async (data: FormData) =>
            await changeYourPassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            }),

        onSuccess: () => {
            toast.success("Password changed successfully ✅");
            reset();
        },

        onError: (error: any) => {
            const msg = error?.response?.data?.msg;
            if (msg?.toLowerCase().includes("current")) {
                setError("currentPassword", { type: "server", message: msg });
                setFocus("currentPassword");
            } else if (msg?.toLowerCase().includes("match")) {
                setError("confirmPassword", { type: "server", message: msg });
                setFocus("confirmPassword");
            } else {
                toast.error(msg || "Something went wrong");
            }
        },
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        mutation.mutate(data);
    };

    return (
        <div className="flex flex-col gap-4 pt-8 w-full ">
            <h3 className="text-lg font-semibold">Change Password</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium ml-1">
                        Current Password
                    </label>

                    <div className="relative">
                        <input
                            {...register("currentPassword")}
                            type={show.current ? "text" : "password"}
                            placeholder="Enter current password"
                            className={`border rounded-lg py-3 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 ${errors.currentPassword
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShow((prev) => ({
                                    ...prev,
                                    current: !prev.current,
                                }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {show.current ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {errors.currentPassword && (
                        <span className="text-red-500 text-xs">
                            {errors.currentPassword.message}
                        </span>
                    )}
                </div>

                {/* NEW PASSWORD */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium ml-1">
                        New Password
                    </label>

                    <div className="relative">
                        <input
                            {...register("newPassword")}
                            type={show.new ? "text" : "password"}
                            placeholder="Enter new password"
                            className={`border rounded-lg py-3 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 ${errors.newPassword ? "border-red-500" : "border-gray-300"
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShow((prev) => ({
                                    ...prev,
                                    new: !prev.new,
                                }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {show.new ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {errors.newPassword && (
                        <span className="text-red-500 text-xs">
                            {errors.newPassword.message}
                        </span>
                    )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium ml-1">
                        Confirm Password
                    </label>

                    <div className="relative">
                        <input
                            {...register("confirmPassword")}
                            type={show.confirm ? "text" : "password"}
                            placeholder="Confirm new password"
                            className={`border rounded-lg py-3 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShow((prev) => ({
                                    ...prev,
                                    confirm: !prev.confirm,
                                }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {show.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {errors.confirmPassword && (
                        <span className="text-red-500 text-xs">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 justify-end">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="border border-gray-300 hover:bg-gray-100 transition text-sm py-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="bg-blue-700 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-md disabled:opacity-50"
                    >
                        {mutation.isPending ? <Spinner /> : "Update Password"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;