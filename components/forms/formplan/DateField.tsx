"use client";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { CiCalendar } from "react-icons/ci";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface DateFieldProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    value: Dayjs | null;
    onChange: (date: Dayjs | null) => void;
}

const DateField: React.FC<DateFieldProps> = ({ label, name, register, error, value, onChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col relative">
            <label className="mb-2 text-sm font-medium">{label}</label>

            <input
                readOnly
                value={value ? dayjs(value).format("MM/DD/YYYY") : ""}
                placeholder="MM/DD/YYYY"
                onClick={() => setOpen(!open)}
                {...register(name, { required: "This field is required" })}
                className={`w-full border h-[48px] rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${value ? "bg-blue-50 border-gray-300" : "bg-[#FAFCFF] border-gray-300"}`}
            />

            <CiCalendar onClick={() => setOpen(!open)} className="absolute right-3 top-[40px] text-gray-500 text-xl cursor-pointer" />

            {open && (
                <Box className="absolute z-50 transform translate-y-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            value={value}
                            onChange={(newValue) => {
                                onChange(newValue);
                                setOpen(false);
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            )}

            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
};

export default DateField;
