"use client";

import React from "react";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { ArrowUturnDownIcon, BanknotesIcon, DocumentIcon, PrinterIcon, TruckIcon } from "@heroicons/react/24/outline";
import { ReloadButton } from "@/containers/core/ReloadButton";
import { classnames } from "@/containers/core/classnames";
import { LoadingMessage } from "@/containers/core/LoadingMessage";
import Link from "next/link";

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
            <th scope="col" className="px-0 sm:px-3 py-3.5 text-left w-0 sm:w-35">
              <p className="hidden sm:inline text-sm font-semibold text-gray-900">
                Transaction ID
              </p>
            </th>
            <th scope="col" className="px-3 py-3.5 text-left">
              <p className="text-sm font-semibold text-gray-900">
                <span className="hidden sm:inline">Customer</span>
                <span className="inline sm:hidden">Orders</span>
              </p>
            </th>
            <th scope="col" className="px-2 py-3.5 text-center w-36">
              <p className="text-sm font-semibold text-gray-900">
                Actions

              </p>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={3}>
                <div className="flex justify-center h-32">
                  <LoadingMessage />
                </div>
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <div className="flex items-center justify-center h-32">
                  <p className="text-sm/6 font-semibold text-gray-900">No Data</p>
                </div>
              </td>
            </tr>
          ) : (
            <>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-0 sm:px-3 py-4 text-left w-0 sm:w-35">
                    <p className="hidden sm:block text-sm/6 font-normal text-gray-900">{order.transactionID}</p>
                  </td>
                  <td className="px-3 py-2 sm:py-4 text-left">
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
                  <td className="px-2 py-2 w-36 sm:w-44">
                    <div className="grid grid-cols-4 justify-items-center">
                      <TruckIcon
                        className={classnames(order.fulfilling ? (order.fulfilling.completed ? "text-blue-600" : "text-green-600 hover:text-green-500") : "text-gray-600 hover:text-gray-900", "cursor-pointer inline-block size-5 sm:size-6 m-1 sm:mx-2")}
                        onClick={() => onFulfillSelected(order._id)}
                      />
                      <ArrowUturnDownIcon
                        className={classnames(order.returning ? "text-blue-600" : "text-gray-600 hover:text-gray-900", "cursor-pointer inline-block size-5 sm:size-6 m-1 sm:mx-2")}
                        onClick={() => onReturnSelected(order._id)}
                      />
                      <Link
                        href={`/orders/${order._id}/invoice`}
                        target="_blank"
                      >
                        <PrinterIcon
                          className="cursor-pointer inline-block size-5 sm:size-6 text-gray-600 hover:text-gray-900 m-1 sm:mx-2"
                        />
                      </Link>
                      <BanknotesIcon
                        className="cursor-pointer inline-block size-5 sm:size-6 text-gray-600 hover:text-gray-900 m-1 sm:mx-2"
                        onClick={() => onFulfillSelected(order._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </>)}
        </tbody>
      </table>
    </div>
  );
}
