"use client"

import React, { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type { FileWithPreview } from "@/hooks/use-file-upload"
import { Pattern } from "../patterns/p-file-upload-4"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { IoEyeOutline } from "react-icons/io5"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    photo: z.string().min(1, "Photo is required"),
    Description: z.string().min(1, "Description is required"),
})

type FormValues = z.infer<typeof schema>

const DEFAULT_FORM_VALUES: FormValues = {
    name: "",
    photo: "",
    Description: "",
}

function getStoredHousingData(): unknown[] {
    if (typeof window === "undefined") return []
    try {
        const raw = localStorage.getItem("studentHousingData")
        if (!raw) return []
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : [parsed]
    } catch {
        return []
    }
}

const StudentHousingForm = () => {
    const [compound, setCompound] = useState<string | null>(null)
    const [gender, setGender] = useState<string | null>(null)
    const [area, setArea] = useState<string | null>(null)
    const [districts, setDistricts] = useState<string | null>(null)
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [patternKey, setPatternKey] = useState(0)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: DEFAULT_FORM_VALUES,
    })

    React.useEffect(() => {
        const photoValue = files[0]?.file?.name ?? ""
        setValue("photo", photoValue, { shouldValidate: true })
    }, [files, setValue])

    const handleClose = useCallback(() => {
        reset(DEFAULT_FORM_VALUES)
        setCompound(null)
        setGender(null)
        setArea(null)
        setDistricts(null)
        setFiles([])
        setPatternKey((prev) => prev + 1)
    }, [reset])

    const onFilesChange = useCallback((newFiles: FileWithPreview[]) => {
        setFiles(newFiles)

    }, [])

    const buildPayload = useCallback(
        (state: "Active" | "Draft") => ({
            name: getValues("name"),
            Description: getValues("Description"),
            photo: files[0]?.file?.name ?? "",
            compound,
            gender,
            area,
            districts,
            files: files.map((f) => ({
                name: f.file.name,
                preview: f.preview,
            })),
            state,
        }),
        [compound, gender, area, districts, files, getValues]
    )

    const onSubmit = useCallback(
        (data: FormValues) => {
            const fullData = { ...data, ...buildPayload("Active") }
            const parsedData = getStoredHousingData()
            parsedData.push(fullData)
            localStorage.setItem("studentHousingData", JSON.stringify(parsedData))
            handleClose()
            toast.success("Successfully published!")
            router.push("/dorms-mgt")
        },
        [buildPayload, handleClose, router]
    )

    const handleDraft = useCallback(() => {
        const fullData = buildPayload("Draft")
        const parsedData = getStoredHousingData()
        parsedData.push(fullData)
        localStorage.setItem("studentHousingData", JSON.stringify(parsedData))
        toast.success("Draft saved!")
        router.push("/dorms-mgt")
    }, [buildPayload, router])
    return (
        <div className="flex flex-col gap-4 py-4 px-5 md:gap-6 md:py-6 bg-white rounded-lg border">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input type="text" {...register("name")} className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                {/* Pattern Upload */}
                <Pattern
                    key={patternKey}
                    className="w-full border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10"
                    onFilesChange={onFilesChange}
                    maxSize={10 * 1024 * 1024}
                    accept="image/*"
                    multiple
                />
                <input type="hidden" {...register("photo")} value={files[0]?.file?.name ?? ""} />
                {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}

                {/* Compound + Gender */}
                <div className="flex items-center justify-center gap-2 w-full mt-3">
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-sm font-medium text-gray-700">Compound</label>
                        <Select onValueChange={setCompound} value={compound ?? undefined} >
                            <SelectTrigger className="w-full border border-gray-200 rounded-[10px]">
                                <SelectValue placeholder="Compound" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Compound</SelectLabel>
                                    <SelectItem value="compound">compound</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <label>Gender</label>
                        <Select onValueChange={setGender} value={gender ?? undefined}>
                            <SelectTrigger className="w-full border border-gray-200 rounded-[10px]">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="Male and  Female Dorms">Male and  Female Dorms</SelectItem>
                                    <SelectItem value="Male Dorms Only">Male Dorms Only</SelectItem>
                                    <SelectItem value="Female Dorms Only">Female Dorms Only</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 w-full mt-3">
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-sm font-medium text-gray-700">Area</label>
                        <Select onValueChange={setArea} value={area ?? undefined}>
                            <SelectTrigger className="w-full border border-gray-200 rounded-[10px]">
                                <SelectValue placeholder="Select Area" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Area</SelectLabel>
                                    <SelectItem value="area">Area</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <label>Districts</label>
                        <Select onValueChange={setDistricts} value={districts ?? undefined}>
                            <SelectTrigger className="w-full border border-gray-200 rounded-[10px]">
                                <SelectValue placeholder="Select Districts" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Districts</SelectLabel>
                                    <SelectItem value="district">Districts</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <input type="text" {...register("Description")} className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100/10" />
                    {errors.Description && <p className="text-red-500">{errors.Description.message}</p>}
                </div>

                {/* Buttons */}
                <div className="w-full flex items-end justify-end gap-3">
                    <button type="button" onClick={handleClose} className="bg-white cursor-pointer text-gray-500 px-4 py-2 border border-gray-600 rounded-lg hover:bg-red-50">Close</button>
                    <button type="button" onClick={handleDraft} className="bg-white cursor-pointer text-gray-500 px-4 border border-gray-600 py-2 rounded-lg hover:bg-gray-50">Save Draft</button>
                    <button type="button" className="bg-white cursor-pointer text-blue-500 px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-50 flex items-center gap-1"><IoEyeOutline className="text-blue-500" />  Preview</button>
                    <button type="submit" className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600">Publish Dorm</button>
                </div>
            </form>
        </div>
    )
}

export default StudentHousingForm