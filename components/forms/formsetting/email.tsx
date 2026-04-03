import React from 'react'

function email() {
  return (
      <div>
          {" "}
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
      </div>
  );
}

export default email