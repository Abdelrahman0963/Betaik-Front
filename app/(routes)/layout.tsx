import { Roboto } from "next/font/google";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.variable}  bg-white font-roboto antialiased`}
            >
                <SidebarProvider style={sidebarStyles}>
                    <AppSidebar />
                    <SidebarInset>
                        <SiteHeader />
                        {children}
                    </SidebarInset>
                </SidebarProvider>
                <Toaster position="top-center" reverseOrder={false} />
            </body>
        </html>
    );
}