"use client";
import React from 'react';
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { administrators } from '@/services/AuthApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const AdminForm = ({ close }: { close: () => void }) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    });
    const administratorRegister = useMutation({
        mutationFn: (data: FormValues) => administrators({
            fullName: data.name,
            email: data.email,
            password: data.password
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["administrators"] });
            close();
            toast.success("Administrator added successfully");
        },
        onError: (error: any) => {
            // Check if error has a message or response data
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
                            {...register("name")}
                            className={`border rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-blue-500'}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
                        <input
                            type="password"
                            id="password"
                            placeholder='Enter your password'
                            {...register("password")}
                            className={`border rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-blue-500'}`}
                        />
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
