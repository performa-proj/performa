"use client";

import React from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";

import Slip from "./Slip";

export default function Documents({
  order,
}: {
  order: IProcessOrder;
}) {
  const [state, setState] = React.useState({
    view: "detail",
  });

  return (
    <div className="h-full w-full bg-white">
      <div className="print:hidden flex px-4 py-2 border-b border-gray-400">
        <div className="flex items-center grow">
          <h1 className="hidden sm:block text-lg font-semibold text-gray-900">Order: </h1>
          <p className="px-1 font-medium">#{order.transactionID}</p>
        </div>
        <div className="flex items-center">
          <label htmlFor="view" className="block text-sm/6 font-medium text-gray-900 px-2">
            View as:
          </label>
          <div className="grid grid-cols-1">
            <select
              id="view"
              name="view"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 sm:text-sm/6"
              value={state.view}
              onChange={(e) => {
                setState({
                  ...state,
                  view: e.currentTarget.value,
                });
              }}
            >
              <option value="detail">Order Detail</option>
              <option value="slip">Order Slip</option>
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
        </div>
      </div>
      {state.view === "slip" && (
        <Slip order={order} />
      )}
    </div>
  );
}
