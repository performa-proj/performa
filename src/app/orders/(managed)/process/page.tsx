"use client";

import React from "react";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { ProcessOrders } from "@/containers/Orders/ProcessOrders";
import ProcessOrdersTable from "@/containers/Orders/ProcessOrders/ProcessOrdersTable";
import FulfillOrder from "@/containers/Orders/ProcessOrders/FulfillOrder";
import ReturnOrder from "@/containers/Orders/ProcessOrders/ReturnOrder";

export default function Page() {
  const [orders, setOrders] = React.useState<IProcessOrder[]>([]);
  const [fulfillSelected, setFulfillSelected] = React.useState<{
    index: number;
    fulfillOrder: IProcessOrder | undefined;
  }>({
    index: -1,
    fulfillOrder: undefined,
  });
  const [returnSelected, setReturnSelected] = React.useState<{
    index: number;
    returnOrder: IProcessOrder | undefined;
  }>({
    index: -1,
    returnOrder: undefined,
  });

  React.useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await ProcessOrders.listOrders();

    setOrders(data);
  };

  const handleFulfillSelected = (orderID: string) => {
    const index = orders.findIndex(order => order._id === orderID);

    if (index !== -1) {
      setFulfillSelected({
        index,
        fulfillOrder: orders[index],
      });
    }
  };

  const handleReturnSelected = (orderID: string) => {
    const index = orders.findIndex(order => order._id === orderID);

    if (index !== -1) {
      setReturnSelected({
        index,
        returnOrder: orders[index],
      });
    }
  };

  const handleFulfillUpdated = (order: IProcessOrder) => {
    const nOrders = [...orders];
    nOrders[fulfillSelected.index] = order;
    setOrders(nOrders);

    setFulfillSelected({
      ...fulfillSelected,
      fulfillOrder: order,
    });
  };

  return (
    <div className="w-full h-full">
      {(fulfillSelected.fulfillOrder === undefined && returnSelected.returnOrder === undefined) && (
        <ProcessOrdersTable
          orders={orders}
          onFulfillSelected={handleFulfillSelected}
          onReturnSelected={handleReturnSelected}
        />
      )}
      {fulfillSelected.fulfillOrder && (
        <FulfillOrder
          order={fulfillSelected.fulfillOrder}
          onClose={() => setFulfillSelected({
            index: -1,
            fulfillOrder: undefined,
          })}
          onUpdate={handleFulfillUpdated}
        />
      )}
      {returnSelected.returnOrder && (
        <ReturnOrder
          order={returnSelected.returnOrder}
          onClose={() => setReturnSelected({
            index: -1,
            returnOrder: undefined,
          })}
        />
      )}
    </div>
  );
}
