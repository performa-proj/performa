"use client";

import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Products } from "@/containers/Products";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { IReturnline } from "@/services/Orders/IReturnline";
import { resolveReturning } from "@/services/Orders/resolveReturning";

import ReturnOrderSection from "./core/ReturnOrderSection";
import ReturnOrderlineDialog from "./core/ReturnOrderlineDialog";
import { updateReturn } from "../updateReturn";

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
    lines: IReturnline[];
    weight: number;
    total: number;
  };
  editReturnline: {
    quantity: number;
    sku: string;
    label: string;
  } | undefined;
}

export default function ReturnForm({
  order,
  onClose,
  onUpdated,
}: {
  order: IProcessOrder;
  onClose: () => void;
  onUpdated: (data: {
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
  }) => void;
}) {
  const [state, setState] = React.useState<IState>(order.returning ? {
    returnData: {
      level: order.level,
      lines: order.returning.data,
    },
    returning: resolveReturning({
      level: order.level,
      lines: order.returning.data,
    }),
    editReturnline: undefined,
  } : {
    returnData: {
      level: order.level,
      lines: {},
    },
    returning: {
      lines: [],
      weight: 0,
      total: 0,
    },
    editReturnline: undefined,
  });

  console.log(state);

  const handleProductSearching = async (value: string) => {
    const args = value.split(",").map(i => i.trim());
    const quantity = Number(args[1]) || 1;
    const sku = args[0];

    const nState: IState = {
      ...state,
    };

    if (nState.returnData.lines[sku]) {
      nState.returnData.lines[sku].quantity += quantity;

      nState.returning = resolveReturning(nState.returnData);
      setState(nState);
    } else {
      const data = await Products.Items.searchBySKU({ sku });

      if (data) {
        nState.returnData.lines[sku] = {
          quantity,
          line: data,
        };

        nState.returning = resolveReturning(nState.returnData);
        setState(nState);
      } else {
        // Handle SKU-Not-Found
      }
    }
  };

  const handleReturnlineOpened = (sku: string) => {
    const { line, quantity } = state.returnData.lines[sku];

    setState({
      ...state,
      editReturnline: {
        sku: line.sku,
        label: line.label,
        quantity,
      },
    });
  };

  const handleReturnlineClosed = () => {
    setState({
      ...state,
      editReturnline: undefined,
    });
  };

  const handleReturnlineDeleted = (data: {
    sku: string;
  }) => {
    const { sku } = data;
    const nState: IState = {
      ...state,
    };

    delete nState.returnData.lines[sku];
    nState.returning = resolveReturning(nState.returnData);
    nState.editReturnline = undefined;
    setState(nState);
  };

  const handleReturnlineUpdated = (data: {
    sku: string;
    quantity: number;
  }) => {
    const { sku, quantity } = data;
    const nState: IState = {
      ...state,
    };

    nState.returnData.lines[sku].quantity = quantity;
    nState.returning = resolveReturning(nState.returnData);
    nState.editReturnline = undefined;
    setState(nState);
  };

  const handlePosting = async () => {
    const payloads = {
      _id: order._id,
      data: state.returnData.lines,
      total: state.returning.total,
    };

    const result = await updateReturn(payloads);

    onUpdated(result);
  };

  return (
    <div className="flex flex-col bg-white w-full h-full">
      <div className="flex px-4 py-1.5 border-b border-gray-200">
        <button
          className="cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <ChevronLeftIcon className="size-4.5 sm:size-5" />
        </button>
        <p className="text-base/8 font-semibold text-gray-900 mx-1.5">
          Return Order: {order.transactionID}
        </p>
      </div>

      <div className="flex flex-col grow py-1.5">
        <div className="flex items-center px-4 py-1.5">
          <div className="grow">
            <p className="text-base font-normal text-gray-900">
              Customer:
              <span className="font-semibold px-1.5">{order.customer ? `${order.customer.name} / ${order.level}` : "[Walk-In]"}</span>
            </p>
          </div>
          <button
            type="button"
            className="min-w-15 sm:min-w-20 flex shrink-0 items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            onClick={handlePosting}
          >
            Post
          </button>
        </div>

        <div className="flex grow px-4">
          <ReturnOrderSection
            ordering={{
              weight: order.ordering.weight,
              total: order.ordering.total,
            }}
            returnData={state.returnData}
            returning={state.returning}
            onSearching={handleProductSearching}
            onEditing={handleReturnlineOpened}
          />
        </div>
      </div>

      {state.editReturnline && (
        <ReturnOrderlineDialog
          open={state.editReturnline !== undefined}
          predata={state.editReturnline}
          onDelete={handleReturnlineDeleted}
          onUpdated={handleReturnlineUpdated}
          onClose={handleReturnlineClosed}
        />
      )}
    </div>
  );
}
