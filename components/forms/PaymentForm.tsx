"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Box } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ================== Schema ==================
const paymentSchema = z.object({
    name: z
        .string()
        .min(1, "Required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    price: z
        .number({})
        .min(1, "Required"),

    frequency: z.string().min(1, "Required"),

    installment: z
        .number({})
        .min(1, "Required"),

    academicTerm: z.string().min(1, "Required"),

    validFrom: z.string().min(1, "Required"),

    expired: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof paymentSchema>;

function PaymentForm() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const options = ["Year", "Semester"];

    const [showCalendarValidFrom, setShowCalendarValidFrom] = useState(false);
    const [showCalendarExpired, setShowCalendarExpired] = useState(false);

    // ================== RHF ==================
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(paymentSchema),
    });

    // ================== UX ==================
    useEffect(() => {
        if (showCalendarValidFrom || showCalendarExpired) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showCalendarValidFrom, showCalendarExpired]);

    useEffect(() => {
        const handleClickOutside = () => setOpen(false);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // ================== Submit ==================
    const onSubmit = (data: FormValues) => {
        const payload = {
            ...data,
            price: Number(data.price),
            installment: Number(data.installment),
        };

        console.log("🔥 Payload:", payload);
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mx-6">
            <h1 className="text-[32px]">Payment Plans</h1>
            <div className="mt-7 p-6 border rounded-lg flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label>Plan Name</label>
                        <input {...register("name")} className="input" />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            {...register("price", { valueAsNumber: true })}
                            className="input"
                        />
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                    </div>
                </div>

                {/* ================== Frequency + Installment ================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                        <label>Frequency</label>

                        <Controller
                            name="frequency"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        readOnly
                                        value={field.value || ""}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpen(!open);
                                        }}
                                        className="input cursor-pointer"
                                    />

                                    {open && (
                                        <div className="absolute bg-white border w-full z-10">
                                            {options.map((item) => (
                                                <div
                                                    key={item}
                                                    onClick={() => {
                                                        field.onChange(item);
                                                        setOpen(false);
                                                    }}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        />
                        {errors.frequency && <p className="text-red-500">{errors.frequency.message}</p>}
                    </div>

                    <div>
                        <label>Installments</label>
                        <input
                            type="number"
                            {...register("installment", { valueAsNumber: true })}
                            className="input"
                        />
                        {errors.installment && (
                            <p className="text-red-500">{errors.installment.message}</p>
                        )}
                    </div>
                </div>

                {/* ================== Academic Term ================== */}
                <div>
                    <label>Academic Term</label>
                    <input {...register("academicTerm")} className="input" />
                    {errors.academicTerm && (
                        <p className="text-red-500">{errors.academicTerm.message}</p>
                    )}
                </div>

                {/* ================== Dates ================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Valid From */}
                    <div>
                        <label>Valid From</label>

                        <Controller
                            name="validFrom"
                            control={control}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        readOnly
                                        value={field.value || ""}
                                        onClick={() => setShowCalendarValidFrom(true)}
                                        className="input cursor-pointer"
                                    />

                                    {showCalendarValidFrom && (
                                        <Box className="absolute z-50 bg-white">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateCalendar
                                                    onChange={(date) => {
                                                        field.onChange(dayjs(date).format("YYYY-MM-DD"));
                                                        setShowCalendarValidFrom(false);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                    )}
                                </div>
                            )}
                        />
                        {errors.validFrom && (
                            <p className="text-red-500">{errors.validFrom.message}</p>
                        )}
                    </div>

                    {/* Expired */}
                    <div>
                        <label>Expired</label>

                        <Controller
                            name="expired"
                            control={control}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        readOnly
                                        value={field.value || ""}
                                        onClick={() => setShowCalendarExpired(true)}
                                        className="input cursor-pointer"
                                    />

                                    {showCalendarExpired && (
                                        <Box className="absolute z-50 bg-white">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateCalendar
                                                    onChange={(date) => {
                                                        field.onChange(dayjs(date).format("YYYY-MM-DD"));
                                                        setShowCalendarExpired(false);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                    )}
                                </div>
                            )}
                        />
                        {errors.expired && (
                            <p className="text-red-500">{errors.expired.message}</p>
                        )}
                    </div>
                </div>

                {/* ================== Actions ================== */}
                <div className="flex gap-3 justify-end">
                    <button type="button" onClick={handleCancel} className="btn">
                        Cancel
                    </button>

                    <button type="submit" className="btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PaymentForm;