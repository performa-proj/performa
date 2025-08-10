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
      returnlines: []
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

  };
  console.log(state);

  const handleOrderlineOpened = (sku: string) => {
    console.log(sku);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full py-1.5">
        <ProductSearch
          onSearching={handleProductSearching}
        />
      </div>

      <div className="w-full py-1.5">
        <table className="w-full border-y border-gray-300 divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
                QTY.
              </th>
              <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-left">
                Title
              </th>
              <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
                Price
              </th>
              <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <Returnlines
              returnlines={state.returning.returnlines}
              onEditing={handleOrderlineOpened}
            />
          </tbody>
          <tfoot>
            <tr>
              <td
                scope="row"
                colSpan={3}
                className="p-2 text-left"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Order Total
                </div>
              </td>
              <td
                scope="row"
                className="p-2 text-right"
              >
                <div className="text-sm font-semibold text-gray-900">
                  {order.total}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
