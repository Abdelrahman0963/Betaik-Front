"use client"
import { useAuthStore } from "@/store"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"

const RecentActivity = dynamic(() => import("@/components/cards/RecentActivity"), { ssr: false })
const ChartAreaInteractive = dynamic(() => import("@/components/graph/ChartAreaInteractive").then(mod => mod.ChartAreaInteractive), { ssr: false })
const HeroCards = dynamic(() => import("@/components/cards/HeroCards"), { ssr: false })

export default function Homepage() {
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between">

              <div className="md:flex hidden md:flex-col flex-row justify-between items-start">
                {/* تحويل الروول لحروف صغيرة لتجنب أخطاء الكتابة */}
                {(() => {
                  const role = user?.role?.toLowerCase();

                  if (role === "developer" || role === "university") {
                    return (
                      <>
                        <h1 className="text-md font-semibold tracking-tight md:text-3xl">Dashboard</h1>
                        {role === "university" && (
                          <p className="text-muted-foreground">Welcome back, Admin</p>
                        )}
                      </>
                    );
                  }

                  if (role === "superadmin") {
                    return (
                      <>
                        <h1 className="text-md font-semibold tracking-tight md:text-3xl">
                          Platform & User Overview
                        </h1>
                        <p className="text-muted-foreground">
                          Main admin dashboard statistics and insights
                        </p>
                      </>
                    );
                  }

                  return null; // في حالة مفيش يوزر أو روول مختلفة
                })()}
              </div>
              <div className="flex items-center justify-between">
                {(() => {
                  const role = user?.role?.toLowerCase();

                  if (role === "university") {
                    return (
                      <div className="flex items-center gap-4">
                        <Link href="/accountInfo" className="sm:px-4 sm:text-[1rem] text-sm sm:py-2 px-2 py-1 cursor-pointer flex items-center gap-3 font-light text-white rounded-lg bg-[#155DFC] hover:bg-[#8AAEFE]">
                          <span className="text-2xl">+</span> Add New Dorm
                        </Link>
                        <Link href="/paymentPlan" className="sm:px-4 sm:text-[1rem] text-sm sm:py-2 px-2 py-1 cursor-pointer flex items-center gap-3 font-light text-white rounded-lg bg-[#155DFC] hover:bg-[#8AAEFE]">
                          <span className="text-2xl">+</span> Add Payment Plan
                        </Link>
                      </div>
                    );
                  }

                  return null;
                })()}
              </div>
            </div>

            <HeroCards />
            <div className="px-4 lg:px-4 flex gap-4 items-start w-full">
              <ChartAreaInteractive />
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}