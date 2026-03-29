"use client"

import Image from 'next/image'
import Link from 'next/link'
import { IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { useAuthStore } from "@/store";
import { getUserInfo } from "@/services/AuthApi"
import { useQuery } from "@tanstack/react-query"

interface UserInfoResponse {
    myInfo: {
        name: string;
        companyName: string;
        userImg: string;
        companyImg: string;
    }
}

const Navpopup = ({ close }: { close: () => void }) => {
    const logout = useAuthStore((state) => state.logout);

    const { data: userInfo, isLoading } = useQuery<UserInfoResponse>({
        queryKey: ["myInfo"],
        queryFn: () => getUserInfo().then((res) => res.data as UserInfoResponse),
    })

    // دالة لاستخراج أول حرف
    const getFirstLetter = (name: string) => {
        return name ? name.charAt(0).toUpperCase() : "?"
    }

    return (
        <div className="absolute top-16 right-3 bg-white rounded-lg shadow-lg p-4 w-64 z-50 border border-gray-100">
            <div className="flex items-start gap-4">
                {/* الجزء الخاص بالصورة أو الحرف البديل */}
                <div className="relative w-10 h-10 flex-shrink-0">
                    {userInfo?.myInfo?.userImg ? (
                        <Image
                            src={userInfo.myInfo.userImg}
                            alt="Profile Picture"
                            fill
                            className="rounded-full object-cover"
                            loading='lazy'
                        />
                    ) : (
                        <div className="w-full h-full rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-200">
                            {getFirstLetter(userInfo?.myInfo?.name || "")}
                        </div>
                    )}
                </div>

                <div className="flex flex-col overflow-hidden">
                    <p className="text-sm font-semibold truncate">
                        {isLoading ? "Loading..." : userInfo?.myInfo?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                        {isLoading ? "Please wait" : userInfo?.myInfo?.companyName}
                    </p>
                </div>
            </div>

            <div className="h-px bg-gray-200 my-3 -mx-4"></div>

            <ul className="flex flex-col gap-1 text-sm">
                <li onClick={() => close()}>
                    <Link href="/accountInfo" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                        <FaRegUser className='mr-3 text-gray-500' />
                        Profile
                    </Link>
                </li>
                <li onClick={() => close()}>
                    <Link href="/accountInfo" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                        <FiLock className='mr-3 text-gray-500' />
                        Change Password
                    </Link>
                </li>

                <div className="h-px bg-gray-200 my-3 -mx-4"></div>

                <li>
                    <button
                        onClick={() => {
                            logout();
                            close();
                        }}
                        className="w-full cursor-pointer px-4 py-2 text-red-600 rounded flex items-center hover:bg-red-50 transition-colors font-medium"
                    >
                        <IoIosLogOut className='mr-3 text-lg' />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Navpopup