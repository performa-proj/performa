"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { classnames } from "@/containers/core/classnames";
import SidebarLayout from "@/containers/core/SidebarLayout";

const navs = [
  { id: 1, initial: "PoS", name: "Point of Sales", title: "PoS", href: "/orders/pos" },
  { id: 2, initial: "PC", name: "Process", title: "Process", href: "/orders/process" },
];

const Navs = ({
  activeID,
}: {
  activeID: number;
}) => {

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <div className="text-xs/6 font-semibold text-gray-600">Orders</div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {navs.map((each) => (
              <li key={each.id}>
                <Link
                  href={each.href}
                  className={classnames(activeID === each.id
                    ? "bg-gray-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                  )}
                >
                  <span
                    className={classnames(activeID === each.id
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-200 text-gray-400 group-hover:border-blue-600 group-hover:text-blue-600",
                      "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                    )}
                  >
                    {each.initial}
                  </span>
                  <span className="truncate">{each.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default function ManagedOrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pathname = usePathname();
  pathname = pathname.toLowerCase();
  const matched = navs.find((each) => each.href === pathname);
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
