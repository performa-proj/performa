"use client";

import React from "react";

import { IReturnline } from "@/services/Orders/IReturnline";
import Returnline from "./Returnline";

const NoDataDisplay = () => (
  <tr>
    <td colSpan={4}>
      <div className="flex justify-center items-center h-32">
        <p className="text-sm/6 font-semibold text-gray-900">
          No Data
        </p>
      </div>
    </td>
  </tr>
);

export default function Returnlines({
  returnlines,
  onEditing,
}: {
  returnlines: IReturnline[];
  orderSummary: {
    t
  };
  onEditing: (sku: string) => void;
}) {
  return (
    <>
      <table className="w-full border-y border-gray-300 divide-y divide-gray-300">
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
        <tbody className="bg-white divide-y divide-gray-200">
          {returnlines.length === 0
            ? (<NoDataDisplay />)
            : (returnlines.map((each) => (
              <Returnline
                key={each.sku}
                data={each}
                onEditing={onEditing}
              />
            )))
          }
        </tbody>
        <tfoot>
          <tr>
            <td
              scope="row"
              colSpan={3}
              className="p-2 text-left"
            >
              <div className="text-sm font-medium text-gray-900">
                Order Total
              </div>
            </td>
            <td
              scope="row"
              className="p-2 text-right"
            >
              <div className="text-sm font-medium text-gray-900">
                {order.total.toLocaleString()}
              </div>
            </td>
          </tr>
          <tr>
            <td
              scope="row"
              colSpan={3}
              className="p-2 text-left"
            >
              <div className="text-sm font-semibold text-gray-900">
                Return Total
              </div>
            </td>
            <td
              scope="row"
              className="p-2 text-right"
            >
              <div className="text-sm font-semibold text-gray-900">
                {order.total.toLocaleString()}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
