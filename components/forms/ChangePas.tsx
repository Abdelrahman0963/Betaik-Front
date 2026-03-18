"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from "@/services/AuthApi"
import { useAuthStore } from '@/store'
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

const schema = z.object({
    newPassword: z.string().min(8, "كلمة السر الجديدة يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة السر مطلوب"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمات السر غير متطابقة",
    path: ["confirmpassword"],
});

type FormData = z.infer<typeof schema>

const ChangePas = () => {
    const [showNew, setShowNew] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const setAuth = useAuthStore((s) => s.setAuth);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onBlur",
    })

    const mutation = useMutation({
        mutationFn: (data: FormData) =>
            changePassword({
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            }),
        onSuccess: (response) => {
            toast.success("تم تغيير كلمة السر بنجاح");
            reset();

            // لو السيستم بيرجع توكن جديد
            setAuth({
                user: { role: response.data.role },
                token: response.data.token,
                refreshToken: response.data.refreshToken,
            });

            router.push("/login");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ ما");
        }
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    }

    return (
        <div className="max-w-md mx-auto p-4 w-full">
            <h1 className='text-xl font-bold'>Set New Password</h1>

            <form className='flex flex-col gap-6 mt-4 w-full' onSubmit={handleSubmit(onSubmit)}>

                {/* New Password */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">New Password</label>
                    <div className="relative">
                        <input
                            {...register("newPassword")}
                            type={showNew ? "text" : "password"}
                            placeholder='••••••••'
                            className={`border rounded-lg py-3 px-4 w-full ${errors.newPassword ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <span className="text-red-500 text-xs">
                            {errors.newPassword.message}
                        </span>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <div className="relative">
                        <input
                            {...register("confirmPassword")}
                            type={showConfirm ? "text" : "password"}
                            placeholder='••••••••'
                            className={`border rounded-lg py-3 px-4 w-full ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-xs">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-2">
                    <button
                        type="button"
                        disabled={mutation.isPending}
                        className='border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-md disabled:opacity-50'
                        onClick={() => reset()}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2'
                    >
                        {mutation.isPending && <Loader2 size={16} className="animate-spin" />}
                        {mutation.isPending ? "Saving..." : "Change Password"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChangePas