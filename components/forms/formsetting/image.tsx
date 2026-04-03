import React from 'react'
import { BsUpload } from "react-icons/bs";
const image = () => {
  return (
    <div> <div className="text-[16px] font-normal text-[#191B1F]">University Logo</div>
    
                    <div className="h-53 w-full border rounded-3xl border-dashed border-[#D0DFFE] bg-[#FAFCFF] flex items-center justify-center flex-col gap-2">
                        <BsUpload size={48} color="#99A1AF" />
                        <div className="mt-3 text-[#155DFC] text-[16px]">
                            Click to upload <span className="text-[#191B1F] text-[16px]">or drag and drop</span>
                        </div>
                        <div className="text-[#414A5B] text-[14px] text-center">PNG or JPG up to 10MB</div>
                    </div></div>
  )
}

export default image