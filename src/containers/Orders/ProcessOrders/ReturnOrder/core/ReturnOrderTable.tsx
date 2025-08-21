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

export default function ReturnOrderTable({
  returnlines,
  summary,
  onEditing,
}: {
  returnlines: IReturnline[];
  summary: {
    ordering: {
      weight: number;
      total: number;
    };
    returning: {
      weight: number;
      total: number;
    };
  };
  onEditing: (sku: string) => void;
}) {
  const total = summary.ordering.total - summary.returning.total;

  return (
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
            className="px-2 py-1 text-left"
          >
            <div className="flex items-baseline">
              <p className="text-sm/6 font-medium text-gray-600">
                Order Total <span className="mx-2">[{summary.ordering.weight} KG]</span>
              </p>
            </div>
          </td>
          <td
            scope="row"
            className="px-2 py-1 text-right"
          >
            <p className="text-sm/6 font-medium text-gray-600">
              {summary.ordering.total.toLocaleString()}
            </p>
          </td>
        </tr>
        <tr>
          <td
            scope="row"
            colSpan={3}
            className="px-2 py-1 text-left"
          >
            <div className="flex items-baseline">
              <p className="text-sm/6 font-medium text-gray-900">
                Return Total <span className="mx-2">[{summary.returning.weight} KG]</span>
              </p>
            </div>
          </td>
          <td
            scope="row"
            className="px-2 py-1 text-right"
          >
            <div className="text-sm font-medium text-gray-900">
              ({summary.returning.total.toLocaleString()})
            </div>
          </td>
        </tr>
        <tr className="border-t border-gray-300">
          <td
            scope="row"
            colSpan={3}
            className="p-2 text-left"
          >
            <div className="flex items-baseline">
              <p className="text-base/8 font-semibold text-gray-900">
                Total
              </p>
            </div>
          </td>
          <td
            scope="row"
            className="p-2 text-right"
          >
            <p className="text-base/8 font-semibold text-gray-900">
              {total.toLocaleString()}
            </p>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
