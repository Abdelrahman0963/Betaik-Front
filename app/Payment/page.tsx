"use client";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
type TabType = "Active" | "Draft" | "Expired";
function Page() {
    const [activeTab, setActiveTab] = useState<TabType>("Active");
    return (
        <>
            <div>
                <div className=" container ml-14 mt-14">
                    <div className="flex flex-col gap-4">
                        <div className="w-55.75 h-11 font-medium text-[32px]">Payment Plans</div>
                        <div className="w-117.25 h-5 font-medium text-[16px] text-[#414A5B]">Manage all payment plans and special offers for your dorms.</div>
                        <div className="flex justify-between ">
                            <div className="w-52.75 h-9 flex gap-5 mt-5">
                                <div className={` cursor-pointer ${activeTab === "Active" ? "text-[#155DFC]" : "text-[#7F8595]"}`} onClick={() => setActiveTab("Active")}>
                                    Active
                                </div>
                                <div className={` cursor-pointer ${activeTab === "Draft" ? "text-[#155DFC]" : "text-[#7F8595]"}`} onClick={() => setActiveTab("Draft")}>
                                    Draft
                                </div>
                                <div className={` cursor-pointer ${activeTab === "Expired" ? "text-[#155DFC]" : "text-[#7F8595]"}`} onClick={() => setActiveTab("Expired")}>
                                    Expired
                                </div>
                            </div>
                            <div className="cursor-pointer w-61.5 h-12 items-center flex text-white gap-2.5 px-4 py-4 bg-[#155DFC] rounded-xl hover:bg-[#0F4BD8]">
                                <div className="text-[14px]">
                                    <FaPlus />
                                </div>
                                <div className="text-[16px] font-medium  ">Add New Payment Plan</div>
                            </div>
                        </div>
                    </div>
                    <div className="h-11 flex justify-between mt-9">
                        <div className="w-120 items-center flex gap-2.5 border border-gray-200 rounded-[10px]">
                            <div className="ml-4">
                                <BiSearchAlt className="text-[#7F8595]" />
                            </div>
                            <input type="text" placeholder="Search" className="w-full h-full focus:outline-none" />
                        </div>
                        <div className="flex justify-between w-[320px] items-center border border-gray-200 rounded-[10px] ">
                            <div className="text-[14px] font-normal ml-4 text-[#7F8595] ">All Statuses</div>
                            <MdOutlineKeyboardArrowDown className="text-[#7F8595] mr-4 text-[20px]" />
                        </div>
                        <div className="flex justify-between w-[320px] items-center border border-gray-200 rounded-[10px] ">
                            <div className="text-[14px] font-normal ml-4 text-[#7F8595] ">All Dorms</div>
                            <MdOutlineKeyboardArrowDown className="text-[#7F8595] mr-4 text-[20px]" />
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap mt-5">
                        <div className="w-[372.2001953125px] h-[357.00006103515625px] rounded-[10px] px-6 py-5 border border-gray-200 flex flex-col gap-4">
                            <div className="flex justify-between">
                                <div className="w-16.75 h-6 rounded-2xl  bg-[#ABEFC6] text-[#067647]  text-center text-[14px]">Active</div>
                                <HiOutlineDotsVertical className="text-[#7F8595] text-[20px] cursor-pointer" />
                            </div>
                            <div className="text-[16px] font-medium text-[#191B1F] ">Standard Housing Plan – Spring 2026</div>
                            <div className="border border-gray-200  w-full"></div>
                            <div className="flex flex-col gap-3 h-29 rounded-xl p-4 bg-[#D0DFFE]">
                                <div className="flex justify-between">
                                    <div className="text-[14px] font-medium text-[#414A5B]">Price:</div>
                                    <div className="text-[16px] font-medium text-[#101828] ">2,5557 EGP</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-[16px] font-medium text-[#414A5B]">Payment Frequency:</div>
                                    <div className="text-[14px] font-medium text-[#447DFD] ">semester</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-[14px] font-medium text-[#414A5B]">Installments:</div>
                                    <div className="text-[16px] font-medium text-[#101828] ">2 payments</div>
                                </div>
                            </div>
                            <div className="border border-gray-200 mt-2 w-full"></div>
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <CiCalendar className="text-[#7F8595] text-[15px] " />
                                    <div className="text-[12px] font-medium text-[#414A5B] ">Academic Term</div>
                                </div>
                                <div className="text-[14px] font-medium text-[##191B1F] ">Fall 2026</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <CiCalendar className="text-[#7F8595] text-[15px] " />
                                    <div className="text-[12px] font-medium text-[#414A5B] ">Valid From</div>
                                </div>
                                <div className="text-[14px] font-medium text-[##191B1F] ">Valid From</div>
                            </div>
                        </div>
                        <div className="w-[372.2001953125px] h-[357.00006103515625px] rounded-[10px]  border-2 border-dashed border-[#155DFC] px-6 py-5 flex flex-col gap-2 justify-center items-center">
                            <div className="w-13 h-13 rounded-[10px] bg-[#F2F2FE] flex  items-center justify-center">
                                <FaPlus className="text-[#7A73F4] text-[22px] cursor-pointer hover:text-[#7A9DE0] transition-colors duration-200" />
                            </div>
                            <div className=" mt-3 text-[16px] font-medium text-[#191B1F]">Create New Listing</div>
                            <div className="  text-[16px] font-medium text-[#606777]">Add a property to publish</div>
                            <div className="w-full h-10 bg-[#8AAEFE] py-2 rounded-[10px] text-center cursor-pointer text-[#FFFFFF] hover:bg-[#7A9DE0] transition-colors duration-200">
                                Post Property
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
