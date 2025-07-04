import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/Sidebar"
import DashProvider from "@/providers/DashProvider"
import { DashboardHeader } from "@/components/shared/dashboard-header"

export const metadata = {
  title: "Dashboard | Olive Stock",
  description: "this is olive stock's dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <DashProvider>
        <SidebarProvider>
          <div className="flex flex-col md:flex-row min-h-screen w-full">
            <AppSidebar />

            <div className="flex-1 flex flex-col">
              <DashboardHeader />

              <main className="bg-[#eaf6ec] flex-1 p-3 md:p-5">
                <div>{children}</div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </DashProvider>
    </div>
  )
}
