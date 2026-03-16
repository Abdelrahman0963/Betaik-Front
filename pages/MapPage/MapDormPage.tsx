"use client"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { BiSearchAlt } from "react-icons/bi"
import Image from "next/image"
import { Plus } from "lucide-react"
import { useMapStore, LatLng } from "@/store/useMapStore"
import Link from "next/link"

const LocationMap = dynamic(() => import("../MapView/MapLocation"), { ssr: false })

const MapDormPage = () => {
    const [search, setSearch] = useState("")

    // Retrieve state from Zustand store
    const { 
        dorms, 
        activeDorm, 
        isDrawingMode, 
        location, 
        addDorm, 
        setActiveDorm, 
        setIsDrawingMode 
    } = useMapStore()

    // Required trick to stop hydration errors on initial load from localStorage persistence
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => { setIsMounted(true) }, [])

    // Helper to calculate the center of a newly drawn polygon
    const getPolygonCenter = (paths: LatLng[]) => {
        let latSum = 0;
        let lngSum = 0;
        paths.forEach(p => {
            latSum += p.lat;
            lngSum += p.lng;
        });
        return { lat: latSum / paths.length, lng: lngSum / paths.length };
    }

    const handlePolygonComplete = (paths: LatLng[]) => {
        const centroid = getPolygonCenter(paths);

        const newDorm = {
            name: "New Custom Dorm",
            area: "Custom Drawn Area",
            lat: centroid.lat,
            lng: centroid.lng,
            polygon: paths,
            image: "/0bbe65d2f4d689b1621c718572ae6e968ee20476.jpg", // placeholder
        };

        addDorm(newDorm);
    }

    const filteredDorms = dorms.filter((dorm) =>
        dorm.name.toLowerCase().includes(search.toLowerCase())
    )

    const markers = dorms.map(d => ({ lat: d.lat, lng: d.lng }));

    if (!isMounted) return null; // Wait for hydration before rendering

    return (
        <div className="flex flex-1 flex-col relative w-full h-full bg-[#FAFAFA]">
            
            {/* TOP HEADER */}
            <div className="flex items-start justify-between px-6 py-6 border-b border-gray-200 bg-white">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[28px] font-bold text-[#1A1A1A]">Map view</h1>
                        <p className="text-[15px] text-[#6B7280]">Manage dorm locations</p>
                    </div>

                    {/* ACTION BUTTONS (ADD UNIVERSITY & ADD DORMS) */}
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-[#8BAAFF] hover:bg-[#7298FF] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                            <Plus size={18} /> Add University
                        </button>
                        <Link 
                            href="/add-dorm"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors bg-[#155DFC] hover:bg-[#104ec8] text-white`}
                        >
                            <Plus size={18} /> Add dorms
                        </Link>
                    </div>
                </div>

                <Link href="#" className="bg-[#155DFC] hover:bg-[#104ec8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors mt-2">
                    Preview Map Layout
                </Link>
            </div>

            <div className="flex flex-1 flex-col gap-2 h-full">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6 h-full">
                    
                    <div className="flex items-start gap-5 flex-1 h-[calc(100vh-250px)]">

                        {/* MAP */}
                        <div className="flex w-[70%] h-full rounded-2xl overflow-hidden border border-gray-200">
                            <LocationMap
                                location={location}
                                markers={markers}
                                polygon={activeDorm ? activeDorm.polygon : []}
                                isDrawingMode={isDrawingMode}
                                onPolygonComplete={handlePolygonComplete}
                            />
                        </div>

                        {/* SIDEBAR */}
                        <div className="flex flex-col w-[30%] h-full bg-white border border-gray-200 rounded-2xl overflow-hidden">

                            {/* SEARCH */}
                            <div className="flex flex-col gap-4 w-full px-5 pt-5 pb-3">
                                <p className="text-[17px] font-bold text-[#1A1A1A]">Dorms</p>
                                <div className="w-full flex items-center border border-gray-200 rounded-[8px] bg-white px-3 py-2.5 shadow-sm">
                                    <BiSearchAlt className="text-[#9CA3AF] text-lg mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Dorms"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full focus:outline-none placeholder:text-[#9CA3AF] text-[14px]"
                                    />
                                </div>
                            </div>

                            {/* LIST */}
                            <div className="flex flex-col overflow-y-auto flex-1 px-5 pb-5 custom-scrollbar">

                                {filteredDorms.length === 0 && (
                                    <p className="text-center text-[#9CA3AF] py-10 text-sm">
                                        No dorms found
                                    </p>
                                )}

                                {filteredDorms.map((dorm, index) => {
                                    const isSelected = activeDorm === dorm;
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setActiveDorm(dorm)}
                                            className={`cursor-pointer flex items-center gap-3 py-4 border-b border-gray-100 last:border-0 transition-colors ${isSelected ? 'bg-blue-50/50 rounded-xl px-2 -mx-2' : 'hover:bg-gray-50'}`}
                                        >
                                            <Image
                                                src={dorm.image}
                                                alt={dorm.name}
                                                className="rounded-xl object-cover h-[70px] w-[70px] min-w-[70px]"
                                                width={70}
                                                height={70}
                                            />

                                            <div className="flex flex-col justify-center w-full min-w-0 pr-1 gap-0.5">
                                                <div className="flex items-start justify-between w-full">
                                                    <p className="text-[13.5px] font-semibold text-[#1A1A1A] truncate pr-2 leading-tight">
                                                        {dorm.name}
                                                    </p>
                                                    <div className="flex-shrink-0 bg-[#F3F4F6] p-1.5 rounded-full mt-0.5 relative group">
                                                        <Image
                                                            src="/icons/Location.svg"
                                                            alt="location"
                                                            width={10}
                                                            height={13}
                                                        />
                                                    </div>
                                                </div>

                                                <p className="text-[12px] text-[#6B7280] truncate leading-tight mt-0.5">
                                                    {dorm.area}
                                                </p>

                                                <p className="text-[11.5px] text-[#6B7280] font-medium mt-1.5">
                                                    342 views &nbsp;·&nbsp; 24 leads
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapDormPage