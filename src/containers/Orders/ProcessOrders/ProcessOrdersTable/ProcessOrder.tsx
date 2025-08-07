"use client";

import React from "react";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import ActionsMenu from "./ActionsMenu";

export default function ProcessOrder({
  order,
  onFulfillSelected,
  onReturnSelected,
}: {
  order: IProcessOrder;
  onFulfillSelected: (orderID: string) => void;
  onReturnSelected: (orderID: string) => void;
}) {
  return (
    <div
      className="flex px-4 sm:px-6 py-2"
    >
      <div className="grow space-y-1.5">
        <p className="text-base/6 font-medium text-gray-900">
          {order.customer ? order.customer.name : "[Walk-In]"}
        </p>
        <p className="flex items-baseline text-sm font-medium text-gray-600">
          Total:
          <span className="px-2 text-base/6 font-medium text-gray-900">
            {order.total.toLocaleString()}
          </span>
        </p>
      </div>
      <div className="flex items-center">
        <ActionsMenu
          order={order}
          onFulfill={onFulfillSelected}
          onReturn={onReturnSelected}
        />
      </div>
    </div>
  );
}
