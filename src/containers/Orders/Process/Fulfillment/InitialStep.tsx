"use client";

import React from "react";
import { classnames } from "@/containers/core/classnames";
import { IPlacedOrder } from "@/services/PlacedOrders/IPlacedOrder";

export default function Fulfillment({
  order,
}: {
  order: IPlacedOrder;
}) {
  return (
    <div className="w-full h-full">
      <div className="flex px-4 sm:px-6 py-2 border-b border-gray-200">
      </div>
      <div className="px-4 sm:px-6 py-2">
        <div className="flex gap-x-2">
          <p className="text-sm sm:text-base font-normal text-gray-900">Transaction ID:</p>
          <p className="text-sm sm:text-base font-semibold text-gray-900">{order.transactionID.toString()}</p>
        </div>
      </div>
    </div>
  );
}
