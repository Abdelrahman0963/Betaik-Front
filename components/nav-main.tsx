"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: any
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu className="flex flex-col gap-2">
          {items.map((item) => {
            const isActive =
              pathname === item.url ||
              pathname.startsWith(item.url + "/")

            return (
              <Link href={item.url} key={item.title}>
                <SidebarMenuButton
                  className={`text-[15px] ${isActive
                    ? "bg-[#EEF6FC] px-3  py-6 text-[#155DFC] rounded-2xl"
                    : ""
                    } px-2 py-2`}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon size={20} />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
