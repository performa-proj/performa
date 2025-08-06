"use client";

import React from "react";

import DialogBase from "@/containers/core/DialogBase";
import { resolveNumber } from "@/containers/core/resolveNumber";
import { IOrderData } from "@/services/PlacedOrders/IOrderData";
import { IOrdering } from "@/services/PlacedOrders/IOrdering";
import { IOrderline } from "@/services/PlacedOrders/IOrderline";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";
import { summarizeOrder } from "./summarizeOrder";

const OrderTypes = [
  { label: "RO", value: "regular" },
  { label: "PO", value: "preorder" },
];

const Processes = [
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
      creditLimit: number;
      creditSpent: number;
    } | undefined;
    orderlines: IOrderline[];
    process: string;
    pod: boolean;
    weight: number;
    total: number;
  }) => void;
  onClose: () => void;
}) {
  const [state, setState] = React.useState({
    type: "regular",
    process: "storefront",
    pod: false,
    payment: {
      cash: "0",
      transfer: "0",
      acc: "0",
    },
  });
  const { customer, orderlines } = ordering;
  const { weight, total } = summarizeOrder(orderlines);

  const handleCashChanged = (value: string) => {
    setState({
      ...state,
      payment: {
        ...state.payment,
        cash: resolveNumber(state.payment.cash, value),
      },
    });
  };

  const handleTransferChanged = (value: string) => {
    if (value.length === 0) {
      value = "0";
    }

    const nValue = Number(value);

    if (!Number.isNaN(nValue)) {
      setState({
        ...state,
        payment: {
          ...state.payment,
          transfer: value,
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
          creditLimit: ordering.customer.creditLimit,
          creditSpent: ordering.customer.creditSpent,
        } : undefined,
        orderlines: ordering.orderlines,
        process: state.process,
        pod: state.pod,
        weight: weight,
        total: total,
      });
    }
  };

  const handleClosed = () => {
    onClose();

    setState({
      type: "regular",
      process: "storefront",
      pod: false,
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
        {customer && (
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
              {customer ? customer.name : "[Walk-In]"}
            </dd>
          </div>

          <div className="py-2 grid grid-cols-3 gap-4">
            <dt className="text-sm/6 font-medium text-gray-600">Total</dt>
            <dd className="col-span-2 text-sm/6 font-semibold text-gray-900">
              {total.toLocaleString()} B.
            </dd>
          </div>

          <div className="py-2 grid grid-cols-3 gap-4">
            <dt className="text-sm/6 font-medium text-gray-600">Process</dt>
            <dd className="col-span-2">
              <div className="flex items-center space-x-6 space-y-0">
                {Processes.map((each) => (
                  <div
                    key={each.value}
                    className="flex items-center"
                    onClick={() => {
                      setState({
                        ...state,
                        process: each.value,
                      });
                    }}
                  >
                    <input
                      id={each.value}
                      name="handling"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      checked={each.value === state.process}
                      value={each.value}
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        if (value === "storefront") {
                          setState({
                            ...state,
                            pod: false,
                            process: value,
                          });
                        } else {
                          setState({
                            ...state,
                            process: value,
                          });
                        }
                      }}
                    />
                    <label className="ml-1.5 block text-sm/6 font-medium text-gray-900">
                      {each.label}
                    </label>
                  </div>
                ))}
              </div>

              {state.process === "delivery" && (
                <div className="flex gap-3 pt-1.5">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="pod"
                        name="pod"
                        type="checkbox"
                        aria-describedby="pay-on-delivery"
                        checked={state.pod}
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        onChange={() => {
                          setState({
                            ...state,
                            pod: !state.pod,
                          });
                        }}
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm/6 font-normal text-gray-900">
                    Pay on Delivery (POD)
                  </p>
                </div>
              )}

            </dd>
          </div>

          {!state.pod && (
            <div className="py-2">
              <p className="text-sm my-1 font-semibold text-gray-900 py-2">Payment</p>

              <div className="py-1.5 grid grid-cols-3 gap-4">
                <dt
                  className="cursor-pointer pl-1.5 text-sm/6 font-medium text-gray-600"
                >
                  Cash
                </dt>
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
                <dt
                  className="cursor-pointer pl-1.5 text-sm/6 font-medium text-gray-600"
                >
                  Transfer
                </dt>
                <dd className="col-span-2 text-sm/6 font-semibold text-gray-900">
                  <input
                    type="text"
                    className="w-full bg-white text-gray-900 border-b border-gray-200 focus:outline-0 focus:border-blue-600"
                    value={state.payment.transfer}
                    onChange={(e) => handleTransferChanged(e.currentTarget.value)}
                  />
                </dd>
              </div>
            </div>
          )}
        </dl>
      </div >
    </DialogBase >
  );
}
