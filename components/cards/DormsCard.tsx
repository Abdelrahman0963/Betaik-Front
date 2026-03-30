import Link from "next/link"
import React from "react"
import { FiPlus } from "react-icons/fi"

type Props = {
    data: any
    isEmpty?: boolean
    onClick?: () => void
}

const DormsCard = ({ data, isEmpty, onClick }: Props) => {
    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 w-full h-80 p-2 rounded-2xl outline-dashed bg-white hover:bg-[#F2F2FE]/20 cursor-pointer outline-2 outline-[#739EFD]">
                <div className="flex items-center justify-center p-4 bg-[#F2F2FE] rounded-md">
                    <FiPlus className="text-[#7A73F4] text-2xl" />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-semibold">No property found</p>
                    <p className="text-sm text-gray-500">
                        Add a property to publish
                    </p>
                </div>

                <Link
                    href="/dorms-mgt/add-new-dorm"
                    className="cursor-pointer bg-[#8AAEFE] hover:bg-[#155DFC] text-sm py-2 px-4 rounded-md text-white text-center"
                >
                    Post Property
                </Link>
            </div>
        )
    }

    return (
        <div
            onClick={onClick}
            className="flex flex-col w-full h-80 bg-white border rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition"
        >
            {/* Image */}
            <div className="w-full h-40 bg-gray-100">
                {data?.image ? (
                    <img
                        src={data.image}
                        alt={data?.name}
                        className="w-full h-full object-cover"
                    />
                ) : null}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 p-4">
                <p className="text-sm font-semibold line-clamp-1">
                    {data?.name || "Dorm Name"}
                </p>

                <p className="text-xs text-gray-500 line-clamp-2">
                    {data?.location || "Dorm location"}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-semibold text-[#155DFC]">
                        {data?.price ? `${data.price} EGP` : ""}
                    </span>

                    {data?.gender && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {data.gender}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DormsCard

