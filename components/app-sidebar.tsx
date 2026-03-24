"use client"

import * as React from "react"
import { useAuthStore } from "@/store"
import { MdOutlineDashboard, MdOutlineMap } from "react-icons/md";
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { LuBuilding2, LuGraduationCap } from "react-icons/lu";
import { FiTag } from "react-icons/fi";
import { BsGraphUp, BsPeopleFill } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoCodeSlashOutline, IoSettingsOutline } from "react-icons/io5";
const sidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: MdOutlineDashboard,
      allowedRoles: ["superadmin", "developer", "university"],
    },
    {
      title: " Create Developer",
      url: "/newdeveloper",
      icon: IoCodeSlashOutline,
      allowedRoles: ["superadmin"],
    },
    {
      title: "Create Universities ",
      url: "/newuniversity",
      icon: LuGraduationCap,
      allowedRoles: ["superadmin"],
    },
    {
      title: "Compounds",
      url: "/compounds",
      icon: LuBuilding2,
      allowedRoles: ["superadmin", "developer"],
    },
    {
      title: "Properties",
      url: "/properties",
      icon: LuBuilding2,
      allowedRoles: ["superadmin", "developer"],
    },
    {
      title: "Dorms Management",
      url: "/dorms-mgt",
      icon: LuBuilding2,
      allowedRoles: ["university"],
    },
    {
      title: "Area & District",
      url: "/area-district",
      icon: LuBuilding2,
      allowedRoles: ["superadmin"],
    },
    {
      title: "Payment Plan",
      url: "/payment",
      icon: FiTag,
      allowedRoles: ["university"],
    },
    {
      title: "offers & plans",
      url: "/offers-plans",
      icon: FiTag,
      allowedRoles: ["developer"],
    },
    {
      title: "Map view",
      url: "/map",
      icon: MdOutlineMap,
      allowedRoles: ["superadmin", "developer", "university"],
    },
    {
      title: "Student Housing",
      url: "/student-housing",
      icon: BsGraphUp,
      allowedRoles: ["superadmin"],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BsGraphUp,
      allowedRoles: ["developer", "university"],
    },
    {
      title: "Leads",
      url: "/leads",
      icon: BsPeopleFill,
      allowedRoles: ["superadmin", "developer", "university"],
    },
    {
      title: "Logs",
      url: "/logs",
      icon: FaRegFileAlt,
      allowedRoles: ["superadmin", "developer", "university"],
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: BsPeopleFill,
      allowedRoles: ["superadmin"],
    },
    {
      title: "Reported Listings",
      url: "/reported-listings",
      icon: BsPeopleFill,
      allowedRoles: ["superadmin"],
    }, {
      title: "Users",
      url: "/users",
      icon: BsPeopleFill,
      allowedRoles: ["superadmin"],
    }
  ],
  documents: [
    {
      name: "Administrators",
      url: "/administrators",
      icon: RiAdminLine,
      allowedRoles: ["superadmin", "developer", "university"],
    },
    {
      name: "Support",
      url: "/support",
      icon: BiSupport,
      allowedRoles: ["superadmin", "developer", "university"],
    },
    {
      name: "Settings",
      url: "/settings",
      icon: IoSettingsOutline,
      allowedRoles: ["superadmin", "developer", "university"],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user || "SuperAdmin");

  const currentRole = user?.role.toLowerCase();

  const filteredNavMain = sidebarData.navMain.filter(item =>
    item.allowedRoles.includes(currentRole)
  );

  const filteredDocuments = sidebarData.documents.filter(item =>
    item.allowedRoles.includes(currentRole)
  );

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
        <NavMain items={filteredNavMain} />
        <NavDocuments items={filteredDocuments} />
      </SidebarContent>
    </Sidebar>
  )
}