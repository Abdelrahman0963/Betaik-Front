"use client"
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import NewDeveloprsCard from '../cards/NewDeveloprsCard'
import { getDevelopers } from '@/services/AuthApi'
import { useDebounce } from '@/hooks/useDebounce'

type TabType = "All" | "Active" | "Draft" | "Expired"

const NewdeveloperFilters = () => {
    const [activeTab, setActiveTab] = React.useState<TabType>("All")
    const [searchText, setSearchText] = React.useState<string>("")
    const [properties, setProperties] = React.useState<any[]>([])

    // تفعيل الـ debounce على نص البحث
    const debouncedSearch = useDebounce(searchText, 500)

    React.useEffect(() => {
        getDevelopers().then((res) => {
            console.log("Fetched Developers Data:", res.data)
            setProperties(res.data)
        }).catch((err) => {
            console.error("Error fetching developers:", err)
        })
    }, [])

    const filteredProperties = properties.filter((prop) => {
        const tabMatch = activeTab === "All" || prop.state === activeTab

        const developerName = prop.name || prop.fullName || ""

        // استخدام debouncedSearch هنا بدلاً من searchText للفلترة
        const searchMatch =
            !debouncedSearch ||
            developerName.toLowerCase().includes(debouncedSearch.toLowerCase())

        return tabMatch && searchMatch
    })

    const tabs: TabType[] = ["All", "Active", "Draft", "Expired"]

    return (
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full'>
            <div className="flex flex-col w-full">
                <div className="flex gap-3 w-fit bg-gray-50 p-1 rounded-lg">
                    {(tabs).map(
                        (tab) => (
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
                        )
                    )}
                </div>
                <div className="flex justify-between md:flex-row flex-col gap-4 items-center mt-9 w-full">
                    <div className="w-full flex items-center border border-gray-200 rounded-[10px]">
                        <div className="ml-4">
                            <BiSearchAlt className="text-[#7F8595]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="w-full h-full focus:outline-none p-2"
                            // الـ input يظل مرتبط بـ searchText لعرض ما يكتبه المستخدم فوراً
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <Select onValueChange={() => { }} value={""}>
                        <SelectTrigger className="w-full  items-center flex gap-2.5  border border-gray-200 rounded-[10px]">
                            <SelectValue placeholder="developer company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>developer company</SelectLabel>

                                {[
                                    "developer company",
                                    "developer company1",
                                    "developer company2",
                                ].map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                    {Array.from({ length: 6 }).map((_, i) => {
                        const property = filteredProperties[i]
                        return (
                            <NewDeveloprsCard
                                key={i}
                                type="developer"
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

export default NewdeveloperFilters