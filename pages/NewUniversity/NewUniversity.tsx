import NewuniversityFilters from '@/components/Filters/NewuniversityFilters'
import Link from 'next/link'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

const NewUniversity = () => {
    return (
        <>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between ">
                            <div className="flex flex-col gap-6 w-full items-start justify-between">
                                <div className="flex flex-col md:flex-row  md:justify-between items-start w-full gap-2">
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-2xl font-semibold  tracking-tight md:text-3xl"> University Accounts Management</h1>
                                        <p className="text-muted-foreground">Manage university accounts and contracts</p>
                                    </div>

                                    <Link
                                        href="/newuniversity/newuni-form"
                                        className="inline-flex items-center gap-3 px-3  py-2 md:px-4 md:py-3 text-lg font-medium text-white bg-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-500 shadow-md hover:shadow-lg"
                                    >
                                        <nav className="flex items-center gap-2"> <FaPlus className='text-white text-sm' /> <p className='text-base'>Create University Account</p></nav>
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start gap-2 w-full">
                                    <NewuniversityFilters />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewUniversity