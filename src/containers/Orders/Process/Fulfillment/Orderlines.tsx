"use client";

import React from "react";
import { classnames } from "@/containers/core/classnames";
import { IOrder } from "@/services/Orders/IOrder";

export default function Orderlines({
  order,
  counts,
  onCounter,
}: {
  order: IOrder;
  counts: number[];
  onCounter: (index: number) => void;
}) {
  return (
    <div className="border-y border-gray-300">
      <table className="relative min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="p-2 text-sm font-normal text-gray-900 text-right">
              QTY.
            </th>
            <th scope="col" className="p-2 text-sm font-normal text-gray-900 text-left">
              Title
            </th>
            <th scope="col" className="p-2 text-sm font-normal text-gray-900 text-left">
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {order.orderlines.map((each, index) => (
            <tr
              key={each.sku}
              className="bg-white hover:bg-gray-50"
              onClick={() => onCounter(index)}
            >
              <td
                scope="col"
                className="px-2 py-3 text-right"
              >
                <p className="text-sm font-semibold text-gray-900">{each.quantity}</p>
              </td>
              <td
                scope="col"
                className="px-2 py-3 text-left"
              >
                <div className="block sm:flex sm:grow">
                  <p className="text-sm font-semibold text-gray-900">{each.label}</p>
                </div>
              </td>
              <td
                scope="col"
                className="p-2"
              >
                <div className="flex flex-1 p-1 min-w-8 text-sm font-semibold text-gray-600 bg-gray-200 justify-center">
                  {counts[index]}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
