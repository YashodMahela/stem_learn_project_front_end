import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function AdminSidebar({ children }) {
    return (
        <SidebarProvider>
            <div className="flex w-full min-h-screen">
                {/* Sidebar */}
                <AppSidebar className="w-64 border-r bg-white" />

                {/* Main content area */}
                <main className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <SidebarTrigger />
                    </div>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
