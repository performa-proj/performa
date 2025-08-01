"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { classnames } from "@/containers/core/classnames";
import SidebarLayout from "@/containers/core/SidebarLayout";
import { ArrowRightStartOnRectangleIcon, ComputerDesktopIcon, QueueListIcon } from "@heroicons/react/24/outline";

const Orders = [
  { id: 1, name: "Point of Sales", icon: ComputerDesktopIcon, title: "PoS", href: "/orders/pos" },
  { id: 2, name: "Preorders", icon: QueueListIcon, title: "Preorders", href: "/orders/preorders" },
  { id: 3, name: "Process", icon: ArrowRightStartOnRectangleIcon, title: "Order Process", href: "/orders/process" },
];

const Navs = ({
  activeID,
}: {
  activeID: number;
}) => (
  <nav className="flex flex-1 flex-col">
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <div className="text-xs/6 font-semibold text-gray-600">Orders</div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          {Orders.map((each) => (
            <li key={each.id}>
              <Link
                href={each.href}
                className={classnames(activeID === each.id
                  ? "bg-gray-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                )}
              >
                <each.icon
                  className={classnames(activeID === each.id
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-blue-600",
                    "size-6 shrink-0",
                  )}
                />
                {each.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <div className="text-xs/6 font-semibold text-gray-600">Process</div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">

        </ul>
      </li>
    </ul>
  </nav>
);

export default function ManagedOrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pathname = usePathname();
  pathname = pathname.toLowerCase();
  const matched = Orders.find((each) => each.href === pathname);
  const activeID = matched ? matched.id : -1;
  const title = matched ? matched.title : "";

  return (
    <SidebarLayout
      title={title}
      navs={<Navs activeID={activeID} />}
    >
      {children}
    </SidebarLayout>
  );
}
