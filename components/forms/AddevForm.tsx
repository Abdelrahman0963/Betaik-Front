import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { createDevelopers } from "@/services/AuthApi"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import SuccessModal from '../popupCards/SuccessModal'

// 1. تعريف الـ Schema مع شروط كلمة المرور المطلوبة
const developerSchema = z.object({
    fullName: z.string().min(3, "Company name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    tempPass: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
    duration: z.string().min(1, "Contract Duration is required"),
    orderNumber: z.number({ message: "Order number is required" }).min(0),
    compoundLimits: z.number().min(0, "Limit cannot be negative"),
    propertiesLimits: z.number().min(0),
    offersLimits: z.number().min(0),
    subAccountLimits: z.number().min(0),
    launchesLimits: z.number().min(0),
    paymentPlanLimits: z.number().min(0),
})

type FormValues = z.infer<typeof developerSchema>;

const AddevForm = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(developerSchema),
        defaultValues: {
            compoundLimits: 0,
            propertiesLimits: 0,
            offersLimits: 0,
            subAccountLimits: 0,
            launchesLimits: 0,
            paymentPlanLimits: 0
        }
    })

    const createUni = useMutation({
        mutationFn: (data: FormValues) => createDevelopers(data as any),
        onSuccess: () => {
            reset()
            setShowSuccess(true);
        },
        onError: (error) => {
            toast.error(`Failed ${error.message}`)
        }
    })

    const onSubmit = async (data: FormValues) => {
        await createUni.mutateAsync(data);
    }

    return (
        <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-4 w-full">
            <p className="text-lg font-semibold">Company Information</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="name">Company Name</label>
                        <input type="text" id="name" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" placeholder="Enter Company Name" {...register("fullName")} />
                        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email">Company Email</label>
                        <input type="email" id="email" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" placeholder="contact@company.com" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="TempPassword">Assign Temporary Password</label>
                    <input type="text" id="TempPassword" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" placeholder="Enter Temporary Password" {...register("tempPass")} />
                    {errors.tempPass && <p className="text-red-500 text-xs">{errors.tempPass.message}</p>}
                </div>

                <div className="flex flex-col gap-4 w-full pt-4">
                    <div className="w-full h-px bg-gray-300 "></div>
                    <h3 className="text-lg font-semibold">Contract Settings</h3>
                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="contractDuration">Contract Duration</label>
                            <Controller
                                name="duration"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full bg-blue-100/10 hover:bg-blue-100/20 items-center flex gap-2.5 border border-blue-200 rounded-[10px]">
                                            <SelectValue placeholder="Select Contract Duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select Contract Duration</SelectLabel>
                                                {["New Cairo", "6th of October", "Emaar", "Mansoura", "Giza", "Cairo", "Alexandria"].map((item) => (
                                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.duration && <p className="text-red-500 text-xs">{errors.duration.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="orderNumber">Order Number</label>
                            <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} id="orderNumber" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" placeholder="Enter Order Number" {...register("orderNumber", { valueAsNumber: true })} />
                            {errors.orderNumber && <p className="text-red-500 text-xs">{errors.orderNumber.message}</p>}
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="compoundLimits">Compounds Limit</label>
                            <input type="number" {...register("compoundLimits", { valueAsNumber: true })} className="border border-blue-200 rounded-md px-3 py-2 bg-blue-100/10" placeholder="0" />
                            {errors.compoundLimits && <p className="text-red-500 text-xs">{errors.compoundLimits.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="propertiesLimits">Properties Limit</label>
                            <input type="number" {...register("propertiesLimits", { valueAsNumber: true })} className="border border-blue-200 rounded-md px-3 py-2 bg-blue-100/10" placeholder="0" />
                            {errors.propertiesLimits && <p className="text-red-500 text-xs">{errors.propertiesLimits.message}</p>}
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label>Offers Limit</label>
                            <input type="number" {...register("offersLimits", { valueAsNumber: true })} className="border border-blue-200 rounded-md px-3 py-2 bg-blue-100/10" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Sub-Accounts Limit</label>
                            <input type="number" {...register("subAccountLimits", { valueAsNumber: true })} className="border border-blue-200 rounded-md px-3 py-2 bg-blue-100/10" />
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label>New Launches Limit</label>
                            <input type="number" {...register("launchesLimits", { valueAsNumber: true })} className="border border-blue-200 rounded-md px-3 py-2 bg-blue-100/10" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Payment Plan Limit</label>
                            <input type="number" {...register("paymentPlanLimits", { valueAsNumber: true })} className="border border-blue-200 rounded-md px-3 py-2 bg-blue-100/10" />
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-gray-300"></div>
                <div className="flex items-start justify-end gap-4 rounded-2xl border border-gray-300 p-5">
                    <button disabled={createUni.isPending} onClick={() => reset()} type="button" className="ml-4 bg-white cursor-pointer text-gray-800 border border-gray-500 px-4 py-2 rounded-md">Cancel</button>
                    <button disabled={createUni.isPending} type="submit" className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md">Create Account</button>
                </div>
            </form>
            {showSuccess &&
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-50'>
                    <SuccessModal setShowSuccess={setShowSuccess} message="Developer account created successfully" description="The developer account has been successfully created." />
                </div>
            }
        </div>
    )
}

export default AddevForm