"use client"

import React, { useState, useEffect } from "react"
import { BiSearchAlt } from "react-icons/bi"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import StudentHousingCard from "../cards/StudentHousingCard"

type TabType = "All" | "Active" | "Draft" | "Expired"

const StudentsHousingFilters = () => {
    const [activeTab, setActiveTab] = useState<TabType>("Active")
    const [genderFilter, setGenderFilter] = useState<string>("All Student Housing")
    const [searchText, setSearchText] = useState<string>("")
    const [properties, setProperties] = useState<any[]>([])

    useEffect(() => {
        const storedStudentsHousing = localStorage.getItem("studentHousingData")
        if (storedStudentsHousing) {
            setProperties(JSON.parse(storedStudentsHousing))
        }
    }, [])

    const filteredProperties = properties.filter((prop) => {
        const tabMatch = activeTab === "All" || prop.state === activeTab

        const genderMatch =
            genderFilter === "All Student Housing" || prop.gender === genderFilter

        const searchMatch =
            !searchText ||
            prop.name?.toLowerCase().includes(searchText.toLowerCase())

        return tabMatch && genderMatch && searchMatch
    })

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full">
            <div className="flex flex-col w-full">
                {/* Tabs */}
                <div className="flex gap-3">
                    {(["All", "Active", "Draft", "Expired"] as TabType[]).map(
                        (tab) => (
                            <div
                                key={tab}
                                className={`text-sm cursor-pointer transition px-3 py-2 rounded-2xl ${activeTab === tab
                                    ? "text-[#155DFC] bg-gray-100"
                                    : "text-[#7F8595]"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </div>
                        )
                    )}
                </div>
                <div className="flex justify-between md:flex-row flex-col gap-4 items-center mt-9 w-full">
                    {/* Search */}
                    <div className="w-full md:max-w-4xl  flex items-center border border-gray-200 rounded-[10px]">
                        <div className="ml-4">
                            <BiSearchAlt className="text-[#7F8595]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="w-full h-full focus:outline-none p-2"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    {/* Gender Filter */}
                    <Select onValueChange={setGenderFilter} value={genderFilter}>
                        <SelectTrigger className="w-full md:max-w-80 items-center flex gap-2.5  border border-gray-200 rounded-[10px]">
                            <SelectValue placeholder="All Student Housing" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Student Housing</SelectLabel>

                                {[
                                    "All Student Housing",
                                    "Male and  Female Dorms",
                                    "Male Dorms Only",
                                    "Female Dorms Only",
                                ].map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Property Cards */}
                <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                    {Array.from({ length: 6 }).map((_, i) => {
                        const property = filteredProperties[i]
                        return (
                            <StudentHousingCard
                                key={i}
                                isEmpty={!property}
                                data={property ?? {}}
                                onClick={() => { }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default StudentsHousingFilters