"use client"

import { useAuthStore } from "@/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProtectedAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { user, token } = useAuthStore()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted) {
            if (!token || !user) {
                router.replace("/login")
            }
        }
    }, [isMounted, token, user, router])

    if (!isMounted || !token || !user) {
        return null
    }

    return <>{children}</>
}