"use client"
import React, { useState } from 'react'
import { Search, ChevronDown, Calendar, Building2, CreditCard, MapPin, User, LogOut, Phone, MessageCircle } from 'lucide-react'
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

// Mock Data for Leads
const leadsData = [
    {
        id: 1,
        name: "Emma Williams",
        email: "michael.c@university.edu",
        compound: "Riverside Student Residences",
        property: "Riverside Student Residences",
        contactMethod: "Call",
        number: "01234567894",
        status: "Contacted",
        date: "3/31/2026"
    },
    {
        id: 2,
        name: "Emma Williams",
        email: "michael.c@university.edu",
        compound: "Riverside Student Residences",
        property: "Riverside Student Residences",
        contactMethod: "WhatsApp",
        number: "01234567894",
        status: "New",
        date: "3/31/2026"
    },
    {
        id: 3,
        name: "Emma Williams",
        email: "michael.c@university.edu",
        compound: "Riverside Student Residences",
        property: "Riverside Student Residences",
        contactMethod: "Call",
        number: "01234567894",
        status: "Contacted",
        date: "3/31/2026"
    },
    {
        id: 4,
        name: "Emma Williams",
        email: "michael.c@university.edu",
        compound: "Riverside Student Residences",
        property: "Riverside Student Residences",
        contactMethod: "WhatsApp",
        number: "01234567894",
        status: "New",
        date: "3/31/2026"
    },
    {
        id: 5,
        name: "Emma Williams",
        email: "michael.c@university.edu",
        compound: "Riverside Student Residences",
        property: "Riverside Student Residences",
        contactMethod: "Call",
        number: "01234567894",
        status: "Contacted",
        date: "3/31/2026"
    },
    {
        id: 6,
        name: "Emma Williams",
        email: "michael.c@university.edu",
        compound: "Riverside Student Residences",
        property: "Riverside Student Residences",
        contactMethod: "WhatsApp",
        number: "01234567894",
        status: "New",
        date: "3/31/2026"
    },
];

const Leads = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [dormFilter, setDormFilter] = useState('all')

    const filteredLeads = leadsData.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDorm = dormFilter === 'all' || lead.compound.includes(dormFilter);
        return matchesSearch && matchesDorm;
    });


    const exportToPdf = () => {
        const doc = new jsPDF();
        doc.text("Leads Management", 14, 15);

        const tableColumn = ["Name", "Compound", "Property", "Number", "Status", "Date"];
        const tableRows = filteredLeads.map(lead => [
            lead.name,
            lead.compound,
            lead.property,
            lead.number,
            lead.status,
            lead.date
        ]);

        (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("Leads_Management.pdf");
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-white pb-10">
            {/* Header Area */}
            <div className="flex flex-col gap-6 px-8 pt-10 lg:px-12 lg:pt-12">
                <div className="flex items-start justify-between w-full">
                    <h1 className="text-[32px] font-bold text-[#1A1A1A]">Leads Management</h1>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 bg-[#155DFC] hover:bg-[#104ec8] transition-colors text-white px-6 py-2.5 rounded-lg font-semibold text-[14px]">
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
                    {/* Search Input */}
                    <div className="relative w-full md:w-[60%]">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search size={18} className="text-[#9CA3AF]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 h-[46px] border border-[#E5E7EB] rounded-lg text-[14px] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#155DFC] focus:ring-1 focus:ring-[#155DFC] transition-colors"
                        />
                    </div>

                    {/* Dorm Filter */}
                    <div className="relative w-full md:w-[40%]">
                        <Select value={dormFilter} onValueChange={setDormFilter}>
                            <SelectTrigger className="w-full h-[46px] bg-white border-[#E5E7EB] rounded-lg text-[14px] text-[#4B5563] focus:ring-1 focus:ring-[#155DFC] focus:ring-offset-0 focus:border-[#155DFC]">
                                <SelectValue placeholder="All Dorms" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    <SelectItem value="all">All Dorms</SelectItem>
                                    <SelectItem value="Riverside">Riverside Student Residences</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Number of Leads Badge */}
                <div className="flex items-center gap-2 bg-[#EBF2FF] text-[#155DFC] px-4 py-1.5 rounded-full w-fit">
                    <User size={16} />
                    <span className="text-[14px] font-semibold">Number of leads {filteredLeads.length}</span>
                </div>
            </div>

            {/* List Table Area */}
            <div className="flex flex-col w-full px-8 lg:px-12 mt-8">
                {/* Table Header */}
                <div className="grid grid-cols-[1.5fr_1.2fr_1.2fr_1fr_1fr_0.8fr_0.7fr] w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-t-xl px-6 py-4 items-center">
                    <p className="text-[13px] font-bold text-[#1A1A1A]">Student Name</p>
                    <p className="text-[13px] font-bold text-[#1A1A1A]">Compound</p>
                    <p className="text-[13px] font-bold text-[#1A1A1A]">Property</p>
                    <p className="text-[13px] font-bold text-[#1A1A1A]">Contact Method</p>
                    <p className="text-[13px] font-bold text-[#1A1A1A]">Number</p>
                    <p className="text-[13px] font-bold text-[#1A1A1A] text-center">Status</p>
                    <p className="text-[13px] font-bold text-[#1A1A1A] text-right">date</p>
                </div>

                {/* Table Body */}
                <div className="flex flex-col w-full border-x border-b border-[#E5E7EB] rounded-b-xl overflow-hidden">
                    {filteredLeads.length === 0 ? (
                        <div className="w-full py-12 flex items-center justify-center text-[#6B7280] text-sm">
                            No leads found matching your filters.
                        </div>
                    ) : (
                        filteredLeads.map((lead, index) => {
                            const isLast = index === filteredLeads.length - 1;
                            return (
                                <div
                                    key={lead.id}
                                    className={`grid grid-cols-[1.5fr_1.2fr_1.2fr_1fr_1fr_0.8fr_0.7fr] items-center px-6 py-5 ${!isLast ? 'border-b border-[#E5E7EB]' : ''} hover:bg-gray-50 transition-colors`}
                                >
                                    {/* Student Name */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center text-[#8B5CF6]">
                                            <User size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[14px] font-bold text-[#1A1A1A]">{lead.name}</p>
                                            <p className="text-[12px] text-[#6B7280] font-medium">{lead.email}</p>
                                        </div>
                                    </div>

                                    {/* Compound */}
                                    <p className="text-[13px] font-semibold text-[#1A1A1A] pr-4">{lead.compound}</p>

                                    {/* Property */}
                                    <p className="text-[13px] font-semibold text-[#1A1A1A] pr-4">{lead.property}</p>

                                    {/* Contact Method */}
                                    <div>
                                        {lead.contactMethod === "Call" ? (
                                            <button className="flex items-center gap-2 border border-[#DBEAFE] text-[#155DFC] px-3 py-1.5 rounded-lg text-[13px] font-bold hover:bg-[#EBF2FF] transition-colors">
                                                <Phone size={14} /> Call
                                            </button>
                                        ) : (
                                            <button className="flex items-center gap-2 border border-[#DCFCE7] text-[#10B981] px-3 py-1.5 rounded-lg text-[13px] font-bold hover:bg-[#F0FDF4] transition-colors">
                                                <MessageCircle size={14} /> WhatsApp
                                            </button>
                                        )}
                                    </div>

                                    {/* Number */}
                                    <p className="text-[13px] font-bold text-[#1A1A1A]">{lead.number}</p>

                                    {/* Status */}
                                    <div className="flex justify-center">
                                        <span className={`px-4 py-1 rounded-full text-[12px] font-bold ${lead.status === "New"
                                                ? "bg-[#EBF2FF] text-[#155DFC]"
                                                : "bg-[#F3F4F6] text-[#6B7280]"
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center justify-end gap-1.5 text-[#6B7280]">
                                        <Calendar size={14} />
                                        <p className="text-[13px] font-semibold">{lead.date}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leads;