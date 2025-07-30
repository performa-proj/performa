"use client";

import React from "react";
import Link from "next/link";
import { Bars3Icon, Squares2X2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import UserNav from "../UserNav";

const Navigation = ({
  navs,
}: {
  navs: React.ReactNode;
}) => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white h-full px-6 py-2">
      <div className="flex shrink-0 items-center h-16">
        <Link
          className="p-2 text-gray-900 hover:text-gray-700"
          href="/"
        >
          <Squares2X2Icon className="size-6" />
        </Link>
        <p className="text-base/6 lg:text-lg font-semibold text-gray-900">Performa</p>
      </div>
      <div className="flex-1">
        {navs}
      </div>
    </div>
  );
}

export default function SidebarLayout({
  title,
  navs,
  children,
}: {
  title: string;
  navs: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full h-full">
      <div className="hidden lg:flex lg:fixed lg:flex-col lg:inset-y-0 lg:z-50 lg:w-72">
        <div className="flex-1 flex-col h-full bg-white border-r border-gray-200">
          <Navigation
            navs={navs}
          />
        </div>
      </div>

      <div className="h-full lg:pl-72">
        <div className="sticky top-0 z-40 flex items-center shrink-0 gap-x-6 p-4 sm:px-6 border-b border-gray-200 bg-white">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <Bars3Icon className="size-6" />
          </button>

          <div className="flex-1">
            <p className="text-base/6 lg:text-lg font-semibold text-gray-900">
              {title}
            </p>
          </div>

          <UserNav />
        </div>

        <main>
          {children}
        </main>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="flex fixed inset-0">
          <DialogPanel
            transition
            className="flex flex-1 relative mr-16 w-full max-w-xs transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="flex absolute left-full top-0 w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" onClick={() => setOpen(false)} className="-m-2.5 p-2.5">
                  <XMarkIcon className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex-1 flex-col h-full bg-white">
              <Navigation
                navs={navs}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
