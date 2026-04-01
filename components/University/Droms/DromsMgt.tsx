"use client"
import StudentsHousingFilters from "@/components/Filters/StudentsHousingFilters";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const DormsMgt = () => {
    return (
        <>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between ">
                            <div className="flex  flex-col gap-6 w-full items-start justify-between">
                                <div className="flex flex-col justify-between  items-start">
                                    <h1 className="text-2xl font-semibold  tracking-tight md:text-3xl">Dorms Management</h1>
                                    <p className="text-muted-foreground">Manage all payment plans and special offers for your dorms.</p>
                                </div>
                                <div className="flex md:flex-row flex-col items-start md:items-center md:gap-2 gap-4 justify-center md:justify-between mt-4 w-full">
                                    <div >
                                        <Tabs defaultValue="Student Housing" className="w-100">
                                            <TabsList>
                                                <TabsTrigger value="Student Housing">Student Housing</TabsTrigger>
                                                <Link href="/dorms-mgt/dorms" > <TabsTrigger value="Dorms">Dorms</TabsTrigger> </Link>
                                            </TabsList>
                                        </Tabs>
                                    </div>
                                    <Link href="/dorms-mgt/student-housing"
                                        className="inline-flex items-center gap-3 px-3  py-2 md:px-4 md:py-3 text-sm font-medium text-white bg-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-500 shadow-md hover:shadow-lg"
                                    ><FaPlus className='text-white text-sm' /> Add New Student Housing</Link>
                                </div>
                                <div className="flex flex-col items-start gap-2 w-full">
                                    <StudentsHousingFilters />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DormsMgt
