"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiPlus, FiMoreVertical } from 'react-icons/fi'
import CardCreatePopup from '../popupCards/cardCreatePopup'
import { LuCalendarDays } from 'react-icons/lu'


type Props = {
    type: "university" | "developer"
    data: any
    isEmpty?: boolean
    onClick?: () => void
}

const isValidUrl = (url: string | undefined | null): boolean => {
    if (!url) return false;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const NewDeveloprsCard = ({ type, data, isEmpty, onClick }: Props) => {
    const [showPopup, setShowPopup] = useState(false);
    const imgSrc = isValidUrl(data?.imgUrl) ? data.imgUrl : "/emptyLogo.svg";

    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 w-full h-80 p-2 rounded-2xl outline-dashed bg-white hover:bg-[#F2F2FE]/20 cursor-pointer outline-2 outline-[#739EFD]">
                <div className="flex items-center justify-center p-4 bg-[#F2F2FE] rounded-md">
                    <FiPlus className="text-[#7A73F4] text-2xl" />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-semibold">Create developer company accounts</p>
                    <p className="text-sm text-gray-500">
                        Get started by creating your first company accounts
                    </p>
                </div>

                <Link
                    href={type === "university" ? "/newuniversity/newuni-form" : "/newdeveloper/newdev-form"}
                    className="cursor-pointer bg-[#8AAEFE] hover:bg-[#155DFC] text-sm py-2 px-4 rounded-md text-white text-center"
                >
                    Create Company
                </Link>
            </div>
        )
    }
    return (
        <div
            onClick={onClick}
            className="flex flex-col w-full h-80 bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-md transition justify-between"
        >
            <div className="flex items-center justify-between w-full">
                <span className="px-4 py-1.5 bg-[#E8F8F0] text-[#1D9957] border border-[#B3ECCB] text-sm font-medium rounded-full">
                    {data?.status || 'Active'}
                </span>
                <button
                    className="text-gray-500 hover:text-gray-700 z-10 cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setShowPopup(true); }}
                >
                    <FiMoreVertical size={20} />
                </button>
            </div>
            <div className="w-full h-px bg-gray-50 my-2"></div>

            <div className="flex flex-col items-center justify-center  bg-[#F4F8FE] rounded-2xl gap-3 p-4">
                <div className="w-[66px] h-[66px] bg-white rounded-full flex items-center justify-center border border-blue-100 shadow-sm p-2 overflow-hidden">
                    <Image
                        src={imgSrc}
                        alt={data?.fullName || data?.name || 'Unknown'}
                        className="w-full h-full object-contain rounded-full"
                        loading="lazy"
                        width={100}
                        height={100}
                    />
                </div>
                <h3 className="font-bold text-[17px] text-gray-900 text-center">
                    {data?.fullName || data?.name || 'Unknown'}
                </h3>
            </div>

            <div className="w-full h-px bg-gray-50 my-2"></div>

            <div className="flex items-center justify-between w-full text-[15px]">
                <div className="flex items-center text-gray-600 gap-2">
                    <LuCalendarDays size={18} />
                    <span className="font-normal text-sm">Contract Expiry Date</span>
                </div>
                <span className="font-bold text-gray-900">
                    {data?.contractExpiryDate || '2027-02-15'}
                </span>
            </div>

            {showPopup && (
                <div
                    className="fixed  inset-0 z-50 flex items-center justify-center bg-black/50 cursor-default "
                    onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <CardCreatePopup data={data} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewDeveloprsCard