"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ChangePas from "./ChangePas"

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    callphone: z.string().min(1, "Call phone is required"),
    whatsapp: z.string().min(1, "WhatsApp is required"),
})

type FormValues = z.infer<typeof schema>

const AccountInfoForm = () => {

    const [mode, setMode] = useState<"separate" | "both">("separate")

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur",
    })

    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data)
    }
    const onClose = () => {
        console.log("Form closed")
    }

    const handleBothChange = (value: string) => {
        setValue("callphone", value)
        setValue("whatsapp", value)
    }

    return (
        <div className="flex flex-col gap-4 py-4 px-5 md:gap-6 md:py-6 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold">Account Information</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                {/* First & Last Name */}
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="firstName" className="text-sm font-medium ml-1">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            {...register("firstName")}
                            placeholder="first name"
                            className="border border-blue-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="lastName" className="text-sm ml-1 font-medium">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            placeholder="last name"
                            {...register("lastName")}
                            className="border border-blue-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium ml-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="email"
                        {...register("email")}
                        className="border border-blue-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Call Phone & WhatsApp */}
                <div className="flex flex-col items-start w-full gap-10 mt-5 ">
                    <h3>Contact Information</h3>
                    {/* Buttons */}
                    <div className="flex items-start gap-3">
                        <button
                            type="button"
                            onClick={() => setMode("separate")}
                            className={`cursor-pointer text-sm px-4 py-2 rounded-md transition ${mode === "separate"
                                ? "bg-blue-100 text-blue-600 border border-blue-500"
                                : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            Call & WhatsApp
                        </button>

                        <button
                            type="button"
                            onClick={() => setMode("both")}
                            className={`cursor-pointer text-sm px-4 py-2 rounded-md transition ${mode === "both"
                                ? "bg-blue-100 text-blue-600 border border-blue-500"
                                : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            Both
                        </button>
                    </div>

                    {mode === "separate" ? (
                        <div className="flex flex-row items-center w-full gap-4 justify-center">

                            {/* Call Phone */}
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="callphone" className="text-sm font-medium ml-1">
                                    Call Phone
                                </label>
                                <input
                                    id="callphone"
                                    {...register("callphone")}
                                    className="border border-blue-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.callphone && (
                                    <p className="text-red-500 text-sm">
                                        {errors.callphone.message}
                                    </p>
                                )}
                            </div>

                            {/* WhatsApp */}
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="whatsapp" className="text-sm font-medium ml-1">
                                    WhatsApp
                                </label>
                                <input
                                    id="whatsapp"
                                    {...register("whatsapp")}
                                    className="border border-blue-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.whatsapp && (
                                    <p className="text-red-500 text-sm">
                                        {errors.whatsapp.message}
                                    </p>
                                )}
                            </div>

                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm font-medium ml-1">
                                Phone (Call & WhatsApp)
                            </label>
                            <input
                                onChange={(e) => handleBothChange(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-2 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-2 border cursor-pointer border-gray-300 hover:bg-gray-100 transition text-sm py-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-2 bg-blue-500 cursor-pointer hover:bg-blue-600 transition text-white text-sm font-semibold py-2 px-4 rounded-md"
                    >
                        Save Changes
                    </button>

                </div>
            </form>
            <ChangePas />
        </div>
    )
}

export default AccountInfoForm