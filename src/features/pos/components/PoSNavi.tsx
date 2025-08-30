"use client";

import { usePathname } from "next/navigation";
import { ComputerDesktopIcon, QueueListIcon, TicketIcon } from "@heroicons/react/20/solid";
import { Sidebar, SidebarBody, SidebarSection, SidebarDivider, SidebarHeader } from "@/components/core/sidebar";
import { Navbar, NavbarSpacer } from "@/components/core/navbar";
import { Heading } from "@/components/core/heading";
import { HomeNav } from "@/components/home-nav";
import { NaviItems } from "@/components/navi-items";

export const PoSSidebar = () => {
  const pathname = usePathname();
  const currentPath = pathname.toLowerCase();

  return (
    <Sidebar>
      <SidebarHeader>
        <HomeNav />
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <NaviItems
            currentPath={currentPath}
            items={[
              { Icon: ComputerDesktopIcon, label: "New Order", href: "/pos/i" },
            ]}
          />
        </SidebarSection>
        <SidebarDivider />
        <SidebarSection>
          <NaviItems
            currentPath={currentPath}
            items={[
              { Icon: TicketIcon, label: "Process", href: "/pos/process" },
              { Icon: QueueListIcon, label: "Preorders", href: "/pos/pre" },
            ]}
          />
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  );
};

export const PoSNavbar = () => {
  return (
    <Navbar>
      <Heading>PoS</Heading>
      <NavbarSpacer />
    </Navbar>
  );
};
