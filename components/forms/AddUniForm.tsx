import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" // تأكد من تثبيت الحزمة
import { z } from "zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { createUniversity } from "@/services/AuthApi"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import SuccessModal from "../popupCards/SuccessModal"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

// 1. تعريف الـ Schema مع شروط كلمة المرور (8 أحرف، كابيتال، سمول، رقم)
const universitySchema = z.object({
    universityName: z.string().min(3, "University name is too short"),
    universityEmail: z.string().email("Invalid email address"),
    temporaryPassword: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
    duration: z.string().min(1, "Contract Duration is required"),
    orderNumber: z.number({ message: "Required" }).min(0),
    studentHousingLimit: z.number().min(0),
    dormLimit: z.number().min(0),
    paymentPlanLimit: z.number().min(0),
    subAccountsLimit: z.number().min(0),
})

type FormValues = z.infer<typeof universitySchema>;

const AddUniForm = () => {
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showContract, setShowContract] = useState<boolean>(false);
    // 2. إعداد useForm مع الـ Resolver
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(universitySchema),
        defaultValues: {
            studentHousingLimit: 0,
            dormLimit: 0,
            paymentPlanLimit: 0,
            subAccountsLimit: 0
        }
    })

    const createUni = useMutation({
        mutationFn: (data: FormValues) => createUniversity(data as any),
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
            <p className="text-lg font-semibold">university Information</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="universityName">University Name</label>
                        <input type="text" id="universityName" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" placeholder="Enter university Name" {...register("universityName")} />
                        {errors.universityName && <p className="text-red-500 text-xs">{errors.universityName.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="universityEmail">university Email</label>
                        <input type="email" id="universityEmail" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" placeholder="contact@company.com" {...register("universityEmail")} />
                        {errors.universityEmail && <p className="text-red-500 text-xs">{errors.universityEmail.message}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="temporaryPassword">Assign Temporary Password</label>
                    <input type="text" id="temporaryPassword" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" placeholder="Enter Temporary Password" {...register("temporaryPassword")} />
                    {errors.temporaryPassword && <p className="text-red-500 text-xs">{errors.temporaryPassword.message}</p>}
                </div>

                <div className="flex flex-col gap-4 w-full pt-4">
                    <div className="w-full h-px bg-gray-300 "></div>
                    <div className="flex flex-col md:flex-row w-full justify-between items-center">
                        <h3 className="text-lg font-semibold">Contract Settings</h3>
                        <RadioGroup onValueChange={(value) => setShowContract(value === "active")}>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="active" id="r1" />
                                <label htmlFor="r1">Active</label>
                            </div>

                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="Inactive" id="r2" />
                                <label htmlFor="r2">Inactive</label>
                            </div>
                        </RadioGroup>
                    </div>
                    {showContract && (

                        <>
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
                                    <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} id="orderNumber" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter Order Number" {...register("orderNumber", { valueAsNumber: true })} />
                                    {errors.orderNumber && <p className="text-red-500 text-xs">{errors.orderNumber.message}</p>}
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="studentHousing">Student Housing Limit </label>
                                    <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} id="studentHousing" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter Student Housing Limit" {...register("studentHousingLimit", { valueAsNumber: true })} />
                                    {errors.studentHousingLimit && <p className="text-red-500 text-xs">{errors.studentHousingLimit.message}</p>}
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="dormLimit">Dorm Limit</label>
                                    <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} id="dormLimit" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter Dorm Limit" {...register("dormLimit", { valueAsNumber: true })} />
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="paymentPlanLimit">payment plan limit</label>
                                    <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} id="paymentPlanLimit" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter payment plan limit" {...register("paymentPlanLimit", { valueAsNumber: true })} />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="subAccountsLimit">Sub-Accounts Limit</label>
                                    <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} id="subAccountsLimit" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter Sub-Accounts Limit" {...register("subAccountsLimit", { valueAsNumber: true })} />
                                </div>
                            </div>
                        </>
                    )

                    }


                </div>

                <div className="h-px w-full bg-gray-300"></div>
                <div className="flex items-start justify-end gap-4 rounded-2xl border border-gray-300 p-5">
                    <button disabled={createUni.isPending} onClick={() => reset()} type="button" className="ml-4 bg-white cursor-pointer text-gray-800 border border-gray-500 px-4 py-2 rounded-md">Cancel</button>
                    <button disabled={createUni.isPending} type="submit" className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md">Create Account</button>
                </div>
            </form >
            {showSuccess &&
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-50'>
                    <SuccessModal setShowSuccess={setShowSuccess} message="University account created successfully" description="The university account has been successfully created and is now active." />
                </div>
            }
        </div >
    )
}

export default AddUniForm