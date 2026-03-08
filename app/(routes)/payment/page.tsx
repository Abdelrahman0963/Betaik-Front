import React from 'react'
import PaymentPlan from '@/app/pages/PaymentPlan/paymentPlan'
function Page() {
  return (
      <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between ">
                     <PaymentPlan />
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Page
