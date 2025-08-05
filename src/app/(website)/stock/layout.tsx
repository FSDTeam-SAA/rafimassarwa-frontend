import BannerAds from "@/components/News/BannerAds";
import { OverviewSidebar } from "@/components/overview/overview-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <div className="w-[425px] lg:w-auto">
          <SidebarTrigger className="lg:hidden mt-2 ml-1" />
          <div className="">
            <OverviewSidebar />
          </div>
          <div className="lg:flex lg:justify-end mx-2 lg:mx-0">
            <div className="lg:ml-72 pb-10">
              <div className="mt-5">
                <BannerAds />
              </div>
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
