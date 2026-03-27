"use client"
import dynamic from "next/dynamic"
import Image from 'next/image'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAdministrators } from '@/services/AuthApi'
const AdminForm = dynamic(() => import('@/components/forms/AdminForm'), { ssr: false })
const Administrators = () => {
    const [open, setOpen] = React.useState(false)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["administrators"],
        queryFn: getAdministrators
    });
    const admins = Array.isArray(data?.data?.administrators)
        ? data.data.administrators
        : [];
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
                    <div className="w-full overflow-auto rounded-2xl border border-gray-200 bg-white">
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
                            <tbody className="divide-y divide-white">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading administrators...</td>
                                    </tr>
                                ) : isError ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-red-500">
                                            Failed to load data. {(error as any)?.message}
                                        </td>
                                    </tr>
                                ) : admins.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No administrators found.</td>
                                    </tr>
                                ) : (
                                    admins.map((admin: any, index: number) => (
                                        <tr key={admin?.id || index} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                                {admin?.profilePicture ? (
                                                    // لو فيه صورة بروفايل اعرضها
                                                    <Image
                                                        src={admin.profilePicture}
                                                        loading="lazy"
                                                        width={40}
                                                        height={40}
                                                        alt="Profile"
                                                        className="rounded-full h-10 w-10 object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm uppercase">
                                                        {admin?.name ? admin.name.substring(0, 2) : "NA"}
                                                    </div>
                                                )}

                                                <span className="truncate max-w-[150px]">
                                                    {admin?.name || "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {admin?.email || "N/A"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700">
                                                    {admin?.role || "Admin"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs rounded-md ${admin?.status?.toLowerCase().startsWith("active")
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}>
                                                    {admin?.status ? admin.status.split(' ')[0] : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="cursor-pointer hover:underline text-sm">
                                                    <Image src="/icons/delete.svg" loading='lazy' width={15} height={16.67} alt="Delete" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
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