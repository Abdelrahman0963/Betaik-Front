"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    url: string
    icon?: any
  }[]
}) {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>System</SidebarGroupLabel>

      <SidebarMenu className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive =
            pathname === item.url ||
            pathname.startsWith(item.url + "/")

          return (
            <Link href={item.url} key={item.name}>
              <SidebarMenuButton
                className={`text-[15px] ${isActive
                  ? "bg-[#EEF6FC] px-3  py-6 text-[#155DFC] rounded-2xl"
                  : ""
                  } px-2 py-2`}
                tooltip={item.name}
              >
                {item.icon && <item.icon size={20} />}
                <span>{item.name}</span>
              </SidebarMenuButton>
            </Link>
          )
        })}

        <SidebarMenuItem />
      </SidebarMenu>
    </SidebarGroup>
  )
}
