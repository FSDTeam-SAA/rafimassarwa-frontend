import { PortfolioProvider } from '@/components/context/portfolioContext';
import { PortfolioSidebar } from '@/components/Portfolio/PortfolioSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type React from 'react';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PortfolioProvider>
                <SidebarProvider>
                    <div className="">
                        <SidebarTrigger className="lg:hidden translate-y-7 ml-1" />
                        <div className="">
                            <PortfolioSidebar />
                        </div>
                        <div className="lg:flex lg:justify-end mx-2 lg:mx-0">
                            <div className="lg:ml-72">
                                {children}
                            </div>
                        </div>
                    </div>
                </SidebarProvider>
            </PortfolioProvider>
        </>
    );
}