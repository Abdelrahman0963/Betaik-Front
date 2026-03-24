"use client"
import dynamic from 'next/dynamic'
const DormForm = dynamic(() => import('@/components/forms/DormForm'), { ssr: false })
const Dorms = () => {
    return (
        <>
            <div className="flex flex-1 flex-col w-full">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
                        <div className="px-4 lg:px-6 flex  flex-col gap-6  items-start w-full">
                            <div className="flex items-start">
                                <h1 className="text-md font-medium  tracking-tight md:text-3xl">Add New Dorm</h1>
                            </div>

                        </div>
                        <DormForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dorms
