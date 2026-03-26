import Image from 'next/image'
import Link from 'next/link'
import { IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { useAuthStore } from "@/store";

const Navpopup = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    return (
        <div className="absolute top-16 right-3 bg-white rounded-lg shadow-lg p-4 w-64 z-50">
            <div className="flex items-start gap-4">
                <Image
                    src={user?.avatar || "/Porfile.jpg"}
                    alt="Profile Picture"
                    width={40}
                    height={40}
                    className="rounded-full max-w-10 max-h-10"
                    loading='lazy'
                />
                <div className="flex flex-col">
                    <p className="text-sm font-medium">{user?.name || user?.role} </p>
                    <p className="text-xs text-gray-500">
                        {user?.email || "[EMAIL_ADDRESS]"}
                    </p>
                </div>
            </div>

            <div className="h-px bg-gray-200 my-3 -mx-4"></div>

            <ul className="flex flex-col gap-1 text-sm">
                <li>
                    <Link href="/accountInfo" className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                        <FaRegUser className='inline-block mr-2' />
                        Profile
                    </Link>
                </li>
                <li>
                    <Link href="#" className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                        <FiLock className='inline-block mr-2' />
                        Change Password
                    </Link>
                </li>
                <div className="h-px bg-gray-200 my-3 -mx-4"></div>

                <li>
                    <button onClick={logout} className="w-full cursor-pointer px-4 py-2 text-red-700 rounded flex items-center gap-1 hover:bg-red-100">
                        <IoIosLogOut className='text-red-700' />
                        Logout
                    </button>
                </li>
            </ul>
        </div>

    )
}

export default Navpopup
