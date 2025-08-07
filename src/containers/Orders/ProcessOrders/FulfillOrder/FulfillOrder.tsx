"use client";

import React from "react";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import CounterDialog from "./CounterDialog";

export default function FulfillOrder({
  order,
  onFulfilled,
  onBack,
}: {
  order: IProcessOrder;
  onFulfilled: (orderID: string) => void;
  onBack: () => void;
}) {
  const [state, setState] = React.useState<{
    counts: { [sku: string]: number; };
    orderlineIndex: number;
  }>({
    counts: order.orderlines.reduce((result, line) => {
      result[line.sku] = 0;

      return result;
    }, {} as { [sku: string]: number; }),
    orderlineIndex: -1,
  });

  const handleOrderlineSelected = (index: number) => {
    setState({
      ...state,
      orderlineIndex: index,
    });
  };

  return (
    <div className="bg-white w-full h-full">
      <div className="flex px-4 sm:px-6 py-3 border-b border-gray-200">
        <button
          className="cursor-pointer text-gray-600 hover:text-gray-900 -ml-2 mr-2"
          onClick={onBack}
        >
          <ChevronLeftIcon className="size-4.5 sm:size-5" />
        </button>
        <p className="text-base font-semibold text-gray-900">
          Fulfill Order: {order.transactionID}
        </p>
      </div>
      <div>
        <table className="relative min-w-full divide-y divide-gray-200 border-b border-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
                QTY.
              </th>
              <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
                Title
              </th>
              <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">
                Count
              </th>
              <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.orderlines.map((each, index) => (
              <tr
                key={each.sku}
                className="bg-white hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOrderlineSelected(index)}
              >
                <td
                  scope="col"
                  className="px-3 py-3.5 text-sm font-medium text-gray-900 text-left"
                >
                  {each.quantity}
                </td>
                <td
                  scope="col"
                  className="px-3 py-3.5 text-sm font-medium text-gray-900 text-left"
                >
                  {each.label}
                </td>
                <td
                  scope="col"
                  className="px-3 py-3.5 text-sm font-medium text-gray-900 text-center"
                >
                  {state.counts[each.sku]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CounterDialog
        open={state.orderlineIndex !== -1}
        data={{
          index: state.orderlineIndex,
          sku: order.orderlines[state.orderlineIndex]?.sku || "",
          label: order.orderlines[state.orderlineIndex]?.label || "",
          quantity: order.orderlines[state.orderlineIndex]?.quantity || 0,
          count: state.counts[order.orderlines[state.orderlineIndex]?.sku || ""],
        }}
        onClose={(count) => {
          const updatedCounts = { ...state.counts };
          const sku = order.orderlines[state.orderlineIndex]?.sku;
          if (sku) {
            updatedCounts[sku] = count;
          }
          setState({ ...state, counts: updatedCounts, orderlineIndex: -1 });
        }}

      />
    </div>
  );
}
