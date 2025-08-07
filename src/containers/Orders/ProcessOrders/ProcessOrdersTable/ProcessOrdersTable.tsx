"use client";

import React from "react";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import ProcessOrder from "./ProcessOrder";
import { BanknotesIcon, TruckIcon } from "@heroicons/react/24/outline";

const PoD = ({
  value,
}: {
  value: boolean;
}) => {
  if (value) {
    return (
      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        PoD
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
  return (
    <div className="bg-white h-full w-full">
      <table className="relative min-w-full divide-y divide-gray-200 border-b border-gray-200">
        <thead>
          <tr>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left w-35">
              Transaction ID
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
              Customer
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
              Total / Weight
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">
              Payment
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center w-30">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id} className="">
              <td className="px-3 py-4 text-sm/6 font-normal text-gray-900 text-left w-35">{order.transactionID}</td>
              <td className="px-3 py-4 text-sm/6 font-semibold text-gray-900 text-left">
                {order.customer ? order.customer.name : "[Walk-In]"}
              </td>
              <td className="px-3 py-4 text-sm/6 font-medium text-gray-900">{order.total.toLocaleString()} / {order.weight.toLocaleString()} KG.</td>
              <td className="px-3 py-4">
                <div className="flex items-center justify-center">
                  <PoD value={order.pod} />
                </div>
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center justify-center gap-3">
                  <TruckIcon
                    className="cursor-pointer inline-block size-6 font-semibold text-gray-600 hover:text-gray-900 mx-1"
                    onClick={() => onFulfillSelected(order._id)}
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
