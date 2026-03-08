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
import { useState } from "react"
type TabType = "All" | "Active" | "Draft"
const DromsFilters = () => {
    const [searchText, setSearchText] = useState<string>("")
    const [activeTab, setActiveTab] = useState<TabType>("All")
    const [typeFilter, setTypeFilter] = useState<string>("Room Type")
    return (
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full'>
            <div className="flex flex-col w-full">
                <div className="flex gap-3">
                    {(["All", "Active", "Draft"] as TabType[]).map(
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
                    <Select onValueChange={setTypeFilter} value={typeFilter}>
                        <SelectTrigger className="w-full md:max-w-80 items-center flex gap-2.5  border border-gray-200 rounded-[10px]">
                            <SelectValue placeholder="Room Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Room Type</SelectLabel>

                                {[
                                    "Room Type",
                                    "Private",
                                    "Shared",
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
    )
}

export default DromsFilters
