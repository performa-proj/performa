"use client";

import React from "react";
import OrderSearch from "@/containers/Orders/RegularOrders/OrderSearch";
import Fulfillment from "@/containers/Orders/Process/Fulfillment";
import { IOrder } from "@/services/Orders/IOrder";

export default function Page() {
  const [order, setOrder] = React.useState<IOrder | undefined>(undefined);

  return (
    <div className="w-full h-full">
      {order ? (
        <Fulfillment
          order={order}
        />
      ) : (
        <div className="flex justify-center py-6 px-4">
          <OrderSearch
            onSearch={(order) => {
              setOrder(order)
            }}
          />
        </div>
      )}
    </div>
  );
}
