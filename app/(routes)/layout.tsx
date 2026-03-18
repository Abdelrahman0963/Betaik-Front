"use client";

import { Roboto } from "next/font/google";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import ProtectedAuth from "@/hooks/auth/ProtectedAuth";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const sidebarStyles: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#f8f9fa",
    borderRight: "1px solid #dee2e6",
};

export default function RoutesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // أضفنا الـ font variable هنا عشان يتطبق على كل الـ Routes
        <div className={`${roboto.variable} font-sans`}>
            <ProtectedAuth>
                <SidebarProvider style={sidebarStyles}>
                    {/* الـ AppSidebar دلوقتي يقدر يقرأ الـ Role داخلياً ويعرض اللينكات المناسبة */}
                    <AppSidebar />

                    <SidebarInset>
                        <SiteHeader />
                        <main className="flex-1 p-4">
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>

                <Toaster position="top-center" reverseOrder={false} />
            </ProtectedAuth>
        </div>
    );
}