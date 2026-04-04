"use client";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { usePaymentStore } from "../../store/form";
import { GrCircleAlert } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import PaymentPlanCard from "@/components/cards/paymentcard";

type TabType = "Active" | "Draft" | "Expired";

function PaymentPlan() {
    const [activeTab, setActiveTab] = useState<TabType>("Active");
    const [showActions, setShowActions] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [planToDeleteIndex, setPlanToDeleteIndex] = useState<number | null>(null);

    const router = useRouter();
    const plans = usePaymentStore((state) => state.plans);
    const removePlan = usePaymentStore((state) => state.removePlan);
    const setEditingPlan = usePaymentStore((state) => state.setEditingPlan);

    const emptyCount = Math.max(6 - plans.length, 0);
    const cards = [...plans.map((p) => ({ type: "filled", data: p })), ...Array(emptyCount).fill({ type: "empty" })];

    const handleEdit = (plan: any) => {
        setEditingPlan(plan);
        router.push("/payment/paymentform");
    };

    const handleDelete = (index: number) => {
        setPlanToDeleteIndex(index);
        setShowDeleteModal(true);
        setShowActions(null);
    };

    const confirmDelete = () => {
        if (planToDeleteIndex !== null) {
            removePlan(planToDeleteIndex);
        }
        setShowDeleteModal(false);
        setPlanToDeleteIndex(null);
    };

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between ">
                        <div className="px-4 sm:px-6 lg:px-0">
                            {/* Header */}
                            <div className="flex flex-col gap-4">
                                <div className="text-2xl sm:text-3xl font-medium">Payment Plans</div>
                                <div className="text-sm sm:text-base font-medium text-[#414A5B]">Manage all payment plans and special offers for your dorms.</div>

                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-5">
                                    <div className="flex gap-5">
                                        {["Active", "Draft", "Expired"].map((tab) => (
                                            <div key={tab} className={`cursor-pointer ${activeTab === tab ? "text-[#155DFC]" : "text-[#7F8595]"}`} onClick={() => setActiveTab(tab as TabType)}>
                                                {tab}
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        className="cursor-pointer w-full lg:w-auto h-12 items-center justify-center flex text-white gap-2.5 px-6 bg-[#155DFC] rounded-xl hover:bg-[#0F4BD8]"
                                        onClick={() => router.push("/payment/paymentform")}>
                                        <FaPlus />
                                        <div className="font-medium">Add New Payment Plan</div>
                                    </div>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-col lg:flex-row gap-4 mt-9">
                                <div className="w-full lg:w-[500px] h-11 items-center flex gap-2.5 border border-gray-200 rounded-[10px]">
                                    <div className="ml-4">
                                        <BiSearchAlt className="text-[#7F8595]" />
                                    </div>
                                    <input type="text" placeholder="Search" className="w-full h-full focus:outline-none" />
                                </div>

                                {["All Statuses", "All Dorms"].map((text) => (
                                    <div key={text} className="flex justify-between w-full lg:w-[320px] h-11 items-center border border-gray-200 rounded-[10px]">
                                        <div className="text-[14px] ml-4 text-[#7F8595]">{text}</div>
                                        <MdOutlineKeyboardArrowDown className="text-[#7F8595] mr-4 text-[20px]" />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                                {cards.map((c, index) =>
                                    c.type === "empty" ? (
                                        <div
                                            key={index}
                                            className="w-full min-h-90 rounded-[10px] border-2 border-dashed border-[#155DFC] px-6 py-5 flex flex-col gap-2 justify-center items-center"
                                        >
                                            <div className="w-12 h-12 rounded-[10px] bg-[#F2F2FE] flex items-center justify-center">
                                                <FaPlus
                                                    onClick={() => router.push("/payment/paymentform")}
                                                    className="text-[#7A73F4] text-[22px] cursor-pointer hover:text-[#7A9DE0] transition-colors duration-200"
                                                />
                                            </div>

                                            <div className="mt-3 text-[16px] font-medium text-[#191B1F]">Create New Listing</div>
                                            <div className="text-[14px] text-[#606777]">Add a property to publish</div>

                                            <div className="w-full h-10 bg-[#8AAEFE] py-2 rounded-[10px] text-center cursor-pointer text-white hover:bg-[#7A9DE0] transition-colors duration-200">
                                                Post Property
                                            </div>
                                        </div>
                                    ) : (
                                        <PaymentPlanCard
                                            key={index}
                                            data={c.data}
                                            index={index}
                                            showActions={showActions}
                                            setShowActions={setShowActions}
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                        />
                                    )
                                )}
                            </div>
                            {/* Modal */}
                            {showDeleteModal && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
                                    <div className="bg-white p-6 w-full max-w-[384px] rounded-3xl flex flex-col justify-center items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#FEF3F2] flex justify-center items-center">
                                            <GrCircleAlert className="text-[#D92D20] text-[20px]" />
                                        </div>

                                        <div className="text-[20px] font-medium">Delete Offer</div>

                                        <div className="text-center text-[#4A5565]">Are you sure you want to delete? This action cannot be undone.</div>

                                        <div className="flex flex-col sm:flex-row gap-3 w-full mt-3">
                                            <button onClick={() => setShowDeleteModal(false)} className="w-full sm:w-1/2 px-4 py-2 bg-[#D1D5DC] rounded-[14px]">
                                                Cancel
                                            </button>

                                            <button onClick={confirmDelete} className="w-full sm:w-1/2 px-4 py-2 bg-[#FB2C36] text-white rounded-[14px]">
                                                Delete Offer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPlan;
