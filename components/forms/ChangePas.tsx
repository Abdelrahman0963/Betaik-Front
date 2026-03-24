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
import { Spinner } from '../ui/spinner'

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
            // Store new token data if provided by the endpoint securely
            if (response?.data?.token) {
                setAuth({
                    user: { role: response.data.role },
                    token: response.data.token,
                    refreshToken: response.data.refreshToken,
                    isTempPassword: false
                });
            } else {
                // If it doesn't return tokens but succeeds, just clear temp flag manually 
                // However, since it's already using useAuthStore, the backend likely returns them.
                useAuthStore.setState({ isTempPassword: false });
            }

            // High performance navigation replacement to home after securing new password
            router.replace("/");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error?.response?.data?.msg || "حدث خطأ ما");
        }
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    }

    return (
        <div className="flex h-full  flex-col items-start    justify-center gap-8 w-full max-w-md mx-auto">

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Login</h1>
                <p className="text-sm text-muted-foreground font-light">
                    Access your  management panel
                </p>
            </div>

            <form className='flex flex-col gap-5 w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                    <div className="relative">
                        <input
                            id="newPassword"
                            {...register("newPassword")}
                            placeholder="Enter your new password"
                            type={showNew ? "text" : "password"}
                            aria-invalid={!!errors.newPassword}
                            className={`placeholder:text-gray-400 focus:placeholder:text-gray-200 border rounded-lg py-3 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.newPassword ? "border-red-500" : "border-gray-300"}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            aria-label={showNew ? "Hide password" : "Show password"}
                        >
                            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.newPassword && <span role="alert" className="text-red-500 text-xs">{errors.newPassword.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            {...register("confirmPassword")}
                            placeholder="Confirm your password"
                            type={showConfirm ? "text" : "password"}
                            aria-invalid={!!errors.confirmPassword}
                            className={`placeholder:text-gray-400 focus:placeholder:text-gray-200 border rounded-lg py-3 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            aria-label={showConfirm ? "Hide password" : "Show password"}
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span role="alert" className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full cursor-pointer bg-blue-700 hover:bg-blue-800 transition-colors text-white py-3 rounded-lg disabled:opacity-70 flex items-center justify-center gap-2"
                    aria-live="polite"
                >
                    {mutation.isPending ? <Spinner /> : "Change Password"}
                </button>
            </form>
        </div>
    )
}

export default ChangePas