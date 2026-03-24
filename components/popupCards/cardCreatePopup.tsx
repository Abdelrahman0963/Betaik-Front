import Image from 'next/image'
import React from 'react'
import { FiMoreVertical } from 'react-icons/fi'
type Props = {
    data: any
}
const CardCreatePopup = ({ data }: Props) => {
    const [showPopup, setShowPopup] = React.useState(false);
    return (
        <div className='bg-white p-6 rounded-lg shadow-lg w-[372px]'>
            <div className='flex flex-col gap-4'>
                <div className="flex items-center justify-between w-full">
                    <span className="px-4 py-1.5 bg-[#E8F8F0] text-[#1D9957] border border-[#B3ECCB] text-sm font-medium rounded-full">
                        {data?.status || 'Unknown'}
                    </span>
                    <div className="relative">
                        <button onClick={() => setShowPopup(!showPopup)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                            <FiMoreVertical size={20} />
                        </button>
                        
                        {showPopup && (
                            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10 flex flex-col overflow-hidden">
                                <button className="px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors w-full cursor-pointer">
                                    Update
                                </button>
                                <button className="px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors w-full cursor-pointer">
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <p className='text-lg font-medium'>{data?.fullName || data?.name || 'Unknown'}</p>
                <div className="w-full h-px bg-gray-200"></div>
                <div className="flex flex-col items-center gap-3 bg-[#D0DFFE] px-2 py-3 rounded-2xl">
                    <div className="flex items-center justify-between w-full ">
                        <p className="text-sm text-gray-700 font-normal">Contract Duration:</p>
                        <p className="text-sm text-gray-700 font-normal">{data?.developerContract?.duration || '-'}</p>
                    </div>
                    <div className="flex items-center justify-between w-full ">
                        <p className="text-sm text-gray-700 font-normal">Compounds Limit:</p>
                        <p className="text-sm text-gray-700 font-normal">{data?.developerContract?.compoundLimits || 0}</p>
                    </div>
                    <div className="flex items-center justify-between w-full ">
                        <p className="text-sm text-gray-700 font-normal">Properties Limit:</p>
                        <p className="text-sm text-gray-700 font-normal">{data?.developerContract?.propertiesLimits || 0}</p>
                    </div>
                    <div className="flex items-center justify-between w-full ">
                        <p className="text-sm text-gray-700 font-normal">payment Limit:</p>
                        <p className="text-sm text-gray-700 font-normal">{data?.developerContract?.paymentPlanLimits || 0}</p>
                    </div>
                    <div className="flex items-center justify-between w-full ">
                        <p className="text-sm text-gray-700 font-normal">Offers Limit:</p>
                        <p className="text-sm text-gray-700 font-normal">{data?.developerContract?.offersLimits || 0}</p>
                    </div>
                    <div className="flex items-center justify-between w-full ">
                        <p className="text-sm text-gray-700 font-normal">new launches Limit:</p>
                        <p className="text-sm text-gray-700 font-normal">{data?.developerContract?.launchesLimits || 0}</p>
                    </div>
                </div>
                <div className="w-full h-px bg-gray-200"></div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-start gap-1">
                        <Image src="/icons/calendar.svg" alt="calendar" width={16} height={16} />
                        <p className="text-sm text-gray-700 font-normal">Contract Expiry Date:</p>
                    </div>
                    <p className="text-sm text-gray-700 font-normal">{data?.contractExpiryDate}</p>
                </div>
            </div>
        </div>
    )
}

export default CardCreatePopup