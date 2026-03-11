"use client";

import { ChevronDownIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import type { FileWithPreview } from "@/hooks/use-file-upload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

import StudentHousingCard from "../cards/StudentHousingCard";
import PaymentPlanCard from "../cards/paymentcard";
import { Pattern } from "../patterns/p-file-upload-4";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { CiLocationOn } from "react-icons/ci";

type PaymentPlanType = {
    planName: string;
    price: string;
    frequency: string;
    installments: string;
    term: string;
    validFrom: string;
    status: "active" | "draft";
};

type FormValues = {
    dorm: string;
    Description: string;
    price: number;
    installments: number;
};

const DormForm = () => {
    const { register, setValue } = useForm<FormValues>();

    const [dorms, setDorms] = useState<any[]>([]);
    const [paymentPlans, setPaymentPlans] = useState<PaymentPlanType[]>([]);
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const [openDorms, setOpenDorms] = useState(false);
    const [openPlans, setOpenPlans] = useState(false);

    const [paymentType, setPaymentType] = useState("");

    const [selectedDorms, setSelectedDorms] = useState<{ [id: string]: boolean }>(
        {}
    );

    const [selectedPlans, setSelectedPlans] = useState<PaymentPlanType[]>([]);
    const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
        null
    );

    const [showActions, setShowActions] = useState<number | null>(null);

    /* ---------------- load data ---------------- */

    useEffect(() => {
        const storedDorms = localStorage.getItem("studentHousingData");
        const storedPlans = localStorage.getItem("paymentPlansData");

        if (storedDorms) setDorms(JSON.parse(storedDorms));
        if (storedPlans) setPaymentPlans(JSON.parse(storedPlans));
    }, []);

    /* ---------------- handlers ---------------- */

    const handleSelectDorm = (prop: any) => {
        setValue("dorm", prop.name);
    };

    const handleDormCheck = (id: string, checked: boolean) => {
        setSelectedDorms((prev) => ({ ...prev, [id]: checked }));
    };

    const handleSelectPlan = (checked: boolean, plan: PaymentPlanType) => {
        setSelectedPlans((prev) => {
            if (checked) {
                return [...prev, plan];
            } else {
                return prev.filter((p) => p.planName !== plan.planName);
            }
        });
    };

    const onFilesChange = useCallback((newFiles: FileWithPreview[]) => {
        setFiles(newFiles);
    }, []);

    const handleEdit = (plan: PaymentPlanType) => {
        console.log("edit", plan);
    };

    const handleDelete = (index: number) => {
        console.log("delete", index);
    };

    return (
        <div className="flex flex-col gap-6 py-6 px-5 bg-white rounded-lg border">
            <p className="text-xl font-medium">Dorm Information</p>

            <form
                className="flex flex-col gap-6"
                onSubmit={(e) => e.preventDefault()}
            >
                {/* Student Housing */}

                <div className="flex flex-col gap-2">
                    <label>Student Housing</label>

                    <div
                        onClick={() => setOpenDorms(!openDorms)}
                        className="w-full bg-blue-100/10  hover:bg-blue-100/20 flex justify-between py-2 items-center border border-blue-200 rounded-[10px] cursor-pointer"
                    >
                        <div className="ml-4  flex items-center gap-2 w-full">
                            <BiSearchAlt className="text-[#7F8595]" />

                            <input
                                readOnly
                                className="w-full outline-none text-sm bg-transparent"
                                placeholder="Select dorm"
                                value={Object.keys(selectedDorms)
                                    .filter((k) => selectedDorms[k])
                                    .map((k) => dorms[parseInt(k)]?.name)
                                    .join(", ")}
                            />
                        </div>

                        <ChevronDownIcon
                            className={`size-5 mr-2 ${openDorms ? "rotate-180" : ""}`}
                        />
                    </div>

                    {openDorms && (
                        <Carousel opts={{ align: "start", dragFree: true }}>
                            <CarouselContent>
                                {dorms.map((property, i) => (
                                    <CarouselItem key={i} className="basis-1/4 pl-2">
                                        <StudentHousingCard
                                            data={property}
                                            showCheckbox
                                            checked={!!selectedDorms[i]}
                                            onCheckChange={(v) => handleDormCheck(i + "", v)}
                                            onClick={() => handleSelectDorm(property)}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    )}
                </div>

                {/* Dorm Name */}

                <div className="flex flex-col gap-2">
                    <label>Dorm Name</label>

                    <input
                        {...register("dorm")}
                        className="border bg-blue-100/10  hover:bg-blue-100/20 border-blue-200 rounded-[10px] py-2 px-4"
                    />
                </div>

                {/* Description */}

                <div className="flex flex-col gap-2">
                    <label>Description</label>

                    <input
                        {...register("Description")}
                        className="border bg-blue-100/10  hover:bg-blue-100/20 border-blue-200 rounded-[10px] py-2 px-4"
                    />
                </div>

                {/* Upload */}

                <div className="flex flex-col gap-2">
                    <label>Photo Upload</label>

                    <Pattern
                        className="w-full bg-blue-100/10  hover:bg-blue-100/20"
                        onFilesChange={onFilesChange}
                        maxSize={10 * 1024 * 1024}
                        accept="image/*"
                        multiple
                    />
                </div>

                {/* Payment */}

                <div className="flex flex-col gap-4">
                    <label>Pricing & Payment</label>

                    <RadioGroup onValueChange={setPaymentType}>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="Manual_Entry" id="r1" />
                            <label htmlFor="r1">Manual Entry</label>
                        </div>

                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="Use_Existing_Account" id="r2" />
                            <label htmlFor="r2">Use Existing Account</label>
                        </div>
                    </RadioGroup>

                    {/* Manual */}

                    {paymentType === "Manual_Entry" && (
                        <div className="flex flex-col gap-4">
                            <input
                                placeholder="Price"
                                {...register("price")}
                                className="border border-blue-200 bg-blue-100/10  hover:bg-blue-100/20 rounded-[10px] py-2 px-4"
                            />

                            <div className="flex gap-4">
                                {["Per Month", "Per Semester", "Per Term"].map((freq) => (
                                    <label key={freq} className="flex gap-2 items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedFrequency === freq}
                                            onChange={(e) =>
                                                setSelectedFrequency(e.target.checked ? freq : null)
                                            }
                                        />

                                        {freq}
                                    </label>
                                ))}
                            </div>

                            <input
                                type="number"
                                placeholder="Installments"
                                {...register("installments")}
                                className="border bg-blue-100/10  hover:bg-blue-100/20 border-blue-200 rounded-[10px] py-2 px-4"
                            />
                        </div>
                    )}

                    {/* Existing Plans */}

                    {paymentType === "Use_Existing_Account" && (
                        <div className="flex flex-col gap-2">
                            <label>Payment Plans</label>

                            <div className="flex w-1/2 items-center border border-blue-200 rounded-[10px] py-2 px-3">
                                <BiSearchAlt />

                                <input
                                    readOnly
                                    placeholder="Select payment plan"
                                    className="w-full bg-blue-100/10  hover:bg-blue-100/20 outline-none ml-2 cursor-pointer"
                                    value={selectedPlans.map((p) => p.planName).join(", ")}
                                    onClick={() => setOpenPlans((prev) => !prev)}
                                />

                                <ChevronDownIcon
                                    className={`ml-auto transition-transform ${openPlans ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {openPlans && (
                                <div className="w-full mt-3 bg-white shadow-md rounded-xl px-2 py-3">
                                    <Carousel opts={{ align: "start", dragFree: true }}>
                                        <CarouselContent className="-ml-2">
                                            {paymentPlans.map((plan, i) => (
                                                <CarouselItem key={i} className="basis-1/4 pl-2">
                                                    <PaymentPlanCard
                                                        data={plan}
                                                        index={i}
                                                        showActions={showActions}
                                                        setShowActions={setShowActions}
                                                        handleEdit={handleEdit}
                                                        handleDelete={handleDelete}
                                                        showCheckbox
                                                        checked={selectedPlans.some(
                                                            (p) => p.planName === plan.planName
                                                        )}
                                                        onCheckChange={(val) =>
                                                            handleSelectPlan(val, plan)
                                                        }
                                                    />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                </div>
                            )}
                        </div>
                    )}

                </div>
                <div className="w-full h-px bg-gray-300"></div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="Location">Location</label>
                    <div className="flex md:flex-row flex-col items-center gap-4 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm" htmlFor="Area">Area</label>
                            <Select>
                                <SelectTrigger className="w-full bg-blue-100/10  hover:bg-blue-100/20  items-center flex gap-2.5  border border-gray-200 rounded-[10px]">
                                    <SelectValue placeholder="Select Area" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Area</SelectLabel>

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
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm" htmlFor="Area">Area</label>
                            <Select>
                                <SelectTrigger className="w-full bg-blue-100/10  hover:bg-blue-100/20  items-center flex gap-2.5  border border-gray-200 rounded-[10px]">
                                    <SelectValue placeholder="Select Area" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Area</SelectLabel>

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
                        </div>
                    </div>
                    <div className="w-full cursor-pointer border-dashed border-2 border-blue-400 flex items-center bg-blue-50/10 rounded-2xl justify-center p-14">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <CiLocationOn className="text-6xl text-gray-400" />
                            <p className="text-lg text-gray-800">Drag the pin to adjust exact location</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DormForm;