"use client";

import React from "react";

import { RegularOrders } from "@/containers/Orders/RegularOrders";
import { IPlacedOrder } from "@/services/PlacedOrders/IPlacedOrder";

export default function OrderSearch({
  onSearch,
}: {
  onSearch: (data: IPlacedOrder) => void;
}) {
  const [state, setState] = React.useState({
    type: "order",
    value: "202507310001",
  });

  const handleSearch = async () => {
    const order = await RegularOrders.findOrderByTransactionID({
      transactionID: state.value,
    });

    if (order) {
      onSearch(order);
      setState({
        type: "order",
        value: "",
      });
    }
  };

  return (
    <div className="flex">
      <div className="flex items-center rounded-l-md bg-white pl-3 -mr-px outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600 focus-within:relative">
        <div className="shrink-0 select-none text-base text-gray-600 sm:text-sm/6">
          ORDER:
        </div>
        <input
          id="qr"
          name="qr"
          type="text"
          autoComplete="off"
          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 focus:outline-0 sm:text-sm/6"
          onChange={(e) => {
            setState({
              ...state,
              value: e.currentTarget.value,
            });
          }}
          value={state.value}
        />
      </div>
      <button
        type="button"
        className="flex shrink-0 items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
