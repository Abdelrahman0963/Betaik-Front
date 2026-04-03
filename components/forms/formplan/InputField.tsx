import { UseFormRegister } from "react-hook-form";
import { FormValues } from "@/components/forms/formplan/formvalue";

type InputFieldProps = {
    label: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    error?: string;
    placeholder?: string;
    type?: string;
};

export default function InputField({ label, name, register, error, placeholder, type = "text" }: InputFieldProps) {
    return (
        <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">{label}</label>

            <input
                type={type}
                placeholder={placeholder}
                {...register(name)} 
                className="w-full border h-[48px] border-gray-300 bg-[#FAFCFF] rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
}
