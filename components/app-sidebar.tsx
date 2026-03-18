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
import { LuBuilding2 } from "react-icons/lu";
import { FiTag } from "react-icons/fi";
import { BsGraphUp, BsPeopleFill } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

// نقلنا البيانات بره الـ Component وضفنا الأدوار المسموحة لكل لينك
const sidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: MdOutlineDashboard,
      allowedRoles: ["admin", "developer", "university"],
    },
    {
      title: " Create Developer",
      url: "/newdeveloper",
      icon: RiAdminLine,
      allowedRoles: ["admin",],
    },
    {
      title: "Create Universities ",
      url: "/newuniversity",
      icon: BsPeopleFill,
      allowedRoles: ["admin",],
    },
    {
      title: "Compounds",
      url: "/compounds",
      icon: LuBuilding2,
      allowedRoles: ["admin", "developer"],
    },
    {
      title: "Properties",
      url: "/properties",
      icon: LuBuilding2,
      allowedRoles: ["admin", "developer"],
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
      allowedRoles: ["admin"],
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
      allowedRoles: ["admin", "developer", "university"],
    },
    {
      title: "Student Housing",
      url: "/student-housing",
      icon: BsGraphUp,
      allowedRoles: ["admin"],
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
      allowedRoles: ["admin", "developer", "university"],
    },
    {
      title: "Logs",
      url: "/logs",
      icon: FaRegFileAlt,
      allowedRoles: ["admin", "developer", "university"],
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: BsPeopleFill,
      allowedRoles: ["admin"],
    },
    {
      title: "Reported Listings",
      url: "/reported-listings",
      icon: BsPeopleFill,
      allowedRoles: ["admin"],
    }, {
      title: "Users",
      url: "/users",
      icon: BsPeopleFill,
      allowedRoles: ["admin"],
    }
  ],
  documents: [
    {
      name: "Administrators",
      url: "/administrators",
      icon: RiAdminLine,
      allowedRoles: ["admin", "developer", "university"],
    },
    {
      name: "Support",
      url: "/support",
      icon: BiSupport,
      allowedRoles: ["admin", "developer", "university"],
    },
    {
      name: "Settings",
      url: "/settings",
      icon: IoSettingsOutline,
      allowedRoles: ["admin", "developer", "university"],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);

  const currentRole = user?.role?.toLowerCase() || "";

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
        {/* نمرر المصفوفات المفلترة فقط */}
        <NavMain items={filteredNavMain} />
        <NavDocuments items={filteredDocuments} />
      </SidebarContent>
    </Sidebar>
  )
}