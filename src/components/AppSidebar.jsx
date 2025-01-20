import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/overview", icon: "LayoutDashboard" },
  { title: "Services", url: "/", icon: "ServerCog" },
  { title: "Incidents", url: "/incidents", icon: "ShieldAlert" },
  { title: "Maintenance", url: "/maintenance", icon: "Cog" },
  { title: "Teams", url: "/teams", icon: "Users" },
  { title: "Settings", url: "/settings", icon: "Settings2" },
  { title: "About", url: "/about", icon: "Info" }

];

// Ensure the icons are imported from lucide-react
import { Cog, LayoutDashboard, ServerCog, Settings2, ShieldAlert, Users,Info } from "lucide-react"


const icons = {
  LayoutDashboard,
  ServerCog,
  ShieldAlert,
  Cog,
  Users,
  Settings2,
  Info
};

const AppSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="p-0" >
                {items.map((item) => {
                  const IconComponent = icons[item.icon];
                  return (
                    <SidebarMenuItem key={item.title} >
                      <SidebarMenuButton asChild>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={item.url} className="flex text-left space-x-4"> {/* Add spacing here */}
                          <IconComponent className="w-5 h-5 m-1" />
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
