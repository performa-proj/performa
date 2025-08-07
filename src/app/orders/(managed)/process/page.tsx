"use client";

import React from "react";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { ProcessOrders } from "@/containers/Orders/ProcessOrders";
import ProcessOrdersTable from "@/containers/Orders/ProcessOrders/ProcessOrdersTable";
import FulfillOrder from "@/containers/Orders/ProcessOrders/FulfillOrder";

export default function Page() {
  const [orders, setOrders] = React.useState<IProcessOrder[]>([]);
  const [fulfillSelected, setFulfillSelected] = React.useState<IProcessOrder | undefined>(undefined);
  const [returnSelected, setReturnSelected] = React.useState<IProcessOrder | undefined>(undefined);

  React.useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await ProcessOrders.listOrders();

    setOrders(data);
  };

  console.log(orders);

  const handleFulfillSelected = async (orderID: string) => {
    const index = orders.findIndex(order => order._id === orderID);

    if (index !== -1) {
      setFulfillSelected(orders[index]);
    }
  };

  const handleReturnSelected = async (orderID: string) => {
    const index = orders.findIndex(order => order._id === orderID);

    if (index !== -1) {
      setReturnSelected(orders[index]);
    }
  };

  return (
    <div className="w-full h-full">
      {fulfillSelected === undefined && (
        <ProcessOrdersTable
          orders={orders}
          onFulfillSelected={handleFulfillSelected}
          onReturnSelected={handleReturnSelected}
        />
      )}
      {fulfillSelected && (
        <FulfillOrder
          order={fulfillSelected}
          onFulfilled={(orderID) => {
            setFulfillSelected(undefined);
            loadOrders();
          }}
          onBack={() => setFulfillSelected(undefined)}
        />
      )}
    </div>
  );
}
