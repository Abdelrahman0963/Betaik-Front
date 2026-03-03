"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Navpopup from "@/components/Navpopup"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import React from "react"

export function SiteHeader() {
  const [isNavPopupOpen, setIsNavPopupOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

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

  return (
    <header className="flex h-(--header-height) py-10 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <Image
          src="/Frame 1984080340.png"
          alt="Logo"
          width={36}
          height={36}
          priority
          className="rounded-full"
        />

        <h1 className="text-base font-medium sm:block hidden">GIU University</h1>

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

          <nav className="flex items-center gap-2">
            <Image
              src="/Porfile.jpg"
              alt="user image"
              loading="lazy"
              className="rounded-full max-w-10 max-h-10"
              width={40}
              height={40}
            />
            <h3 className="text-sm text-black sm:block hidden">John Doe</h3>
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
              <Navpopup />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
