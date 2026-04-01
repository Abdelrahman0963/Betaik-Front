import ChangePassword from "@/components/forms/ChangePassword";
import { Pattern } from "@/components/patterns/p-file-upload-4";
import React from "react";


function Settings() {
    return (
        <div>
            <div className="my-8 w-full max-w-289.5 px-4 sm:px-6 md:px-8 py-8 mx-auto border border-gray-300 rounded-3xl flex flex-col gap-2">
                <div className="text-[20px] font-medium text-[#191B1F]">University Informatio</div>
                <div className="text-[16px] font-normal text-[#191B1F]">University Logo</div>
                <Pattern />
                <div className="mt-4 text-[16px] font-medium text-[#191B1F]">University Name</div>
                <textarea
                    className="w-full h-12 border border-[#D0DFFE] rounded-[10px] bg-[#FAFCFF] text-[#3D414D] px-4 py-2 resize-none focus:outline-none"
                    placeholder="Stanford University"></textarea>

                <div className="mt-4 text-[16px] font-medium text-[#191B1F]">Area</div>
                <textarea
                    placeholder="Enter Area"
                    className="resize-none w-full h-20 border border-[#D0DFFE] rounded-[10px] bg-[#FAFCFF] text-[#3D414D] py-3 px-4 placeholder:text-[#9CA3AF]"></textarea>

                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
                    <div className="w-full sm:w-38 h-12 border border-gray-200 cursor-pointer text-[#191B1F] flex items-center justify-center text-[16px] rounded-[14px]">Cancel</div>
                    <div className="w-full sm:w-38 h-12 cursor-pointer hover:bg-[#155DFC]/90 bg-[#155DFC] text-white flex items-center justify-center text-[16px] rounded-[14px]">Save Change</div>
                </div>

                <div className="mt-4 border border-gray-200 w-full"></div>

                <div className="mt-3 text-[20px] font-medium text-[#191B1F]">Account Information</div>

                <div className="mt-4 text-[16px] font-medium text-[#191B1F]">Full Name</div>
                <textarea className="w-full h-12 border border-[#D0DFFE] rounded-[10px] bg-[#FAFCFF] text-[#3D414D] px-4 py-2 resize-none focus:outline-none" placeholder="John Smith"></textarea>

                <div className="mt-5 text-[16px] font-medium text-[#191B1F]">Email</div>
                <textarea
                    className="w-full h-12 border border-[#D0DFFE] rounded-[10px] bg-[#FAFCFF] text-[#3D414D] px-4 py-2 resize-none focus:outline-none"
                    placeholder="john.smith@stanford.edu"></textarea>

                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
                    <div className="w-full sm:w-38 h-12 border border-gray-200 cursor-pointer text-[#191B1F] flex items-center justify-center text-[16px] rounded-[14px]">Cancel</div>
                    <div className="w-full sm:w-38 h-12 cursor-pointer hover:bg-[#155DFC]/90 bg-[#155DFC] text-white flex items-center justify-center text-[16px] rounded-[14px]">Save Change</div>
                </div>

                <div className="mt-8 border border-gray-200 w-full"></div>

                <ChangePassword />
            </div>
        </div>
    );
}

export default Settings;
