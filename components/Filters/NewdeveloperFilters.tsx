"use client"
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import NewDeveloprsCard from '../cards/NewDeveloprsCard'
import { getDevelopers } from '@/services/AuthApi'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'

type TabType = "All" | "Active" | "Draft" | "Expired"

const NewdeveloperFilters = () => {
    const [activeTab, setActiveTab] = React.useState<TabType>("All")
    const [searchText, setSearchText] = React.useState<string>("")
    // 1. حالة تخزين الشركة المختارة (القيمة الافتراضية "all")
    const [selectedCompanyName, setSelectedCompanyName] = React.useState<string>("all")

    const debouncedSearch = useDebounce(searchText, 500)

    const { data: developersData, isLoading } = useQuery({
        queryKey: ["developers"],
        queryFn: getDevelopers,
    })

    // ريسبونس الـ API بتاعك عبارة عن array مباشرة أو موجود جوه data
    const allDevelopers = developersData?.data || developersData || [];

    // 2. استخراج أسماء الشركات (fullName) بدون تكرار
    const companies = Array.from(
        new Set(allDevelopers.map((dev: any) => dev.fullName).filter(Boolean))
    ) as string[];

    // 3. منطق الفلترة المحدث
    const filteredProperties = allDevelopers.filter((prop: any) => {
        // فلترة التاب (لو عندك حقل state في الـ API)
        const tabMatch = activeTab === "All" || prop.state === activeTab

        // فلترة البحث بالاسم
        const developerName = prop.fullName || ""
        const searchMatch = !debouncedSearch || developerName.toLowerCase().includes(debouncedSearch.toLowerCase())

        // فلترة السلكت (الشركة)
        const companyMatch = selectedCompanyName === "all" || prop.fullName === selectedCompanyName

        return tabMatch && searchMatch && companyMatch
    })

    const totalCardsToShow = filteredProperties.length < 6
        ? 6
        : filteredProperties.length + 1;

    const tabs: TabType[] = ["All", "Active", "Draft", "Expired"]

    return (
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full'>
            <div className="flex flex-col w-full">
                <div className="flex gap-3 w-fit bg-gray-50 p-1 rounded-lg">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            className={`text-sm cursor-pointer flex items-center gap-2 transition px-3 py-2 rounded-lg ${activeTab === tab
                                ? "text-gray-700 font-medium bg-white"
                                : "text-gray-500"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            <span> {tab}</span>
                            {tab.length}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between md:flex-row flex-col gap-4 items-center mt-9 w-full">
                    <div className="w-full flex items-center border border-gray-200 rounded-[10px]">
                        <div className="ml-4">
                            <BiSearchAlt className="text-[#7F8595]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="w-full h-full focus:outline-none p-2 bg-transparent"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    {/* 4. السلكت بعد التعديل */}
                    <Select
                        onValueChange={(value) => setSelectedCompanyName(value)}
                        value={selectedCompanyName}
                    >
                        <SelectTrigger className="w-full items-center flex gap-2.5 border border-gray-200 rounded-[10px]">
                            <SelectValue placeholder="Select Developer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Developers</SelectLabel>
                                <SelectItem value="all">All Developers</SelectItem>
                                {companies.map((name) => (
                                    <SelectItem key={name} value={name}>
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                    {isLoading ? (
                        <p className="col-span-full text-center">Loading...</p>
                    ) : (
                        Array.from({ length: totalCardsToShow }).map((_, i) => {
                            const dev = filteredProperties[i];
                            return (
                                <NewDeveloprsCard
                                    key={dev?.id || i}
                                    type="developer"
                                    isEmpty={!dev}
                                    data={dev ?? {}}
                                    onClick={() => { }}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewdeveloperFilters