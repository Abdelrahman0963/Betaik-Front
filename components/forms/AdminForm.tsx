"use client"
import Link from 'next/link';
import React from 'react'
import { useForm } from "react-hook-form";
import Image from 'next/image';
type FormValues = {
    name: string;
    email: string;
    password: string;
}
const AdminForm = ({ close }: { close: () => void }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [isclose, setClose] = React.useState(() => close)
    const onSubmit = (data: any) => {
        console.log("Form Data:", data)
    }
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
                        <label htmlFor="Full Name">Full Name</label>
                        <input
                            type="text"
                            id="Full Name"
                            placeholder='Enter your full name'
                            {...register("name")}
                            className="border border-blue-500 rounded-md py-3 px-4"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Enter your email'
                            {...register("email")}
                            className="border border-blue-500 rounded-md py-3 px-4"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder='Enter your password'
                            {...register("password")}
                            className="border border-blue-500 rounded-md py-3 px-4"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <button onClick={close} type="button" className='ml-2 border cursor-pointer border-gray-300 hover:bg-gray-100 transition   py-2 px-4 rounded-md'>Cancel</button>
                    <button type="submit" className='ml-2  cursor-pointer  hover:bg-blue-500 bg-blue-700 transition   py-2 px-4 rounded-md text-white'>Invite</button>
                </div>
            </form>
        </div>
    )
}

export default AdminForm
