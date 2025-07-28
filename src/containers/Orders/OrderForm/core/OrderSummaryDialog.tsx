"use client";

import React from "react";
import { IOrder } from "@/services/Orders/IOrder";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { UserCircleIcon, HashtagIcon } from "@heroicons/react/24/solid";

export default function OrderSummaryDialog({
  data,
  open,
  onClose,
}: {
  data: IOrder;
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
            <div>
              <dl>

                <div className="flex px-6 pt-2">
                  <div className="flex-auto">
                    <dt className="text-sm/6 font-semibold text-gray-900">Total</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">{data.total.toLocaleString()}</dd>
                  </div>
                  <div className="flex-none pt-7">
                    {/*<dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Paid
                    </dd>*/}
                    <dd className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                      Unpaid
                    </dd>
                  </div>
                </div>
                <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                  <dt className="flex-none">
                    <HashtagIcon aria-hidden="true" className="h-6 w-5 text-gray-600" />
                  </dt>
                  <dd className="text-base font-semibold text-gray-900">
                    <p>{data.transactionID.toString().slice(8)}</p>
                  </dd>
                </div>
                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                  <dt className="flex-none">
                    <UserCircleIcon aria-hidden="true" className="h-6 w-5 text-gray-600" />
                  </dt>
                  <dd className="text-sm/6 text-gray-900">
                    {data.customer?.name || "[Walk-in]"}
                  </dd>
                </div>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                  <p>
                    <a
                      href={`/orders/${data._id}/invoice`}
                      className="text-sm/6 font-semibold text-gray-900 hover:text-gray-700"
                      target="_blank"
                    >
                      Print invoice <span aria-hidden="true">&rarr;</span>
                    </a>
                  </p>
                  <a
                    href="#"
                    className="text-sm/6 font-semibold text-gray-900 hover:text-gray-700"
                  >
                    Print receipt <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>

              </dl>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
