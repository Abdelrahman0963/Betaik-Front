"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import React, { useState } from 'react'

type TabType = "Active" | "Draft" | "Expired";

const DormsMgt = () => {
    const [activeTab, setActiveTab] = useState<TabType>("Active");
    return (
        <>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between ">
                            <div className="flex  flex-col gap-6 w-full items-start justify-between">
                                <div className="flex flex-col justify-between  items-start">
                                    <h1 className="text-md font-semibold  tracking-tight md:text-3xl">Dorms Management</h1>
                                    <p className="text-muted-foreground">Manage all payment plans and special offers for your dorms.</p>
                                </div>
                                <div className="flex md:flex-row flex-col items-start md:items-center gap-2 justify-center md:justify-between mt-4 w-full">
                                    <div >
                                        <Tabs defaultValue="account" className="w-100">
                                            <TabsList>
                                                <TabsTrigger value="account">Student Housing</TabsTrigger>
                                                <TabsTrigger value="password">Dorms</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    </div>

                                    <Link href="/paymentPlan" className="sm:px-4 sm:text-[1rem] text-sm px-2 py-1  cursor-pointer flex items-center gap-3 font-light text-white rounded-lg bg-[#155DFC] hover:bg-[#8AAEFE]"><span className="text-2xl">+</span> Add Payment Plan</Link>

                                </div>
                                <div className="flex flex-col items-start gap-2">
                                    <div className="w-52.75 h-9 flex gap-5 mt-5">
                                        <div className={` text-sm cursor-pointer ${activeTab === "Active" ? "text-[#155DFC] bg-gray-100 rounded-2xl px-3 py-2" : "text-[#7F8595] px-3 py-2"}`} onClick={() => setActiveTab("Active")}>
                                            Active
                                        </div>
                                        <div className={` text-sm cursor-pointer ${activeTab === "Draft" ? "text-[#155DFC] bg-gray-100 rounded-2xl px-3 py-2" : "text-[#7F8595] px-3 py-2"}`} onClick={() => setActiveTab("Draft")}>
                                            Draft
                                        </div>
                                        <div className={` text-sm cursor-pointer ${activeTab === "Expired" ? "text-[#155DFC] bg-gray-100 rounded-2xl px-3 py-2" : "text-[#7F8595] px-3 py-2"}`} onClick={() => setActiveTab("Expired")}>
                                            Expired
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DormsMgt
