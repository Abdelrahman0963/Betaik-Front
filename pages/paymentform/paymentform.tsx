"use client";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";
import { usePaymentStore } from "../../stores/form";

function Paymentform() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    // حالات الـ input
    const [planName, setPlanName] = useState("");
    const [price, setPrice] = useState("");
    const [selected, setSelected] = useState("");
    const [installments, setInstallments] = useState("");
    const options = ["Year", "Semester"];


    const [showCalendarValidFrom, setShowCalendarValidFrom] = useState(false);
    const [selectedDateValidFrom, setSelectedDateValidFrom] = useState<Dayjs | null>(null);

    const [showCalendarTerm, setShowCalendarTerm] = useState(false);
    const [selectedDateTerm, setSelectedDateTerm] = useState<Dayjs | null>(null);

    const addPlan = usePaymentStore((state) => state.addPlan);


    const [errors, setErrors] = useState({
        planName: "",
        price: "",
        selected: "",
        installments: "",
        validFrom: "",
        term: "",
    });

    const validateForm = () => {
        const newErrors = {
            planName: "",
            price: "",
            selected: "",
            installments: "",
            validFrom: "",
            term: "",
        };
        let isValid = true;

        if (!planName) {
            newErrors.planName = "Required";
            isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(planName)) {
            newErrors.planName = "Only letters allowed";
            isValid = false;
        }

        if (!price) {
            newErrors.price = "Required";
            isValid = false;
        } else if (!/^\d+$/.test(price)) {
            newErrors.price = "Only numbers allowed";
            isValid = false;
        }

        if (!selected) {
            newErrors.selected = "Required";
            isValid = false;
        }

        if (!installments) {
            newErrors.installments = "Required";
            isValid = false;
        } else if (!/^\d+$/.test(installments)) {
            newErrors.installments = "Only numbers allowed";
            isValid = false;
        }

        if (!selectedDateValidFrom) {
            newErrors.validFrom = "Required";
            isValid = false;
        }

        if (!selectedDateTerm) {
            newErrors.term = "Required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = (status: "active" | "draft") => {
        if (!validateForm()) return;

        addPlan({
            planName,
            price,
            frequency: selected,
            installments,
            validFrom: selectedDateValidFrom!.format("MM/DD/YYYY"),
            term: selectedDateTerm!.format("MM/DD/YYYY"),
            status,
        });
        router.push("/payment");
    };
    const handleCancel = () => {
        setPlanName("");
        setPrice("");
        setSelected("");
        setInstallments("");
        setSelectedDateValidFrom(null);
        setSelectedDateTerm(null);
        setErrors({
            planName: "",
            price: "",
            selected: "",
            installments: "",
            validFrom: "",
            term: "",
        });
    };

    return (
        <div className="container mx-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                    <RiArrowLeftWideLine className="text-[#191B1F] text-[20px] cursor-pointer" />
                    <div className="text-[24px] font-normal text-[#191B1F] ">Back</div>
                </div>
                <div className="w-55.75 h-11 font-medium text-[32px]">Payment Plans</div>
                <div className="w-117.25 h-5 font-medium text-[16px] text-[#414A5B]">Manage all payment plans and special offers for your dorms.</div>
            </div>

            <div className="mt-7 px-5.25 py-8 flex flex-col gap-3 w-full h-152.75 border border-gray-200 rounded-[10px]">
                <div className="text-[24px] font-medium text-[#191B1F]">Pricing & Payment</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Plan Name</label>
                        <div className="relative w-full">
                            <input
                                value={planName}
                                onChange={(e) => setPlanName(e.target.value)}
                                placeholder="Enter plan name"
                                required
                                className="w-full border border-gray-300 bg-[#FAFCFF] rounded-lg h-10 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none" />
                        </div>
                        {errors.planName && <div className="text-red-500 text-sm mt-1">{errors.planName}</div>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Price</label>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g., Madison Hal"
                            required
                            className="border border-gray-300 rounded-lg bg-[#FAFCFF]  h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="flex flex-col w-full relative">
                        <label className="mb-2 text-sm font-medium">Payment Frequency</label>
                        <div onClick={() => setOpen(!open)} className="relative w-full cursor-pointer">
                            <input
                                readOnly
                                value={selected}
                                placeholder="Payment Frequency"
                                required
                                className="w-full border border-gray-300 bg-[#FAFCFF] rounded-lg h-10 px-3 pr-10 focus:outline-none"
                            />
                            <MdOutlineKeyboardArrowDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl transition-transform ${open ? "rotate-180" : ""}`} />
                        </div>
                        {open && (
                            <div className="absolute top-18 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10">
                                {options.map((item) => (
                                    <div
                                        key={item}
                                        onClick={() => {
                                            setSelected(item);
                                            setOpen(false);
                                        }}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.selected && <div className="text-red-500 text-sm mt-1">{errors.selected}</div>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Installments</label>
                        <input
                            value={installments}
                            onChange={(e) => setInstallments(e.target.value)}
                            placeholder="Number of installments"
                            required
                            className="border border-gray-300 bg-[#FAFCFF] rounded-lg h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.installments && <div className="text-red-500 text-sm mt-1">{errors.installments}</div>}
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">

                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Valid From</label>
                        <div className="relative w-full">
                            <input
                                readOnly
                                value={selectedDateValidFrom ? selectedDateValidFrom.format("MM/DD/YYYY") : ""}
                                placeholder="1/12/2026"
                                onClick={() => setShowCalendarValidFrom(!showCalendarValidFrom)}
                                required
                                className="w-full border border-gray-300 bg-[#FAFCFF] rounded-lg h-10 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                            <CiCalendar onClick={() => setShowCalendarValidFrom(!showCalendarValidFrom)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
                            {showCalendarValidFrom && (
                                <Box className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar
                                            value={selectedDateValidFrom}
                                            onChange={(newValue) => {
                                                setSelectedDateValidFrom(newValue);
                                                setShowCalendarValidFrom(false);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            )}
                        </div>
                        {errors.validFrom && <div className="text-red-500 text-sm mt-1">{errors.validFrom}</div>}
                    </div>


                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Academic Term</label>
                        <div className="relative w-full">
                            <input
                                readOnly
                                value={selectedDateTerm ? selectedDateTerm.format("MM/DD/YYYY") : ""}
                                placeholder="1/12/2026"
                                onClick={() => setShowCalendarTerm(!showCalendarTerm)}
                                required
                                className="w-full border border-gray-300 bg-[#FAFCFF] rounded-lg h-10 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                            <CiCalendar onClick={() => setShowCalendarTerm(!showCalendarTerm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
                            {showCalendarTerm && (
                                <Box className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar
                                            value={selectedDateTerm}
                                            onChange={(newValue) => {
                                                setSelectedDateTerm(newValue);
                                                setShowCalendarTerm(false);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            )}
                        </div>
                        {errors.term && <div className="text-red-500 text-sm mt-1">{errors.term}</div>}
                    </div>
                </div>


                <div className="mt-5 w-full border border-gray-200"></div>
                <div className="mt-5 w-full h-25 border border-gray-200 rounded-[10px] flex flex-col sm:flex-row gap-4 items-center justify-end pr-4">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2.5 bg-white border border-gray-200 text-[#414651] rounded-2xl cursor-pointer hover:bg-gray-200 hover:border-gray-300 transition-colors duration-200">
                        Cancel
                    </button>
                    <button
                        onClick={() => handleSave("draft")}
                        className="px-4 py-2.5 border border-gray-200 text-[#414651] rounded-2xl cursor-pointer hover:bg-gray-200 hover:border-gray-300 transition-colors duration-200">
                        Save Draft
                    </button>
                    <button onClick={() => handleSave("active")} className="px-4 py-2.5 bg-[#155DFC] text-white rounded-lg hover:bg-[#0F4BD8] cursor-pointer">
                        Publish Dorm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Paymentform;