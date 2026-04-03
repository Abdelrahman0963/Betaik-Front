"use client"
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import NewDeveloprsCard from '../cards/NewDeveloprsCard'
import { useDebounce } from '@/hooks/useDebounce'
import { getUniversities } from '@/services/AuthApi'
import { useQuery } from '@tanstack/react-query'

type TabType = "All" | "Active" | "Draft" | "Expired"

const NewuniversityFilters = () => {
    const [activeTab, setActiveTab] = React.useState<TabType>("All")
    const [searchText, setSearchText] = React.useState<string>("")

    const debouncedSearch = useDebounce(searchText, 500)

    const { data: universitiesData, isLoading } = useQuery({
        queryKey: ["universities"],
        queryFn: getUniversities,
    })

    // التأكد من مسار المصفوفة بناءً على الريسبونس الخاص بك
    const allUniversities = universitiesData?.data?.universities || [];

    const filteredUniversities = allUniversities.filter((uni: any) => {
        const tabMatch = activeTab === "All" || uni.state === activeTab
        const universityName = uni.fullName || uni.name || ""
        const searchMatch = !debouncedSearch ||
            universityName.toLowerCase().includes(debouncedSearch.toLowerCase())

        return tabMatch && searchMatch
    })

    // حساب عدد الكاردات المطلوب عرضها (حد أدنى 6، أو العدد الفعلي + 1)
    const totalCardsToShow = filteredUniversities.length < 6
        ? 6
        : filteredUniversities.length + 1;

    const tabs: TabType[] = ["All", "Active", "Draft", "Expired"]

    return (
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full'>
            <div className="flex flex-col w-full">
                {/* Tabs */}
                <div className="flex gap-3 w-fit bg-gray-50 p-1 rounded-lg">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            className={`text-sm cursor-pointer flex items-center gap-2 transition px-3 py-2 rounded-lg ${activeTab === tab ? "text-gray-700 font-medium bg-white" : "text-gray-500"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            <span>{tab}</span>
                            {tab.length}
                        </div>
                    ))}
                </div>

                {/* Search Tools */}
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
                </div>

                {/* Results Grid */}
                <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                    {isLoading ? (
                        <p className="col-span-full text-center py-10">Loading universities...</p>
                    ) : (
                        // إنشاء المصفوفة بناءً على العدد المحسوب
                        Array.from({ length: totalCardsToShow }).map((_, i) => {
                            const university = filteredUniversities[i];
                            return (
                                <NewDeveloprsCard
                                    key={university?.id || i}
                                    type="university"
                                    isEmpty={!university} // لو مفيش داتا في الـ index ده يعرض كارد الإضافة
                                    data={university ?? {}}
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

export default NewuniversityFilters