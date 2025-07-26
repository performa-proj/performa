"use client";

import React from "react";

import DialogBase from "@/containers/core/DialogBase";
import { IOrderData } from "@/services/Orders/IOrderData";
import { IOrdering } from "@/services/Orders/IOrdering";
import { IOrderline } from "@/services/Orders/IOrderline";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";
import { summarizeOrder } from "./summarizeOrder";

const OrderTypes = [
  { label: "RO", value: "regular" },
  { label: "PO", value: "preorder" },
];

const Handlings = [
  { label: "Storefront", value: "storefront" },
  { label: "Delivery", value: "delivery" },
];

export default function OrderPostDialog({
  open,
  data: {
    orderData,
    ordering,
  },
  onPreordering,
  onPosting,
  onClose,
}: {
  open: boolean;
  data: {
    orderData: IOrderData;
    ordering: IOrdering;
  };
  onPreordering: (data: {
    customer: {
      id: string;
      name: string;
      mobile: string;
      creditDays: number;
      creditLimit: number;
      creditSpent: number;
    };
    level: number;
    lines: {
      [sku: string]: {
        quantity: number;
        line: IProductItemLine;
        sellingAt: number | undefined;
      };
    };
  }) => void;
  onPosting: (data: {
    level: number;
    customer: {
      id: string;
      name: string;
      mobile: string;
      creditDays: number;
    } | undefined;
    orderlines: IOrderline[];
    weight: number;
    total: number;
  }) => void;
  onClose: () => void;
}) {
  console.log(ordering);
  const [state, setState] = React.useState({
    type: "regular",
    handling: "storefront",
    payment: {
      cash: "0",
      transfer: "0",
      acc: "0",
    },
  });

  const { weight, total } = summarizeOrder(ordering.orderlines);

  const flags = {
    preorderable: ordering.customer ? true : false,
    handling: ordering.customer && state.type === "regular" ? true : false,
  };

  const handleCashChanged = (value: string) => {
    if (value.length === 0) {
      value = "0";
    }

    const nValue = Number(value);

    if (!Number.isNaN(nValue)) {
      setState({
        ...state,
        payment: {
          ...state.payment,
          cash: value,
        },
      });
    }
  };

  const handlePosting = () => {
    if (state.type === "preorder" && orderData.customer) {
      onPreordering({
        customer: {
          id: orderData.customer.id,
          name: orderData.customer.name,
          mobile: orderData.customer.mobile,
          creditDays: orderData.customer.creditDays,
          creditLimit: orderData.customer.creditLimit,
          creditSpent: orderData.customer.creditSpent,
        },
        level: orderData.level,
        lines: orderData.lines,
      });
    } else {
      onPosting({
        level: ordering.level,
        customer: ordering.customer ? {
          id: ordering.customer.id,
          name: ordering.customer.name,
          mobile: ordering.customer.mobile,
          creditDays: ordering.customer.creditDays,
        } : undefined,
        orderlines: ordering.orderlines,
        weight: weight,
        total: total,
      });
    }
  };

  const handleClosed = () => {
    onClose();

    setState({
      type: "regular",
      handling: "storefront",
      payment: {
        cash: "0",
        transfer: "0",
        acc: "0",
      },
    });
  };

  return (
    <DialogBase
      title="Post Order"
      open={open}
      onClose={handleClosed}
      submitButton={{
        title: "Post",
        onSubmit: handlePosting,
      }}
    >
      <div>
        {flags.preorderable && (
          <div className="py-0.5 grid grid-cols-3 gap-4">
            <div className="flex items-center text-sm font-medium text-gray-600">
              Type
            </div>
            <div className="col-span-2">
              <div className="flex items-center space-x-2">
                {OrderTypes.map((type) => (
                  <label
                    key={type.value}
                    className="group relative flex items-center justify-center rounded-sm border border-gray-300 bg-white px-1.5 py-1 has-[:checked]:border-blue-600 has-[:checked]:text-blue-600 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-600"
                  >
                    <input
                      name="order-type"
                      type="radio"
                      className="absolute inset-0 appearance-none focus:outline-0"
                      value={type.value}
                      checked={type.value === state.type}
                      onChange={(e) => {
                        setState({
                          ...state,
                          type: e.currentTarget.value,
                        });
                      }}
                    />
                    <span className="text-sm font-semibold text-gray-600 uppercase group-has-[:checked]:text-blue-600">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        <dl className="divide-y divide-gray-200">
          <div className="py-2 grid grid-cols-3 gap-4">
            <dt className="text-sm/6 font-medium text-gray-600">Customer</dt>
            <dd className="col-span-2 text-sm/6 font-semibold text-gray-900">
              {orderData.customer ? orderData.customer.name : "[Walk-In]"}
            </dd>
          </div>

          <div className="py-2 grid grid-cols-3 gap-4">
            <dt className="text-sm/6 font-medium text-gray-600">Total</dt>
            <dd className="col-span-2 text-sm/6 font-semibold text-gray-900">
              {total.toLocaleString()} B.
            </dd>
          </div>

          {flags.handling && (
            <div className="py-2 grid grid-cols-3 gap-4">
              <dt className="text-sm/6 font-medium text-gray-600">Process</dt>
              <dd className="col-span-2">
                <div className="flex items-center space-x-6 space-y-0">
                  {Handlings.map((handling) => (
                    <div
                      key={handling.value}
                      className="flex items-center"
                      onClick={() => {
                        setState({
                          ...state,
                          handling: handling.value,
                        });
                      }}
                    >
                      <input
                        id={handling.value}
                        name="handling"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        checked={handling.value === state.handling}
                        value={handling.value}
                        onChange={(e) => {
                          setState({
                            ...state,
                            handling: e.currentTarget.value,
                          });
                        }}
                      />
                      <label className="ml-1.5 block text-sm/6 font-medium text-gray-900">
                        {handling.label}
                      </label>
                    </div>
                  ))}
                </div>
              </dd>
            </div>
          )}

          <div className="py-2">
            <p className="text-sm my-1 font-semibold text-gray-900">Payment</p>

            <div className="py-1.5 grid grid-cols-3 gap-4">
              <dt className="pl-1.5 text-sm/6 font-medium text-gray-600">Cash</dt>
              <dd className="col-span-2 text-sm/6 font-semibold text-gray-900">
                <input
                  type="text"
                  className="w-full bg-white text-gray-900 border-b border-gray-200 focus:outline-0 focus:border-blue-600"
                  value={state.payment.cash}
                  onChange={(e) => handleCashChanged(e.currentTarget.value)}
                />
              </dd>
            </div>

            <div className="py-1.5 grid grid-cols-3 gap-4">
              <dt className="pl-1.5 text-sm/6 font-medium text-gray-600">Transfer</dt>
              <dd className="col-span-2 text-sm/6 font-semibold text-gray-900">
                <input
                  type="text"
                  className="w-full bg-white text-gray-900 border-b border-gray-200 focus:outline-0 focus:border-blue-600"
                  value={state.payment.transfer}
                  onChange={(e) => handleCashChanged(e.currentTarget.value)}
                />
              </dd>
            </div>

            <div className="py-1.5 grid grid-cols-3 gap-4">
              <dt className="pl-1.5 text-sm/6 font-medium text-gray-600">A/C Credit</dt>
              <dd className="col-span-2 text-sm/6 font-semibold text-gray-900">
                <input
                  type="text"
                  className="w-full bg-white text-gray-900 border-b border-gray-200 focus:outline-0 focus:border-blue-600"
                />
              </dd>
            </div>
          </div>
        </dl>
      </div >
    </DialogBase >
  );
}
