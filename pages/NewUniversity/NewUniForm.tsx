"use client"
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import AddUniForm from "@/components/forms/AddUniForm";

const NewUniForm = () => {
    const router = useRouter()
    return (
        <>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between ">
                            <div className="flex flex-col gap-8 w-full items-start justify-between">
                                <div className="flex flex-col md:flex-row  md:justify-between  items-center w-full gap-2">
                                    <div className="flex flex-col items-start gap-6">
                                        <button onClick={() => router.back()} className='flex items-center cursor-pointer justify-center gap-0.5'> <MdArrowBackIos className='text-xl md:text-2xl' /> <span className='text-xl md:text-2xl'>Back</span></button>
                                        <h3 className="text-xl font-medium  tracking-tight ">Create University Account</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-2 w-full">
                                    <AddUniForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewUniForm