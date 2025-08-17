"use client";

import React from "react";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { ArrowUturnDownIcon, BanknotesIcon, TruckIcon } from "@heroicons/react/24/outline";

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
  orders,
  onFulfillSelected,
  onReturnSelected,
}: {
  orders: IProcessOrder[];
  onFulfillSelected: (orderID: string) => void;
  onReturnSelected: (orderID: string) => void;
}) {
  const weight = 0;
  console.log(orders);

  return (
    <div className="bg-white h-full w-full">
      <table className="relative min-w-full divide-y divide-gray-200 border-b border-gray-200">
        <thead>
          <tr>
            <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-sm font-semibold text-gray-900 text-left w-35">
              Transaction ID
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
              <span className="hidden sm:inline">Customer</span> <span className="inline sm:hidden">Orders</span>
            </th>
            <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
              Fulfillment
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">
              Payment
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center w-40">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="hidden sm:table-cell px-3 py-4 text-sm/6 font-normal text-gray-900 text-left w-35">{order.transactionID}</td>
              <td className="px-3 py-3 sm:py-4 text-sm/6 font-semibold text-gray-900 text-left">
                <div className="hidden sm:block">
                  {order.customer ? order.customer.name : "[Walk-In]"}
                </div>
                <div className="block sm:hidden">
                  <p className="text-xs font-medium text-gray-600">{order.transactionID}</p>
                  <p className="text-sm/6 font-semibold text-gray-900 mt-0.5">{order.customer ? order.customer.name : "[Walk-In]"}</p>
                  <p className="text-sm/6 font-medium text-gray-900 mt-2">
                    {weight.toLocaleString()} KG. <Completed isShow={order.fulfilling?.completed || false} />
                  </p>
                </div>
              </td>
              <td className="hidden sm:table-cell px-3 py-4">
                <div className="flex items-center">
                  <p className="text-sm/6 font-medium text-gray-900">{weight.toLocaleString()} KG.</p>
                  <Completed isShow={order.fulfilling?.completed || false} />
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex items-center justify-center">
                  <PoD isShow={order.payment.pod} />
                </div>
              </td>
              <td className="px-3 py-2 w-40">
                <div className="flex items-center justify-center gap-3">
                  <TruckIcon
                    className="cursor-pointer inline-block size-6 font-semibold text-gray-600 hover:text-gray-900 mx-1"
                    onClick={() => onFulfillSelected(order._id)}
                  />
                  <ArrowUturnDownIcon
                    className="cursor-pointer inline-block size-6 font-semibold text-gray-600 hover:text-gray-900 mx-1"
                    onClick={() => onReturnSelected(order._id)}
                  />
                  <BanknotesIcon
                    className="cursor-pointer inline-block size-6 font-semibold text-gray-600 hover:text-gray-900 mx-1"
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
