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

    const debouncedSearch = useDebounce(searchText, 500)

    const { data: developersData, isLoading } = useQuery({
        queryKey: ["developers"],
        queryFn: getDevelopers,
    })

    const allDevelopers = developersData?.data || [];

    const filteredProperties = allDevelopers.filter((prop: any) => {
        const tabMatch = activeTab === "All" || prop.state === activeTab
        const developerName = prop.fullName || prop.name || ""
        const searchMatch = !debouncedSearch || developerName.toLowerCase().includes(debouncedSearch.toLowerCase())
        return tabMatch && searchMatch
    })

    // --- المنطق الجديد للحساب ---
    // إذا كان العدد أقل من 6، نكملهم لـ 6. إذا كان 6 أو أكثر، نعرضهم كلهم + 1 إضافي.
    const totalCardsToShow = filteredProperties.length < 6
        ? 6
        : filteredProperties.length + 1;

    const tabs: TabType[] = ["All", "Active", "Draft", "Expired"]

    return (
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full'>
            <div className="flex flex-col w-full">
                <div className="flex gap-3 w-fit bg-gray-50 p-1 rounded-lg">
                    {(tabs).map((tab) => (
                        <div
                            key={tab}
                            className={`text-sm cursor-pointer transition px-3 py-2 rounded-lg ${activeTab === tab
                                ? "text-gray-700 font-medium bg-white"
                                : "text-gray-500"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
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
                    <Select onValueChange={() => { }} value={""}>
                        <SelectTrigger className="w-full items-center flex gap-2.5 border border-gray-200 rounded-[10px]">
                            <SelectValue placeholder="developer company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>developer company</SelectLabel>
                                {["developer company", "developer company1", "developer company2"].map((item) => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                    {isLoading ? (
                        <p className="col-span-full text-center">Loading...</p>
                    ) : (
                        // نقوم بعمل Loop بناءً على العدد المحسوب (6 أو العدد الكلي + 1)
                        Array.from({ length: totalCardsToShow }).map((_, i) => {
                            const dev = filteredProperties[i];
                            return (
                                <NewDeveloprsCard
                                    key={dev?.id || i}
                                    type="developer"
                                    isEmpty={!dev} // إذا لم يوجد عنصر في هذا الـ index، اجعله كارد فارغ
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