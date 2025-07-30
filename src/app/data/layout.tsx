"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { classnames } from "@/containers/core/classnames";
import UserNav from "@/containers/UserNav";

const NavsData = [
  { key: 0, name: "Customers", href: "customers", initial: "C" },
  { key: 1, name: "Products", href: "products", initial: "P" },
  { key: 2, name: "Price Structures", href: "pricestructures", initial: "PS" },
  { key: 3, name: "Users", href: "users", initial: "U" },
];

const Navigation = ({
  activeIndex,
}: {
  activeIndex: number;
}) => (
  <>
    <div className="flex h-16 shrink-0 items-center">
      <p className="pt-6 text-lg font-semibold text-gray-900">Performa</p>
    </div>
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <div className="text-xs/6 font-semibold text-gray-600">Managing Data</div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {NavsData.map((each, index) => (
              <li key={index}>
                <a
                  href={`/data/${each.href}`}
                  className={classnames(
                    activeIndex === index
                      ? "bg-gray-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600",
                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                  )}
                >
                  <span
                    className={classnames(
                      activeIndex === index
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-200 text-gray-400 group-hover:border-blue-600 group-hover:text-blue-600",
                      "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                    )}
                  >
                    {each.initial}
                  </span>
                  <span className="truncate">{each.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </li>

      </ul>
    </nav>
  </>
);

export default function DataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navsOpen, setNavsOpen] = React.useState(false);
  const pathname = usePathname();
  const current = pathname.slice(6).toLowerCase();
  const activeIndex = NavsData.findIndex((each) => current.startsWith(each.href));

  return (
    <div>
      {/* Sidebar Navs for Mobile */}
      <Dialog open={navsOpen} onClose={setNavsOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" onClick={() => setNavsOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close Navs</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <Navigation
                activeIndex={activeIndex}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static Navs for Desktop */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-72">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <Navigation
            activeIndex={activeIndex}
          />
        </div>
      </div>

      {/* Topbar */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 sm:px-6 border-b border-gray-200">
        <button type="button" onClick={() => setNavsOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm/6 lg:text-base font-semibold text-gray-900 lg:pl-72">{NavsData[activeIndex].name}</div>
        {/* User */}
        <UserNav />
      </div>

      <main className="lg:pl-72">
        {children}
      </main>
    </div>
  )
}
