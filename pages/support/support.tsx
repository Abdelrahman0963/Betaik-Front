"use client";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";
function Page() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Select a subject");
    const options = ["Technical Issue", "Account Issue", "Payment Issue", "Other Issue"];
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    return (
        <>
            <div className="flex flex-col">
                <div className="px-4 sm:px-6 md:px-0 ml-4 lg:ml-6 mt-4 md:mt-6">
                    <div className="text-[#101828] text-[28px] sm:text-[32px] md:text-[36px] font-medium">Support</div>
                    <div className="text-[#344054] text-[16px] sm:text-[18px] md:text-[20px] mt-2">Contact our team for assistance</div>
                </div>

                <div className="w-full md:w-208.5 min-h-156 mx-auto my-8 border border-[#E4E7EC] rounded-lg p-4 sm:p-5">
                    <div className="text-[#344054] text-[16px] font-medium mb-4">Placeholder Options</div>

                    <div className="w-full relative">
                        <div onClick={() => setOpen(!open)} className="cursor-pointer w-full h-12 border border-[#E4E7EC] rounded-lg mb-4 flex items-center justify-between py-2.5 px-3.5">
                            <div className="text-[#667085] text-[16px] p-2 font-normal">{selected}</div>

                            <MdKeyboardArrowDown className={`text-[#667085] text-[20px] transition-transform ${open ? "rotate-180" : ""}`} />
                        </div>

                        {open && (
                            <div className="absolute top-14 left-0 h-42 w-full flex flex-col px-5 rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white z-10">
                                {options.map((option, index) => {
                                    const isSelected = selected === option;

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setSelected(option);
                                                setOpen(false);
                                            }}
                                            className={`flex items-center justify-between text-[16px] w-full font-medium cursor-pointer rounded-md px-2 py-2
                                        ${isSelected ? "text-[#155DFC]" : "text-[#181D27]"}
                                        hover:bg-[#F3F7FF] hover:text-[#155DFC]`}>
                                            <span>{option}</span>

                                            {isSelected && <IoCheckmark className="text-[#155DFC] text-[18px]" />}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="mt-12 md:mt-60 text-[#344054] text-[16px] font-medium mb-4">Placeholder Options</div>

                    <div className="h-38.5 border border-[#E4E7EC] rounded-lg px-3.5 py-2.5">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Describe your issue in detail.."
                            className="w-full h-full resize-none outline-none text-[#101828] text-[16px] placeholder:text-[#717680]"
                        />
                    </div>

                    <div
                        onClick={() => {
                            if (!message.trim()) return; 
                            setShowModal(true);
                            setMessage(""); 
                        }}
                        className={`mt-6 w-full h-12 rounded-lg flex items-center justify-center transition
    ${message.trim() ? "bg-[#155DFC] cursor-pointer hover:bg-[#155DFC]/90" : "bg-[#155DFC]/50 cursor-not-allowed"}`}>
                        <div className="text-white text-[16px] font-medium">Submit Request</div>
                    </div>
                </div>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
                        <div className="bg-white p-6 w-full max-w-100 h-66 rounded-3xl flex flex-col justify-center items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#D1FADF] flex justify-center items-center">
                                <LuCircleCheckBig className="text-[#D92D20] text-[20px]" />
                            </div>

                            <div className="text-[18px] text-[#181D27] font-semibold">Request Sent</div>

                            <div className="text-center text-[14px] text-[#535862]">Your request has been submitted successfully. Our team will contact you shortly.</div>

                            <button onClick={() => setShowModal(false)} className="w-full bg-[#155DFC] text-white px-4 py-2 hover:bg-[#155DFC]/90 rounded-[14px]">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Page;
