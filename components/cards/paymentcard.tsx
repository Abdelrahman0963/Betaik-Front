"use client";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

type PaymentPlanType = {
    planName: string;
    price: string;
    frequency: string;
    installments: string;
    term: string;
    validFrom: string;
    status: "active" | "draft";
};

interface Props {
    data: PaymentPlanType;
    index: number;
    showActions: number | null;
    setShowActions: (index: number | null) => void;
    handleEdit: (plan: PaymentPlanType) => void;
    handleDelete: (index: number) => void;
}

export default function PaymentPlanCard({ data, index, showActions, setShowActions, handleEdit, handleDelete }: Props) {
    return (
        <div className="w-full min-h-[360px] rounded-[10px] px-6 py-5 border border-gray-200 flex flex-col gap-4 relative">
            <div className="flex justify-between">
                <div>
                    {data.status === "active" ? (
                        <div className="px-3 h-6 rounded-2xl bg-[#ABEFC6] text-[#067647] text-[14px] flex items-center justify-center">Active</div>
                    ) : (
                        <div className="px-3 h-6 rounded-2xl bg-[#F3F4F6] text-[#606777] text-[14px] flex items-center justify-center">Draft</div>
                    )}
                </div>

                <div className="relative">
                    <HiOutlineDotsVertical className="text-[#7F8595] text-[20px] cursor-pointer" onClick={() => setShowActions(showActions === index ? null : index)} />

                    {showActions === index && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-20 p-3">
                            <div onClick={() => handleEdit(data)} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
                                <FaRegEdit />
                                <span>Edit</span>
                            </div>

                            <div onClick={() => handleDelete(index)} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-[#DC2626]">
                                <FaRegTrashAlt />
                                <span>Delete</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-[16px] font-medium text-[#191B1F]">{data.planName}</div>

            <div className="border border-gray-200 w-full"></div>

            <div className="flex flex-col gap-3 rounded-xl p-4 bg-[#D0DFFE]">
                <div className="flex justify-between">
                    <div className="text-[14px] text-[#414A5B]">Price:</div>
                    <div className="font-medium">{data.price}</div>
                </div>

                <div className="flex justify-between">
                    <div className="text-[14px] text-[#414A5B]">Payment Frequency:</div>
                    <div className="text-[#447DFD]">{data.frequency}</div>
                </div>

                <div className="flex justify-between">
                    <div className="text-[14px] text-[#414A5B]">Installments:</div>
                    <div className="font-medium">{data.installments}</div>
                </div>
            </div>

            <div className="border border-gray-200 mt-2 w-full"></div>

            <div className="flex justify-between text-sm">
                <div className="flex gap-2 items-center">
                    <CiCalendar />
                    Academic Term
                </div>
                <div>{data.term}</div>
            </div>

            <div className="flex justify-between text-sm">
                <div className="flex gap-2 items-center">
                    <CiCalendar />
                    Valid From
                </div>
                <div>{data.validFrom}</div>
            </div>
        </div>
    );
}
