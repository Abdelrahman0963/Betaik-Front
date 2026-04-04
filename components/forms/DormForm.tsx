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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";

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
    Capacity: number;
    amenities: string[];
    callNumber: string;
    whatsappNumber: string;
};

interface AmenitiesType {
    name: string;
    icon: string;
    width: number;
    height: number;
}

const DormForm = () => {
    const { register, setValue } = useForm<FormValues>();

    const [dorms, setDorms] = useState<any[]>([]);
    const [paymentPlans, setPaymentPlans] = useState<PaymentPlanType[]>([]);
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [openDorms, setOpenDorms] = useState(false);
    const [openPlans, setOpenPlans] = useState(false);
    const [paymentType, setPaymentType] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [selectedDorms, setSelectedDorms] = useState<{ [id: string]: boolean }>(
        {}
    );
    const [selectedPlans, setSelectedPlans] = useState<PaymentPlanType[]>([]);
    const [selectedContact, setSelectedContact] = useState<string | null>(null);
    const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
        null
    );
    const [showActions, setShowActions] = useState<number | null>(null);

    // Amenities
    const amenities: AmenitiesType[] = [
        { name: "Wi-Fi", icon: "/icons/Wi-Fi.svg", width: 24, height: 24 },
        { name: "Laundry", icon: "/icons/laundry.svg", width: 15.21, height: 18.20 },
        { name: "Security", icon: "/icons/security.svg", width: 24, height: 24 },
    ];

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const toggleAmenity = (name: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(name)
                ? prev.filter((a) => a !== name)
                : [...prev, name]
        );
    };

    useEffect(() => {
        setValue("amenities", selectedAmenities);
    }, [selectedAmenities, setValue]);

    useEffect(() => {
        const storedDorms = localStorage.getItem("studentHousingData");
        const storedPlans = localStorage.getItem("paymentPlansData");

        if (storedDorms) setDorms(JSON.parse(storedDorms));
        if (storedPlans) setPaymentPlans(JSON.parse(storedPlans));
    }, []);

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
                                className="w-full"
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
                        className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10"
                    />
                </div>

                {/* Description */}

                <div className="flex flex-col gap-2">
                    <label>Description</label>

                    <input
                        {...register("Description")}
                        className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10"
                    />
                </div>

                {/* Upload */}

                <div className="flex flex-col gap-2">
                    <label>Photo Upload</label>

                    <Pattern
                        className="w-full"
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
                                className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10"
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

                    {paymentType === "Use_Existing_Account" && (
                        <div className="flex flex-col gap-2">
                            <label>Payment Plans</label>

                            <div className="flex w-1/2 items-center border border-blue-200 rounded-[10px] py-2 px-3">
                                <BiSearchAlt />

                                <input
                                    readOnly
                                    placeholder="Select payment plan"
                                    className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10"
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
                            <label className="text-sm" htmlFor="District">District</label>
                            <Select>
                                <SelectTrigger className="w-full bg-blue-100/10  hover:bg-blue-100/20  items-center flex gap-2.5  border border-gray-200 rounded-[10px]">
                                    <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select District</SelectLabel>

                                        {[
                                            "Al Rehab",
                                            "Madinaty",
                                            "Zayed",
                                            "Nasr City",
                                            "Maadi",
                                            "Heliopolis",
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
                            <label className="text-sm" htmlFor="District">District</label>
                            <Select>
                                <SelectTrigger className="w-full bg-blue-100/10  hover:bg-blue-100/20  items-center flex gap-2.5  border border-gray-200 rounded-[10px]">
                                    <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select District</SelectLabel>

                                        {[
                                            "Al Rehab",
                                            "Madinaty",
                                            "Zayed",
                                            "Nasr City",
                                            "Maadi",
                                            "Heliopolis",
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
                <div className="w-full h-px bg-gray-300"></div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="Room Details">Room Details</label>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="Capacity">Capacity</label>
                        <input
                            type="text"
                            id="Capacity"
                            {...register("Capacity")}
                            className="border border-blue-100 bg-blue-100/10  hover:bg-blue-100/20 rounded-md px-3 py-2"
                        />

                    </div>
                    <div className="flex md:flex-row flex-col items-center gap-4 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm" htmlFor="District">District</label>
                            <Select>
                                <SelectTrigger className="w-full bg-blue-100/10  hover:bg-blue-100/20  items-center flex gap-2.5  border border-gray-200 rounded-[10px]">
                                    <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select District</SelectLabel>

                                        {[
                                            "Al Rehab",
                                            "Madinaty",
                                            "Zayed",
                                            "Nasr City",
                                            "Maadi",
                                            "Heliopolis",
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
                            <label className="text-sm" htmlFor="District">District</label>
                            <Select>
                                <SelectTrigger className="w-full bg-blue-100/10  hover:bg-blue-100/20  items-center flex gap-2.5  border border-gray-200 rounded-[10px]">
                                    <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select District</SelectLabel>

                                        {[
                                            "Al Rehab",
                                            "Madinaty",
                                            "Zayed",
                                            "Nasr City",
                                            "Maadi",
                                            "Heliopolis",
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
                </div>
                <div className="w-full h-px bg-gray-300"></div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="Amenities">Amenities</label>

                    <div className="flex flex-wrap items-center gap-4">
                        {amenities.map((amenity) => {
                            const active = selectedAmenities.includes(amenity.name);

                            return (
                                <nav
                                    key={amenity.name}
                                    onClick={() => toggleAmenity(amenity.name)}
                                    className={`cursor-pointer flex gap-2 items-center px-4 w-52 py-3 rounded-full border transition
                  ${active
                                            ? "border-blue-500 bg-blue-100"
                                            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                        }`}
                                >
                                    <Image
                                        width={amenity.width}
                                        height={amenity.height}
                                        className="w-6 h-6"
                                        src={amenity.icon}
                                        loading="lazy"
                                        alt={amenity.name}
                                    />

                                    <p className="text-[16px]">{amenity.name}</p>
                                </nav>
                            );
                        })}
                    </div>
                </div>
                <div className="w-full h-px bg-gray-300"></div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="Contact Information">Contact Information</label>
                    <RadioGroup onValueChange={setContactInfo}>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="Contact_Info_Manual_Entry" id="r1" />
                            <label htmlFor="r1">Manual Entry</label>
                        </div>

                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="Contact_Info_Use_Existing_Account" id="r2" />
                            <label htmlFor="r2">Use Existing Account</label>
                        </div>
                    </RadioGroup>

                    {contactInfo === "Contact_Info_Manual_Entry" && (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center md:flex-row flex-col gap-4 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="Call Number">Call Number</label>
                                    <input
                                        type="text"
                                        placeholder="+1 (555) 000-0000"
                                        {...register("callNumber")}
                                        className="border bg-blue-100/10  hover:bg-blue-100/20 border-blue-200 rounded-[10px] py-2 px-4"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="WhatsApp Number">WhatsApp Number</label>
                                    <input
                                        type="text"
                                        placeholder="+1 (555) 000-0000"
                                        {...register("whatsappNumber")}
                                        className="border bg-blue-100/10  hover:bg-blue-100/20 border-blue-200 rounded-[10px] py-2 px-4"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="PreferredMethod">Preferred Contact Method</label>
                                <div className="flex gap-4">
                                    <RadioGroup className="flex gap-4">
                                        {["call", "whatsapp", "both"].map((item) => (
                                            <div key={item} className="flex items-center gap-2">
                                                <RadioGroupItem value={item} id={item} />
                                                <label htmlFor={item} className="capitalize">
                                                    {item}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                            </div>

                        </div>
                    )}
                </div>
                <div className="w-full h-px bg-gray-300"></div>
                <div className="flex items-end justify-end gap-4 w-full py-7 px-10 border rounded-2xl border-gray-300">
                    <button type="button" className="bg-white cursor-pointer text-gray-500 px-4 py-2 border border-gray-600 rounded-lg hover:bg-red-50">Close</button>
                    <button type="button" className="bg-white cursor-pointer text-gray-500 px-4 border border-gray-600 py-2 rounded-lg hover:bg-gray-50">Save Draft</button>
                    <button type="button" className="bg-white cursor-pointer text-blue-500 px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-50 flex items-center gap-1"><IoEyeOutline className="text-blue-500" />  Preview</button>
                    <button type="submit" className="bg-blue-800 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600">Publish Dorm</button>
                </div>
            </form>
        </div>
    );
};

export default DormForm;