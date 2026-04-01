"use client"
import React, { useState } from 'react'
import { Search, ChevronDown, Calendar, Building2, CreditCard, MapPin, User, LogOut } from 'lucide-react'
import { DatePickerInput } from '@/components/ui/date-picker-input'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import jsPDF from "jspdf";
import "jspdf-autotable";

// Mock Data
const logsData = [
    {
        id: 1,
        action: "Ahmed Ali updated dorm location Sunset Hall",
        time: "2 hours ago",
        type: "dorm", // 'dorm', 'payment', 'map', 'user', 'archive'
    },
    {
        id: 2,
        action: "Sarah Johnson created new payment plan Spring 2026 Semester",
        time: "5 hours ago",
        type: "payment",
    },
    {
        id: 3,
        action: "Michael Chen updated campus map Main Campus",
        time: "1 day ago",
        type: "map",
    },
    {
        id: 4,
        action: "Emily Rodriguez changed password Account Settings",
        time: "2 days ago",
        type: "user",
    },
    {
        id: 5,
        action: "David Kim updated dorm capacity North Tower",
        time: "2 days ago",
        type: "user",
    },
    {
        id: 6,
        action: "Lisa Wang archived payment plan Fall 2025 Semester",
        time: "2 days ago",
        type: "payment", // or archive
    },
];

const getIconForType = (type: string) => {
    switch (type) {
        case 'dorm':
            return { icon: <Building2 size={16} className="text-[#8B5CF6]" />, bg: "bg-[#F3E8FF]" };
        case 'payment':
            return { icon: <CreditCard size={16} className="text-[#3B82F6]" />, bg: "bg-[#EFF6FF]" };
        case 'map':
            return { icon: <MapPin size={16} className="text-[#8B5CF6]" />, bg: "bg-[#F3E8FF]" };
        case 'user':
            return { icon: <User size={16} className="text-[#8B5CF6]" />, bg: "bg-[#F3E8FF]" };
        default:
            return { icon: <User size={16} className="text-[#8B5CF6]" />, bg: "bg-[#F3E8FF]" };
    }
}

const Logs = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [activityFilter, setActivityFilter] = useState('all')

    const filteredLogs = logsData.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = activityFilter === 'all' || log.type === activityFilter;
        return matchesSearch && matchesType;
    });



    const exportToPdf = () => {
        const doc = new jsPDF();
        doc.text("System Logs", 14, 15);

        const tableColumn = ["Action", "Time", "Type"];
        const tableRows = filteredLogs.map(log => [
            log.action,
            log.time,
            log.type
        ]);

        (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("System_Logs.pdf");
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-white pb-10">
            {/* Header Area */}
            <div className="flex flex-col gap-6 px-8 pt-10 lg:px-12 lg:pt-12">
                <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-3xl lg:text-[32px] font-bold text-[#1A1A1A] leading-tight">
                            Logs
                        </h1>
                        <p className="text-[15px] text-[#6B7280] font-medium">
                            Track system activity and user actions
                        </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 bg-[#155DFC] hover:bg-[#104ec8] transition-colors text-white px-5 py-2.5 rounded-lg font-semibold text-[14px]">
                                <LogOut size={18} className="rotate-[-90deg] -ml-1 mt-0.5" />
                                Export
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 bg-white shadow-lg rounded-lg border-[#E5E7EB]">
                            <DropdownMenuItem className="cursor-pointer font-medium py-2.5" >
                                Export as Excel
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer font-medium py-2.5" onClick={exportToPdf}>
                                Export as PDF
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row items-center gap-4 w-full mt-2">
                    <div className="relative w-full md:w-[45%]">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search size={18} className="text-[#9CA3AF]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by user name or action"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-[14px] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#155DFC] focus:ring-1 focus:ring-[#155DFC] transition-colors"
                        />
                    </div>
                    <div className="relative w-full md:w-[30%]">
                        <Select
                            defaultValue="all"
                            value={activityFilter}
                            onValueChange={setActivityFilter}
                        >
                            <SelectTrigger className="w-full h-[46px] bg-white border-[#E5E7EB] rounded-lg text-[14px] text-[#4B5563] focus:ring-1 focus:ring-[#155DFC] focus:ring-offset-0 focus:border-[#155DFC] data-[state=open]:border-[#155DFC] data-[state=open]:ring-1 data-[state=open]:ring-[#155DFC]">
                                <SelectValue placeholder="All Activities" />
                            </SelectTrigger>
                            <SelectContent className="bg-white rounded-lg shadow-lg border-[#E5E7EB]">
                                <SelectGroup className="p-1">
                                    <SelectItem
                                        value="all"
                                        className="text-[14px] font-medium py-2.5 px-3 cursor-pointer focus:bg-[#F3F6FF] focus:text-[#155DFC] data-[state=checked]:bg-[#F3F6FF] data-[state=checked]:text-[#155DFC] rounded-md transition-colors"
                                    >
                                        All Activities
                                    </SelectItem>
                                    <SelectItem
                                        value="dorm"
                                        className="text-[14px] font-medium py-2.5 px-3 cursor-pointer focus:bg-[#F3F6FF] focus:text-[#155DFC] data-[state=checked]:bg-[#F3F6FF] data-[state=checked]:text-[#155DFC] rounded-md transition-colors"
                                    >
                                        Dorm Updates
                                    </SelectItem>
                                    <SelectItem
                                        value="payment"
                                        className="text-[14px] font-medium py-2.5 px-3 cursor-pointer focus:bg-[#F3F6FF] focus:text-[#155DFC] data-[state=checked]:bg-[#F3F6FF] data-[state=checked]:text-[#155DFC] rounded-md transition-colors"
                                    >
                                        Payment Plan Updates
                                    </SelectItem>
                                    <SelectItem
                                        value="map"
                                        className="text-[14px] font-medium py-2.5 px-3 cursor-pointer focus:bg-[#F3F6FF] focus:text-[#155DFC] data-[state=checked]:bg-[#F3F6FF] data-[state=checked]:text-[#155DFC] rounded-md transition-colors"
                                    >
                                        Map Updates
                                    </SelectItem>
                                    <SelectItem
                                        value="user"
                                        className="text-[14px] font-medium py-2.5 px-3 cursor-pointer focus:bg-[#F3F6FF] focus:text-[#155DFC] data-[state=checked]:bg-[#F3F6FF] data-[state=checked]:text-[#155DFC] rounded-md transition-colors"
                                    >
                                        Account Activity
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Picker Component */}
                    <div className="relative w-full md:w-[25%] flex items-center justify-between">
                        <DatePickerInput />
                    </div>
                </div>
            </div>

            {/* List Table Area */}
            <div className="flex flex-col w-full px-8 lg:px-12 mt-8">
                {/* Table Header */}
                <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-t-xl px-6 py-4">
                    <p className="text-[13px] font-bold text-[#1A1A1A]">Student Name</p>
                </div>

                {/* Table Body (List) */}
                <div className="flex flex-col w-full border-x border-b border-[#E5E7EB] rounded-b-xl">
                    {filteredLogs.length === 0 && (
                        <div className="w-full py-12 flex items-center justify-center text-[#6B7280] text-sm">
                            No logs found matching your filters.
                        </div>
                    )}

                    {filteredLogs.map((log, index) => {
                        const { icon, bg } = getIconForType(log.type);
                        const isLast = index === filteredLogs.length - 1;

                        return (
                            <div
                                key={log.id}
                                className={`flex items-center justify-between px-6 py-5 ${!isLast ? 'border-b border-[#E5E7EB]' : ''} hover:bg-gray-50 transition-colors cursor-default`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg flex items-center justify-center ${bg}`}>
                                        {icon}
                                    </div>
                                    <p className="text-[14px] font-semibold text-[#1A1A1A] max-w-[500px] truncate leading-snug">
                                        {log.action}
                                    </p>
                                </div>
                                <p className="text-[13px] font-semibold text-[#4B5563]">
                                    {log.time}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Logs