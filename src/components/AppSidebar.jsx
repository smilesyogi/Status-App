import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: "LayoutDashboard" },
  { title: "Services", url: "/overview", icon: "ServerCog" },
  { title: "Incidents", url: "/about", icon: "ShieldAlert" },
];

// Ensure the icons are imported from lucide-react
import {
  LayoutDashboard,
  ServerCog,
  ShieldAlert,
} from "lucide-react";

const icons = {
  LayoutDashboard,
  ServerCog,
  ShieldAlert,
};

const AppSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const IconComponent = icons[item.icon];
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url} className="flex items-center space-x-2"> {/* Add spacing here */}
                          <IconComponent className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AppSidebar;
