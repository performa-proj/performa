"use client";

import React from "react";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { ArrowUturnDownIcon, BanknotesIcon, PrinterIcon, TruckIcon } from "@heroicons/react/24/outline";
import { ReloadButton } from "@/containers/core/ReloadButton";

const PoD = ({
  isShow,
}: {
  isShow: boolean;
}) => {
  if (isShow) {
    return (
      <span className="mx-1.5 inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        PoD
      </span>
    );
  } else {
    return (<></>);
  }
};

const Completed = ({
  isShow,
}: {
  isShow: boolean;
}) => {
  if (isShow) {
    return (
      <span className="mx-1.5 inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
        Completed
      </span>
    );
  } else {
    return (<></>);
  }
};

export default function ProcessOrdersTable({
  isLoading,
  orders,
  onReloading,
  onFulfillSelected,
  onReturnSelected,
}: {
  isLoading: boolean;
  orders: IProcessOrder[];
  onReloading: () => void;
  onFulfillSelected: (orderID: string) => void;
  onReturnSelected: (orderID: string) => void;
}) {
  const weight = 0;
  console.log(orders);

  return (
    <div className="bg-white h-full w-full">
      <div className="flex px-3 py-2 border-b border-gray-200">
        <div className="grow" />
        <div>
          <ReloadButton
            isLoading={isLoading}
            onClick={onReloading}
          />
        </div>
      </div>
      <table className="relative min-w-full divide-y divide-gray-200 border-b border-gray-200">
        <thead>
          <tr>
            <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-sm font-semibold text-gray-900 text-left w-35">
              Transaction ID
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
              <span className="hidden sm:inline">Customer</span>
              <span className="inline sm:hidden">Orders</span>
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center w-40">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="hidden sm:table-cell px-3 py-4 text-left w-35">
                <p className="text-sm/6 font-normal text-gray-900">{order.transactionID}</p>
              </td>
              <td className="px-3 py-3 sm:py-4 text-left">
                <div className="hidden sm:block">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {order.customer ? order.customer.name : "[Walk-In]"}
                  </p>
                </div>
                <div className="block sm:hidden">
                  <p className="text-xs font-medium text-gray-600">{order.transactionID}</p>
                  <p className="text-sm/6 font-semibold text-gray-900 mt-1">{order.customer ? order.customer.name : "[Walk-In]"}</p>
                </div>
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center justify-center gap-1.5">
                  <PrinterIcon
                    className="cursor-pointer inline-block size-5 sm:size-6 text-gray-600 hover:text-gray-900 mx-1"
                    onClick={() => onFulfillSelected(order._id)}
                  />
                  <TruckIcon
                    className="cursor-pointer inline-block size-5 sm:size-6 text-gray-600 hover:text-gray-900 mx-1"
                    onClick={() => onFulfillSelected(order._id)}
                  />
                  <ArrowUturnDownIcon
                    className="cursor-pointer inline-block size-5 sm:size-6 text-gray-600 hover:text-gray-900 mx-1"
                    onClick={() => onReturnSelected(order._id)}
                  />
                  <BanknotesIcon
                    className="cursor-pointer inline-block size-5 sm:size-6 text-gray-600 hover:text-gray-900 mx-1"
                    onClick={() => onFulfillSelected(order._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
