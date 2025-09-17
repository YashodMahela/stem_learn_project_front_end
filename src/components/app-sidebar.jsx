import { Home, Folder } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Products",
        url: "/dashboard/products",
        icon: Folder,
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="bg-white shadow-lg border-r border-gray-200">
            <SidebarContent>
                {/* Gradient Heading */}
                <div className="p-4 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                        Admin
                    </h1>
                </div>

                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-gray-600 uppercase text-xs tracking-wide">
                        Admin Menu
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className="mt-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a
                                            href={item.url}
                                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-200"
                                        >
                                            <item.icon className="text-pink-600" />
                                            <span className="text-gray-800 font-medium">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
