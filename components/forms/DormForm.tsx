"use client"

import { ChevronDownIcon } from "lucide-react"
import React, { useCallback, useEffect, useState } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { useForm } from "react-hook-form"
import type { FileWithPreview } from "@/hooks/use-file-upload"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

import StudentHousingCard from "../cards/StudentHousingCard"
import { Pattern } from "../patterns/p-file-upload-4"

type FormValues = {
    dorm: string
    Description: string
}

const DormForm = () => {
    const { register, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            dorm: "",
            Description: "",
        },
    })


    const selectedDorm = watch("dorm")

    const [properties, setProperties] = useState<any[]>([])
    const [patternKey, setPatternKey] = useState(0)
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [open, setOpen] = useState(false)

    // هنا بنخزن الاختيارات للكاردات
    const [selectedCards, setSelectedCards] = useState<{ [id: string]: boolean }>({})

    useEffect(() => {
        const storedDorms = localStorage.getItem("studentHousingData")
        if (storedDorms) {
            setProperties(JSON.parse(storedDorms))
        }
    }, [])

    const handleSelectDorm = (prop: any) => {
        setValue("dorm", prop.name)
    }

    const handleCheckChange = (id: string, checked: boolean) => {
        setSelectedCards((prev) => ({ ...prev, [id]: checked }))
    }
    const onFilesChange = useCallback((newFiles: FileWithPreview[]) => {
        setFiles(newFiles)

    }, [])

    return (
        <div className="flex flex-col gap-4 py-4 px-5 md:gap-6 md:py-6 bg-white rounded-lg border">
            <p className="md:text-xl font-medium">Dorm Information</p>

            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">

                    <label>Student Housing</label>

                    {/* Select Input */}
                    <div
                        onClick={() => setOpen(!open)}
                        className="w-full flex justify-between py-2 items-center border border-blue-200 rounded-[10px] cursor-pointer hover:border-blue-400 transition"
                    >
                        <div className="ml-4 flex items-center gap-2 w-full">
                            <BiSearchAlt className="text-[#7F8595]" />

                            <input
                                type="text"
                                placeholder="Select dorm"
                                readOnly
                                className="w-full outline-none text-sm cursor-pointer bg-transparent"
                                value={
                                    properties.length
                                        ? Object.keys(selectedCards)
                                            .filter((key) => selectedCards[parseInt(key)])
                                            .map((key) => properties[parseInt(key)]?.name)
                                            .filter(Boolean)
                                            .join(", ")
                                        : ""
                                }
                            />
                        </div>

                        <ChevronDownIcon
                            className={`size-5 mr-2 opacity-50 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </div>

                    {/* Carousel */}
                    {open && (
                        <div className="w-full mt-2 bg-white shadow-md py-2 px-4 rounded-xl">
                            <Carousel
                                opts={{
                                    align: "start",
                                    dragFree: true,
                                }}
                                className="w-full px-4"
                            >
                                <CarouselContent className="-ml-2 flex items-center gap-3 ">

                                    {properties.map((property, i) => (
                                        <CarouselItem key={i} className="pl-2 basis-64 max-w-72">
                                            <StudentHousingCard
                                                data={property}
                                                isEmpty={!property}
                                                onClick={() => handleSelectDorm(property)}
                                                showCheckbox={true}
                                                checked={!!selectedCards[i]}
                                                onCheckChange={(checked) => handleCheckChange(i + "", checked)}
                                            />
                                        </CarouselItem>
                                    ))}

                                </CarouselContent>
                            </Carousel>
                        </div>
                    )}

                </div>
                <div className="flex flex-col gap-2">
                    <label>Dorm Name</label>
                    <input
                        type="text"
                        placeholder="Enter address"
                        className="w-full outline-none text-sm cursor-pointer bg-transparent border border-blue-200 rounded-[10px] py-2 px-4"
                        {...register("dorm")}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Enter description"
                        className="w-full outline-none text-sm cursor-pointer bg-transparent border border-blue-200 rounded-[10px] py-2 px-4"
                        {...register("Description")}
                    />

                </div>
                <div className="flex flex-col gap-2">
                    <label>Photo Upload</label>
                    <Pattern
                        key={patternKey}
                        className="w-full"
                        onFilesChange={(files) => setFiles(files)}
                        maxSize={10 * 1024 * 1024}
                        accept="image/*"
                        multiple
                    />
                </div>

            </form>
        </div>
    )
}

export default DormForm