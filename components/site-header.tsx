"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Navpopup from "@/components/Navpopup"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import React from "react"
import { getUserInfo } from "@/services/AuthApi"
import { useAuthStore } from "@/store/useAuthStore"
import { useQuery } from "@tanstack/react-query"

interface UserInfoResponse {
  myInfo: {
    name: string;
    companyName: string;
    userImg: string;
    companyImg: string;
  }
}

export function SiteHeader() {
  const [isNavPopupOpen, setIsNavPopupOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const user = useAuthStore((state) => state.user);

  const { data: userInfo, isLoading } = useQuery<UserInfoResponse>({
    queryKey: ["myInfo"],
    queryFn: () => getUserInfo().then((res) => res.data as UserInfoResponse),
  })

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsNavPopupOpen(false)
      }
    }

    if (isNavPopupOpen) {
      document.addEventListener("click", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [isNavPopupOpen])

  const toggleNavPopup = () => {
    setIsNavPopupOpen((prev) => !prev)
  }

  // فنكشن بسيطة عشان تاخد أول حرف من أي كلمة
  const getFirstLetter = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?"
  }
  return (
    <header className="flex  py-7 px-2 h-20 md:h-28 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {(() => {
          const role = user?.role?.toLowerCase();
          if (role === "developer" || role === "university") {
            return (
              <div className=" items-center gap-2 sm:flex hidden">
                {userInfo?.myInfo?.companyImg ? (
                  <Image
                    src={`${userInfo.myInfo.companyImg}`}
                    alt="Company Logo"
                    width={36}
                    height={36}
                    priority
                    className="rounded-full object-fill w-9 h-9"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold border border-blue-500">
                    {getFirstLetter(userInfo?.myInfo?.companyName || "")}
                  </div>
                )}
                <h1 className="text-base font-medium sm:block hidden">
                  {isLoading ? "Loading..." : userInfo?.myInfo?.companyName}
                </h1>
              </div>
            );
          }
          if (role === "superadmin") {
            return (
              <div className="flex flex-col items-start gap-1">
                <h1 className="text-base font-bold">Dashboard</h1>
                <p className="text-muted-foreground sm:block hidden ">Welcome back, Admin — {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
            );
          }
          return null;
        })()}


        <div className="ml-auto flex items-center gap-2">
          <nav>
            <Button variant="ghost" size="sm">
              <Image
                src="/icons/ring.svg"
                alt="notification"
                loading="lazy"
                width={20}
                height={20}
              />
            </Button>
          </nav>

          {/* عرض صورة المستخدم أو أول حرف من اسمه */}
          <nav className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              {userInfo?.myInfo?.userImg ? (
                <Image
                  src={userInfo.myInfo.userImg}
                  alt="user image"
                  priority
                  fill
                  className="rounded-full object-fill border border-blue-50"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-200 text-gray-700 flex items-center justify-center font-semibold text-lg border border-blue-500">
                  {getFirstLetter(userInfo?.myInfo?.name || "")}
                </div>
              )}
            </div>
            <h3 className="text-sm text-black sm:block hidden">
              {isLoading ? "..." : userInfo?.myInfo?.name}
            </h3>
          </nav>

          <div ref={containerRef} className="relative">
            <Button
              onClick={toggleNavPopup}
              className="cursor-pointer flex items-center justify-center border-none outline-none"
              variant="ghost"
              size="sm"
            >
              <Image
                src="/icons/arrowdown.svg"
                alt="arrow down"
                loading="lazy"
                width={10}
                height={5}
                className="mt-1"
              />
            </Button>

            {isNavPopupOpen && (
              <Navpopup close={() => setIsNavPopupOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}