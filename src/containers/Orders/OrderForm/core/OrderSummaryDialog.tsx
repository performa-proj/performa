"use client";

import React from "react";
import Link from "next/link";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { UserCircleIcon, HashtagIcon } from "@heroicons/react/24/solid";

const Unpaid = () => (
  <p className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
    Unpaid
  </p>
);

const Paid = () => (
  <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
    Paid
  </dd>
);

export default function OrderSummaryDialog({
  order,
  open,
  onClose,
}: {
  order: IProcessOrder;
  open: boolean;
  onClose: () => void;
}) {

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="divide-y divide-gray-200">
              <div className="px-6 py-2">
                <div className="flex py-2 gap-x-2">
                  <dt className="flex-none">
                    <HashtagIcon className="h-6 w-5 text-gray-700" />
                  </dt>
                  <dd className="text-base font-semibold text-gray-900">
                    <p>{order.transactionID.toString()}</p>
                  </dd>
                </div>
                <div className="flex py-2 gap-x-2">
                  <dt className="flex-none">
                    <UserCircleIcon className="h-6 w-5 text-gray-400" />
                  </dt>
                  <dd className="text-sm/6 font-medium text-gray-600">
                    {order.customer?.name || "[Walk-in]"}
                  </dd>
                </div>
              </div>
              <div className="px-6 py-2">
                <div className="py-2">
                  <label
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    Total
                  </label>
                  <div className="flex mt-1">
                    <p className="flex-auto text-lg font-semibold text-gray-900">{order.total.toLocaleString()}</p>
                    <div>
                      <Unpaid />
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <Link
                    href={`/orders/${order._id}/invoice`}
                    className="text-sm/6 font-semibold text-gray-900 hover:text-gray-600"
                    target="_blank"
                  >
                    Print Invoice <span className="px-1">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="px-6 py-2">
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
