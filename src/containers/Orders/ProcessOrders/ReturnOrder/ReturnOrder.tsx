"use client";

import React from "react";
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { resolveNumber } from "@/containers/core/resolveNumber";
import { classnames } from "@/containers/core/classnames";
import ProductSearch from "@/containers/Products/ProductSearch";
import Orderlines from "./core/Returnlines";
import ReturnOrderSection from "./core/ReturnOrderSection";

export default function ReturnOrder({
  order,
  onClose,
}: {
  order: IProcessOrder;
  onClose: () => void;
}) {

  const handleOrderlineOpened = (sku: string) => {
    console.log(sku);
  };

  return (
    <div className="bg-white w-full h-full py-2">
      <div className="flex px-4 py-1.5 border-b border-gray-200">
        <button
          className="cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <ChevronLeftIcon className="size-4.5 sm:size-5" />
        </button>
        <p className="text-base font-semibold text-gray-900 mx-1.5">
          Return Order: {order.transactionID}
        </p>
      </div>

      <div className="flex px-4 py-1.5">
        <p className="text-base font-normal text-gray-900">
          Customer:
          <span className="font-semibold px-1.5">{order.customer?.name || "[Walk-In]"}</span>
        </p>
      </div>

      <div className="flex px-4">
        <ReturnOrderSection
          order={order}
        />
      </div>
    </div>
  );
}
