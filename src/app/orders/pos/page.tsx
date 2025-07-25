"use client";

import React from "react";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { classnames } from "@/containers/core/classnames";
import UserNav from "@/containers/UserNav";
import OrderForm from "@/containers/Orders/OrderForm";

const orders = [
  { id: "POS", name: "Point of Sales", initial: "PoS" },
  { id: "DEL", name: "Delivery", initial: "D" },
  { id: "PRE", name: "Preorder", initial: "PO" },
];

const Navs = ({
  selectedID,
  onSelect,
}: {
  selectedID: string;
  onSelect: (id: string) => void;
}) => (
  <nav className="flex flex-1 flex-col">
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <div className="text-xs/6 font-semibold text-gray-600">Orders</div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          {orders.map((each) => (
            <li
              key={each.id}
              onClick={() => onSelect(each.id)}
            >
              <p
                className={classnames(
                  each.id === selectedID ? "bg-gray-50 text-blue-600" : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer",
                )}
              >
                <span
                  className={classnames(
                    each.id === selectedID ? "border-blue-600 text-blue-600" : "border-gray-200 text-gray-400 group-hover:border-blue-600 group-hover:text-blue-600",
                    "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                  )}
                >
                  {each.initial}
                </span>
                <span className="truncate">{each.name}</span>
              </p>
            </li>
          ))}
        </ul> 
      </li>
      <li>

      </li>
    </ul>
  </nav>
);

export default function Page() {
  const [navsOpen, setNavsOpen] = React.useState(false);
  const [selectedID, setSelectedID] = React.useState("POS");

  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-72">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <p className="pt-6 text-lg font-semibold text-gray-900">Performa</p>
          </div>
          <Navs
            selectedID={selectedID}
            onSelect={(id: string) => {
              setSelectedID(id);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col lg:pl-72 h-full w-full">
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white p-4 sm:px-6 border-b border-gray-200">
          <button type="button" onClick={() => setNavsOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-base/6 lg:text-lg font-semibold text-gray-900">
            PoS
          </div>
          <UserNav />
        </div>
        <main className="grow">
          <OrderForm />
        </main>
      </div>

      <Dialog open={navsOpen} onClose={() => setNavsOpen(false)} className="relative z-50 lg:hidden">
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
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <p className="pt-6 text-lg font-semibold text-gray-900">Performa</p>
              </div>
              <Navs
                selectedID={selectedID}
                onSelect={(id: string) => {
                  setSelectedID(id);
                }}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
