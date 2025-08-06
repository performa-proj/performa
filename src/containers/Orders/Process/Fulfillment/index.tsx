"use client";

import React from "react";
import { classnames } from "@/containers/core/classnames";
import { IPlacedOrder } from "@/services/PlacedOrders/IPlacedOrder";
import Orderlines from "./Orderlines";
import OrderlineCounterDialog from "./OrderlineCounterDialog";

export default function Fulfillment({
  order,
}: {
  order: IPlacedOrder;
}) {
  const [state, setState] = React.useState<{
    counts: number[];
    counter: {
      index: number;
      sku: string;
      label: string;
      quantity: number;
      count: number;
    } | undefined;
  }>({
    counts: new Array(order.orderlines.length).fill(0),
    counter: undefined,
  });

  const handleCounter = (index: number) => {
    const orderline = order.orderlines[index];

    setState({
      ...state,
      counter: {
        index,
        sku: orderline.sku,
        label: orderline.label,
        quantity: orderline.quantity,
        count: state.counts[index],
      },
    });
  };

  const handleCounterClosed = (count: number) => {
    setState({
      ...state,
      counter: undefined,
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex px-4 sm:px-6 py-2 border-b border-gray-200">
        &nbsp;
      </div>
      <div className="flex-1 px-4 sm:px-6 py-2">
        <div className="flex gap-x-2">
          <p className="text-sm sm:text-base font-normal text-gray-900">Transaction ID:</p>
          <p className="text-sm sm:text-base font-semibold text-gray-900">{order.transactionID.toString()}</p>
        </div>
        <div>
          <Orderlines
            order={order}
            counts={state.counts}
            onCounter={handleCounter}
          />
        </div>
      </div>
      {state.counter && (
        <OrderlineCounterDialog
          open={state.counter !== undefined}
          data={state.counter}
          onClose={handleCounterClosed}
        />
      )}
    </div>
  );
}
