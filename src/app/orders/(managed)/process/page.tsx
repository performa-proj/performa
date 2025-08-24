"use client";

import React from "react";
import ProcessOrdersTable from "@/containers/Orders/ProcessOrders/ProcessOrdersTable";
import FulfillOrder from "@/containers/Orders/ProcessOrders/FulfillOrder";
import { ProcessOrders } from "@/containers/Orders/ProcessOrders";
import { ReturnForm } from "@/containers/Orders/ProcessOrders/ReturnOrder";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";

export default function Page() {
  const [isLoading, setLoading] = React.useState(false);
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
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const data = await ProcessOrders.listOrders();
    setOrders(data);

    setLoading(false);
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

  const handleFulfillUpdated = (data: {
    _id: string;
    fulfilling: {
      completed: boolean;
      vehicle?: {
        plate: string;
        weight: {
          initial: number;
          loaded: number;
        };
      };
      data: {
        [sku: string]: {
          count: number;
          completed: boolean;
        };
      };
      weight: number;
    };
  }) => {
    const nOrders = [...orders];
    const order = nOrders[fulfillSelected.index];
    order.fulfilling = data.fulfilling;
    
    setFulfillSelected({
      ...fulfillSelected,
      fulfillOrder: order,
    });

    setOrders(nOrders);
  };

  const handleReturnUpdated = (data: {
    _id: string;
    returning: {
      data: {
        [sku: string]: {
          quantity: number;
          line: IProductItemLine;
        };
      };
      total: number;
    };
  }) => {
    const nOrders = [...orders];
    nOrders[returnSelected.index].returning = data.returning;
    setOrders(nOrders);

    setReturnSelected({
      index: -1,
      returnOrder: undefined,
    });
  };

  return (
    <div className="w-full h-full">
      {(fulfillSelected.fulfillOrder === undefined && returnSelected.returnOrder === undefined) && (
        <ProcessOrdersTable
          isLoading={isLoading}
          orders={orders}
          onReloading={() => loadData()}
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
          onUpdated={handleFulfillUpdated}
        />
      )}
      {returnSelected.returnOrder && (
        <ReturnForm
          order={returnSelected.returnOrder}
          onClose={() => setReturnSelected({
            index: -1,
            returnOrder: undefined,
          })}
          onUpdated={handleReturnUpdated}
        />
      )}
    </div>
  );
}
