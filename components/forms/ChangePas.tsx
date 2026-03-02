import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
const schema = z.object({
    currentpassword: z.string().min(1, "Current password is required"),
    newpassword: z.string().min(1, "New password is required"),
    confirmpassword: z.string().min(1, "Confirm password is required"),
})

type FormData = z.infer<typeof schema>

const ChangePas = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onBlur",
    })
    return (
        <div className='mt-6 border-t pt-4 '>
            <h1 className='text-xl '>Change Password</h1>
            <form className='flex flex-col gap-6 mt-4' onSubmit={handleSubmit((data) => console.log(data))}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="currentpassword" className='text-sm'>Current Password</label>
                    <input type="password" id="currentpassword" {...register("currentpassword")} className='border rounded-md px-3 py-2' />
                    {errors.currentpassword && <p className='text-red-500 text-sm'>{errors.currentpassword.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="newpassword" className='text-sm '>New Password</label>
                    <input type="password" id="newpassword" {...register("newpassword")} className='border rounded-md px-3 py-2' />
                    {errors.newpassword && <p className='text-red-500 text-sm'>{errors.newpassword.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="confirmpassword" className='text-sm '>Confirm New Password</label>
                    <input type="password" id="confirmpassword" {...register("confirmpassword")} className='border rounded-md px-3 py-2' />
                    {errors.confirmpassword && <p className='text-red-500 text-sm'>{errors.confirmpassword.message}</p>}
                </div>
                <div className="flex items-center justify-end gap-2">
                    <button type="button" className='ml-2 border cursor-pointer border-gray-300 hover:bg-gray-100 transition   py-2 px-4 rounded-md' onClick={() => console.log("Cancel")}>Cancel</button>
                    <button type="submit" className='ml-2 bg-blue-500 cursor-pointer hover:bg-blue-600 transition text-white text-sm py-2 px-4 rounded-md'>Change Password</button>

                </div>
            </form>
        </div>
    )
}

export default ChangePas
