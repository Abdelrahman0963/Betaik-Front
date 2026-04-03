"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePaymentStore } from "@/store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import dayjs from "dayjs";

import InputField from "@/components/forms/formplan/InputField";
import SelectField from "@/components/forms/formplan/selectField";
import DateField from "@/components/forms/formplan/DateField";

import { formSchema } from "@/components/forms/formplan/schema";

type FormValues = z.infer<typeof formSchema>;

const options = ["Year", "Semester"];

export default function PaymentForm() {
    const router = useRouter();
    const addPlan = usePaymentStore((state) => state.addPlan);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            planName: "",
            price: "",
            frequency: "",
            installments: "",
            validFrom: null,
            term: null,
        },
    });

    const handleCancel = () => {
        reset();
    };

    const savePlan = (data: FormValues, status: "draft" | "active") => {
        addPlan({
            ...data,
            validFrom: data.validFrom ? dayjs(data.validFrom).format("MM/DD/YYYY") : "",
            term: data.term ? dayjs(data.term).format("MM/DD/YYYY") : "",
            status,
        });

        router.push("/payment");
    };

    return (
        <div className="container mx-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                    <div className="text-[24px] font-normal text-[#191B1F]">Back</div>
                </div>
                <div className="text-[32px] font-medium">Payment Plans</div>
                <div className="text-[16px] text-[#414A5B]">Manage all payment plans and special offers for your dorms.</div>
            </div>

            <form className="mt-7 px-5 py-8 flex flex-col gap-3 w-full border border-gray-200 rounded-[10px]">
                <div className="text-[24px] font-medium">Pricing & Payment</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <InputField label="Plan Name" name="planName" register={register} error={errors.planName?.message} placeholder="Enter plan name" />
                    <InputField label="Price" name="price" register={register} error={errors.price?.message} placeholder="Enter price" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <SelectField
                        label="Payment Frequency"
                        name="frequency"
                        options={options}
                        register={register}
                        error={errors.frequency?.message}
                        value={watch("frequency")}
                        onChange={(val) => setValue("frequency", val, { shouldValidate: true })}
                    />
                    <InputField label="Installments" name="installments" register={register} error={errors.installments?.message} placeholder="Number of installments" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <DateField
                        label="Valid From"
                        name="validFrom"
                        register={register}
                        error={errors.validFrom?.message as string}
                        value={watch("validFrom")}
                        onChange={(val) => setValue("validFrom", val, { shouldValidate: true })}
                    />
                    <DateField
                        label="Academic Term"
                        name="term"
                        register={register}
                        error={errors.term?.message as string}
                        value={watch("term")}
                        onChange={(val) => setValue("term", val, { shouldValidate: true })}
                    />
                </div>

                <div className="mt-5 border border-gray-200"></div>

                <div className="mt-5 flex flex-col sm:flex-row gap-4 items-center justify-end pr-4">
                    <button type="button" onClick={handleCancel} className="px-4 py-2 bg-white border cursor-pointer border-gray-200 rounded-[12px] hover:bg-gray-200">
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit((data) => savePlan(data, "draft"))}
                        className="cursor-pointer px-4 py-2 border border-gray-200 text-[#414651] rounded-[12px] hover:bg-gray-200">
                        Save Draft
                    </button>

                    <button type="button" onClick={handleSubmit((data) => savePlan(data, "active"))} className="cursor-pointer px-4 py-2 bg-[#155DFC] text-white rounded-lg hover:bg-[#0F4BD8]">
                        Publish Dorm
                    </button>
                </div>
            </form>
        </div>
    );
}
