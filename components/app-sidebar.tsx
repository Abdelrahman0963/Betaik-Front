"use client"

import * as React from "react"
import {
  IconDatabase,
  IconFileWord,
  IconReport,
} from "@tabler/icons-react"
import { MdOutlineDashboard, MdOutlineMap } from "react-icons/md";

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { LuBuilding2 } from "react-icons/lu";
import { FiTag } from "react-icons/fi";
import { BsGraphUp, BsPeopleFill } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: MdOutlineDashboard,
    },
    {
      title: "Dorms Management",
      url: "/dorms-mgt",
      icon: LuBuilding2,
    },
    {
      title: "Payment Plan",
      url: "/payment",
      icon: FiTag,
    },
    {
      title: "Map view",
      url: "/map",
      icon: MdOutlineMap,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BsGraphUp,
    },
    {
      title: "Leads",
      url: "/leads",
      icon: BsPeopleFill,
    }, {
      title: "Logs",
      url: "/logs",
      icon: FaRegFileAlt,
    }
  ],
  documents: [
    {
      name: "Administrators",
      url: "/administrators",
      icon: RiAdminLine,
    },
    {
      name: "Support",
      url: "/support",
      icon: BiSupport,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: IoSettingsOutline,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="flex items-center gap-2 p-2 mt-3 justify-center">
              <Image
                src="/icons/Beitak.svg"
                alt="Logo"
                width={108}
                height={44}
                priority
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>

    </Sidebar>
  )
}
