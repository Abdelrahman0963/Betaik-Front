import React from "react"
import { FiPlus } from "react-icons/fi"
import Link from "next/link"
import Image from "next/image"
import { CiLocationOn } from "react-icons/ci"

type Props = {
    data?: any
    isEmpty?: boolean
    onClick?: () => void
    showCheckbox?: boolean
    checked?: boolean
    onCheckChange?: (val: boolean) => void
}

const StudentHousingCard = ({
    data,
    isEmpty = false,
    onClick,
    showCheckbox = false,
    checked = false,
    onCheckChange,
}: Props) => {
    const GenderColor = (gender: string) => {
        if (gender === "Male and  Female Dorms")
            return { color: "#7A73F4", bg: "rgba(122, 115, 244, 0.1) ", border: "#7A73F4" }
        if (gender === "Male Dorms Only")
            return { color: "#155DFC", bg: "rgba(21, 93, 252, 0.1)", border: "#155DFC" }
        if (gender === "Female Dorms Only")
            return { color: "#C11574", bg: "rgba(193, 21, 116, 0.1)", border: "#C11574" }
        return { color: "#000000", bg: "rgba(0, 0, 0, 0.1)", border: "#000000" }
    }

    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 w-full h-80 p-2 rounded-2xl outline-dashed bg-white hover:bg-[#F2F2FE]/20 cursor-pointer outline-2 outline-[#739EFD]">
                <div className="flex items-center justify-center p-4 bg-[#F2F2FE] rounded-md">
                    <FiPlus className="text-[#7A73F4] text-2xl" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-semibold">No property found</p>
                    <p className="text-sm text-gray-500">Add a property to publish</p>
                </div>
                <Link
                    href="/dorms-mgt/student-housing"
                    className="cursor-pointer bg-[#8AAEFE] hover:bg-[#155DFC] text-sm py-2 px-4 rounded-md text-white text-center"
                >
                    Post Property
                </Link>
            </div>
        )
    }

    return (
        <div
            className="w-full h-80 bg-white rounded-2xl cursor-pointer shadow-lg relative"
            style={{ width: showCheckbox ? "280.33px" : "100%", height: showCheckbox ? "255px" : "320px" }}
            onClick={onClick}
        >
            <Image
                src="/Frame 1984080316.png"
                alt="property"
                width={500}
                height={600}
                className="w-full h-45 object-fill rounded-t-2xl"
                style={{ width: showCheckbox ? "280.33px" : "100%", height: showCheckbox ? "137px" : "180px" }}
            />

            {showCheckbox && onCheckChange && (
                <nav className="absolute top-2 right-2 bg-white/80   p-2 rounded-full flex items-center justify-center">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onCheckChange(e.target.checked)}
                        className="w-4 h-4 aspect-square cursor-pointer accent-blue-600 border border-gray-300   rounded-full"
                    />
                </nav>
            )}

            <div style={{ padding: showCheckbox ? "10px" : "20px" }} className="px-6 py-4 flex flex-1 flex-col w-full">
                <div className="flex items-center justify-between w-full">
                    <h3 className={`font-semibold`} style={{ fontSize: showCheckbox ? "12.22px" : "18px" }}>{data?.name}</h3>
                    <img src="/Frame 1984080340.png" alt="logo" style={{ width: showCheckbox ? "30px" : "40px", height: showCheckbox ? "30px" : "40px" }} className="object-contain" />
                </div>

                <div className="flex items-center gap-1">
                    <CiLocationOn className="text-blue-600" />
                    <p className="text-sm text-gray-500">{data?.area || "Unknown"}</p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div style={{ height: showCheckbox ? "0.5px" : "1px" }} className="w-full mt-2 bg-gray-300"></div>
                    <div >
                        <span
                            className="text-sm rounded-full px-4 py-2"
                            style={{
                                color: GenderColor(data?.gender).color,
                                backgroundColor: GenderColor(data?.gender).bg,
                                border: `1px solid ${GenderColor(data?.gender).border}`,
                                padding: showCheckbox ? "4px 6px" : "8px 16px"
                            }}
                        >
                            {data?.gender}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentHousingCard