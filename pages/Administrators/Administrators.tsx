"use client"
import dynamic from "next/dynamic"
import Image from 'next/image'
import React from 'react'
const AdminForm = dynamic(() => import('@/components/forms/AdminForm'), { ssr: false })
const Administrators = () => {
    const [open, setOpen] = React.useState(false)
    return (
        <div className="flex flex-1 flex-col relative">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6 ">
                    <div className="flex md:flex-row flex-col gap-6 w-full items-center justify-between">
                        <div className="flex md:flex-row flex-col gap-6 w-full items-start md:justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-lg font-semibold tracking-tight md:text-3xl">
                                    Administrators
                                </h1>
                                <p className="text-muted-foreground">
                                    Manage university administrators
                                </p>
                            </div>
                            <button onClick={() => setOpen(true)} className="bg-[#155DFC] cursor-pointer hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium">
                                <span className="text-xl">+</span>
                                Add Sub Admin
                            </button>
                        </div>
                    </div>
                    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr className="text-left">
                                    <th className="px-6 py-3 font-medium">Name</th>
                                    <th className="px-6 py-3 font-medium">Email</th>
                                    <th className="px-6 py-3 font-medium">Role</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white ">
                                <tr className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900  flex items-center gap-2">
                                        <Image src="/Porfile.jpg" loading='lazy' width={40} height={40} alt="Profile Picture" className="rounded-full " />
                                        John Doe
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        UcX2S@example.com
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700">
                                            Admin
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs rounded-md bg-green-100 text-green-700">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="cursor-pointer  hover:underline text-sm">
                                            <Image src="/icons/delete.svg" loading='lazy' width={15} height={16.67} alt="action icon" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {open && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div
                                onClick={() => setOpen(false)}
                                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            />
                            <div className="relative z-10">
                                <AdminForm close={() => setOpen(false)} />
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Administrators