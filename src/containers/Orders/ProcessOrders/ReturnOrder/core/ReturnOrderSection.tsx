"use client";

import React from "react";

import { IOrderData } from "@/services/Orders/IOrderData";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { IOrderline } from "@/services/Orders/IOrderline";
import { resolveNumber } from "@/containers/core/resolveNumber";
import { classnames } from "@/containers/core/classnames";
import Returnlines from "./Returnlines";
import ProductSearch from "@/containers/Products/ProductSearch";
import { Products } from "@/containers/Products";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";
import { IReturnline } from "@/services/Orders/IReturnline";
import { resolveReturning } from "@/services/Orders/resolveReturning";

interface IState {
  returnData: {
    level: number;
    lines: {
      [sku: string]: {
        quantity: number;
        line: IProductItemLine;
      };
    };
  };
  returning: {
    returnlines: IReturnline[];
    total: number;
  };
}

export default function ReturnOrderSection({
  order,
}: {
  order: IProcessOrder;
}) {
  const [state, setState] = React.useState<IState>({
    returnData: {
      level: order.level,
      lines: {},
    },
    returning: {
      returnlines: [],
      total: 0,
    },
  });

  const handleProductSearching = async (value: string) => {
    const args = value.split(",").map(i => i.trim());
    const quantity = Number(args[1]) || 1;
    const sku = args[0];

    const nState = {
      ...state,
    };

    const line = await Products.Items.searchBySKU({ sku });

    if (line) {
      nState.returnData.lines[sku] = {
        quantity,
        line,
      };

      nState.returning.returnlines = resolveReturning(nState.returnData)
    }

    console.log(nState);

    setState(nState);
  };

  const handleOrderlineOpened = (sku: string) => {
    console.log(sku);
  };

  console.log(order);
  console.log(state);

  return (
    <div className="w-full h-full">
      <div className="w-full py-1.5">
        <ProductSearch
          onSearching={handleProductSearching}
        />
      </div>

      <div className="w-full py-1.5">
        <Returnlines
          returnlines={state.returning.returnlines}
          onEditing={handleOrderlineOpened}
        />
      </div>
    </div>
  );
}
