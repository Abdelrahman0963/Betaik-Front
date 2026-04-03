"use client";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { z } from "zod";
import { formSchema } from "./schema";

type FormValues = z.infer<typeof formSchema>;

interface SelectFieldProps {
    label: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    error?: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string; // ✅ اضفت الخاصية
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, register, error, options, value, onChange, placeholder }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col w-full relative">
            <label className="mb-2 text-sm font-medium">{label}</label>

            <div
                onClick={() => setOpen(!open)}
                className={`relative w-full cursor-pointer border rounded-lg h-12 flex items-center px-3 pr-10 
    ${error ? "" : value ? "border-gray-300 bg-blue-50" : "border-gray-300 bg-[#FAFCFF]"}`}>
                <div className={`flex-1 ${value ? "text-black" : "text-gray-500"}`}>{value || placeholder || label}</div>

                <MdOutlineKeyboardArrowDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl transition-transform ${open ? "rotate-180" : ""}`} />
            </div>

            {open && (
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 max-h-60 overflow-auto">
                    {options.map((item) => (
                        <div
                            key={item}
                            onClick={() => {
                                onChange(item);
                                setOpen(false);
                            }}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            {item}
                        </div>
                    ))}
                </div>
            )}

            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
};

export default SelectField;
