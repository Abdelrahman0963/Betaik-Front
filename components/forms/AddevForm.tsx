import React from 'react'
import { useForm, Controller } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { createDevelopers } from "@/services/AuthApi"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

type FormValues = {
    fullName: string;
    email: string;
    tempPass: string;
    duration: string;
    orderNumber: number;
    compoundLimits: number;
    propertiesLimits: number;
    offersLimits: number;
    subAccountLimits: number;
    launchesLimits: number;
    paymentPlanLimits: number;
}
const AddevForm = () => {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormValues>()
    const createUni = useMutation({
        mutationFn: (data: FormValues) => createDevelopers(data as any),
        onSuccess: () => {
            reset()
            console.log("Developer created successfully")
            toast.success("Developer created successfully")
        },
        onError: (error) => {
            console.log(error)
            toast.error("Failed to create university")
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
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="name">Company Email</label>
                        <input type="email" id="name" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" placeholder="contact@company.com" {...register("email")} />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="TempPassword">Assign Temporary Password</label>
                    <input type="text" id="TempPassword" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" placeholder="Enter Temporary Password" {...register("tempPass")} />
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
                                        <SelectTrigger className="w-full bg-blue-100/10  hover:bg-blue-100/20  items-center flex gap-2.5  border border-blue-200 rounded-[10px]">
                                            <SelectValue placeholder="Select Contract Duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select Contract Duration</SelectLabel>

                                                {[
                                                    "New Cairo",
                                                    "6th of October",
                                                    "Emaar",
                                                    "Mansoura",
                                                    "Giza",
                                                    "Cairo",
                                                    "Alexandria",
                                                ].map((item) => (
                                                    <SelectItem key={item} value={item}>
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="orderNumber">Order Number</label>
                            <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} id="orderNumber" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter Order Number" {...register("orderNumber", { valueAsNumber: true })} />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="studentHousing">Compounds Limit</label>
                            <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} id="studentHousing" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter Compounds Limit" {...register("compoundLimits", { valueAsNumber: true })} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="dormLimit">Properties Limit</label>
                            <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} id="dormLimit" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter Properties Limit" {...register("propertiesLimits", { valueAsNumber: true })} />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="paymentPlanLimit">Offers Limit</label>
                            <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} id="paymentPlanLimit" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter Offers Limit" {...register("offersLimits", { valueAsNumber: true })} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="subAccountsLimit">Sub-Accounts Limit</label>
                            <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} id="subAccountsLimit" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter Sub-Accounts Limit" {...register("subAccountLimits", { valueAsNumber: true })} />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="newLaunchesLimit">new launches limit</label>
                            <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} id="newLaunchesLimit" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter new launches Limit" {...register("launchesLimits", { valueAsNumber: true })} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="paymentPlanLimit">payment plan limit</label>
                            <input type="number" min="0" onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} id="paymentPlanLimit" className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Enter payment plan Limit" {...register("paymentPlanLimits", { valueAsNumber: true })} />
                        </div>
                    </div>
                </div>
                <div className="h-px w-full bg-gray-300"></div>
                <div className="flex items-start justify-end gap-4 rounded-2xl border border-gray-300 p-5">
                    <button disabled={createUni.isPending} onClick={() => reset()} type="button" className="ml-4 bg-white cursor-pointer text-gray-800 border border-gray-500 px-4 py-2 rounded-md">Cancel</button>
                    <button disabled={createUni.isPending} type="submit" className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md">Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default AddevForm