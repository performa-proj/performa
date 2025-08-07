"use client";

import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export default function ActionsMenu({
  order,
  onFulfill,
  onReturn,
}: {
  order: IProcessOrder;
  onFulfill: (orderID: string) => void;
  onReturn: (orderID: string) => void;
}) {
  return (
    <Menu as="div" className="relative flex-none">
      <MenuButton className="relative block text-gray-600 hover:text-gray-900">
        <EllipsisVerticalIcon aria-hidden="true" className="size-6" />
      </MenuButton>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <div
            className="cursor-pointer block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
            onClick={() => onFulfill(order._id)}
          >
            Fulfill Order
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="cursor-pointer block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
            onClick={() => onReturn(order._id)}
          >
            Return Order
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
