"use client";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { administrators } from '@/services/AuthApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const AdminForm = ({ close }: { close: () => void }) => {
    const queryClient = useQueryClient();
    const [show, setShow] = useState({
        password: false,
    });
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    });
    const administratorRegister = useMutation({
        mutationFn: (data: FormValues) => administrators({
            fullName: data.fullName,
            email: data.email,
            password: data.password
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["administrators"] });
            close();
            toast.success("Administrator added successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error.message || "Failed to add administrator");
        }
    });

    const onSubmit = (data: FormValues) => {
        administratorRegister.mutate(data);
    };

    return (
        <div className='flex w-170 flex-col gap-4 bg-white rounded-2xl '>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h1 className="text-lg font-semibold tracking-tight ">
                    Add Sub Admin
                </h1>
                <button onClick={close} className="cursor-pointer flex  bg-gray-200 hover:bg-gray-100 items-center gap-2 p-3 rounded-lg  text-sm font-medium">
                    <Image src="/icons/closeX.svg" width={9} height={9} alt="close" loading='lazy' />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 px-6 py-4'>
                <div className="flex flex-col gap-4 px-14 py-4">
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder='Enter your full name'
                            {...register("fullName")}
                            className={`border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : 'border-blue-500'}`}
                        />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Enter your email'
                            {...register("email")}
                            className={`border rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-blue-500'}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                {...register("password")}
                                type={show.password ? "text" : "password"}
                                placeholder="Enter current password"
                                className={`border rounded-lg py-3 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 ${errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShow((prev) => ({
                                        ...prev,
                                        password: !prev.password,
                                    }))
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {show.password ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={close}
                        type="button"
                        disabled={administratorRegister.isPending}
                        className='ml-2 border cursor-pointer border-gray-300 hover:bg-gray-100 disabled:opacity-50 transition py-2 px-4 rounded-md'
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={administratorRegister.isPending}
                        className='ml-2 cursor-pointer hover:bg-blue-800 bg-blue-700 disabled:opacity-70 flex items-center gap-2 transition py-2 px-4 rounded-md text-white'
                    >
                        {administratorRegister.isPending ? "Inviting..." : "Invite"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminForm
