"use client"

import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DromsFilters from "@/components/Filters/DromsFilters"

const Dorms = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex flex-col gap-6 w-full items-start justify-between">
            <div className="flex flex-col justify-between items-start">
              <h1 className="text-md font-semibold tracking-tight md:text-3xl">
                Dorms Management
              </h1>
              <p className="text-muted-foreground">
                Manage and monitor all university student residences.
              </p>
            </div>

            <div className="flex md:flex-row flex-col items-start md:items-center gap-2 justify-center md:justify-between mt-4 w-full">
              <Tabs defaultValue="Dorms" className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="Student Housing" asChild>
                    <Link href="/dorms-mgt">
                      Student Housing
                    </Link>
                  </TabsTrigger>
                  <TabsTrigger value="Dorms">Dorms</TabsTrigger>
                </TabsList>
              </Tabs>

              <Link
                href="/dorms-mgt/add-new-dorm"
                className="sm:px-4 sm:text-[1rem] text-sm px-2 py-1 cursor-pointer flex items-center gap-3 font-light text-white rounded-lg bg-[#155DFC] hover:bg-[#8AAEFE]"
              >
                <span className="text-2xl">+</span>
                Add New Dorm
              </Link>
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <DromsFilters />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dorms
