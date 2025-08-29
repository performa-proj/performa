"use client";

import React from "react";

import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { resolveProcessOrder } from "@/services/Orders/ProcessOrders/resolveProcessOrder";

export default function Orderlines({
  order
}: {
  order: IProcessOrder;
}) {

  const resolvable = resolveProcessOrder(order);

  return (
    <table className="w-full border-y border-gray-400 divide-y divide-gray-400">
      <thead>
        <tr>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
            QTY.
          </th>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-left">
            Title
          </th>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
            Price
          </th>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
            Total
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-300">
        {resolvable.ordering.lines.map((each) => {
          const sellingTotal = each.count * each.sellingAt;

          return (
            <tr key={each.sku}>
              <td
                scope="col"
                className="p-2 text-right"
              >
                <p className="text-sm/6 font-medium text-gray-900">{each.count}</p>
              </td>
              <td
                scope="col"
                className="p-2 text-left"
              >
                <div className="block">
                  <p className="text-sm/6 font-medium text-gray-900">[{each.sku}] {each.label}</p>
                </div>
              </td>
              <td
                scope="col"
                className="p-2 text-right"
              >
                <p className="text-sm/6 font-medium text-gray-900">{each.sellingAt.toLocaleString()}.00</p>
              </td>
              <td
                scope="col"
                className="p-2 text-right"
              >
                <p className="text-sm/6 font-medium text-gray-900">{sellingTotal.toLocaleString()}.00</p>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="border-t border-gray-400">
          <th
            scope="row"
            colSpan={3}
            className="p-2 text-left"
          >
            <div className="flex items-baseline">
              <p className="text-sm/6 font-semibold text-gray-900">Total</p>
              <p className="mx-2 text-sm/6 font-semibold text-gray-900">[<span>{resolvable.ordering.weight} KG</span>]</p>
            </div>
          </th>
          <th
            scope="row"
            className="p-2 text-right"
          >
            <div className="text-base font-semibold text-gray-900">{resolvable.ordering.total.toLocaleString()}.00</div>
          </th>
        </tr>
      </tfoot>
    </table>
  );
}