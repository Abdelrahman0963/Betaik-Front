import React from "react";
import Images from "@/components/forms/formsetting/image";
import Name from "@/components/forms/formsetting/name";
import Email from "@/components/forms/formsetting/email";
import Password from "@/components/forms/formsetting/password";
function page() {
    return (
        <div>
            <div className="my-8 w-full max-w-289.5 px-4 sm:px-6 md:px-8 py-8 mx-auto border border-gray-300 rounded-3xl flex flex-col gap-2">
                <div className="text-[20px] font-medium text-[#191B1F]">University Informatio</div>
                <Images />

                <Name />

                <div className="mt-4 border border-gray-200 w-full"></div>

                <Email />

                <div className="mt-8 border border-gray-200 w-full"></div>

                <Password />
            </div>
        </div>
    );
}

export default page;
