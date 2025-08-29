"use client";

import React from "react";

import DialogBase from "@/containers/core/DialogBase";
import { resolveNumber } from "@/containers/core/resolveNumber";
import { IOrderData } from "@/services/Orders/IOrderData";
import { IOrdering } from "@/services/Orders/IOrdering";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";
import { summarizeOrderlines } from "./summarizeOrderlines";
import { resolvePayment } from "./resolvePayment";

const OrderTypes = {
  RO: { key: "RO", label: "Regular", value: "regular" },
  PO: { key: "PO", label: "Preorder", value: "preorder" },
};

interface IState {
  type: string;
  payment: {
    pod: boolean;
    cash: string;
    transfer: string;
    acc: string;
  };
}

export default function OrderPostDialog({
  open,
  data: {
    orderData,
    ordering,
  },
  onPreordering,
  onOrdering,
  onClose,
}: {
  open: boolean;
  data: {
    orderData: IOrderData;
    ordering: IOrdering;
  };
  onPreordering: (data: {
    level: number;
    customer: {
      id: string;
      name: string;
      mobile: string;
      creditDays: number;
      creditLimit: number;
      creditSpent: number;
    };
    lines: {
      [sku: string]: {
        quantity: number;
        line: IProductItemLine;
        sellingAt: number | undefined;
      };
    };
  }) => void;
  onOrdering: (data: {
    level: number;
    customer: {
      id: string;
      name: string;
      mobile: string;
      creditDays: number;
      creditLimit: number;
      creditSpent: number;
    } | undefined;
    ordering: {
      data: {
        [sku: string]: {
          quantity: number;
          line: IProductItemLine;
          sellingAt: number | undefined;
        };
      };
      weight: number;
      total: number;
    };
    payment: {
      payable: number;
      pod: boolean;
    };
  }) => void;
  onClose: () => void;
}) {
  const { orderlines } = ordering;
  const { customer } = orderData;
  const { weight, total } = summarizeOrderlines(orderlines);
  const orderTypes = customer ? [OrderTypes.RO, OrderTypes.PO] : [OrderTypes.RO];
  const [isLoading, setLoading] = React.useState(false);
  const [state, setState] = React.useState<IState>({
    type: "regular",
    payment: {
      pod: false,
      cash: "0",
      transfer: "0",
      acc: "0",
    },
  });

  const { payable, change } = resolvePayment({
    total,
    payment: {
      cash: Number(state.payment.cash),
      transfer: Number(state.payment.transfer),
      acc: Number(state.payment.acc),
    },
  });

  const handleOrderTypeChanged = (value: string) => {
    setState({
      ...state,
      type: value,
    });
  };

  const handleCashChanged = (value: string) => {
    const nState = {
      ...state,
      payment: {
        ...state.payment,
        cash: resolveNumber(state.payment.cash, value),
      },
    };

    setState(nState);
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

  const handlePODChecked = () => {
    const nState = {
      ...state,
    };

    nState.payment.pod = !nState.payment.pod;
    setState(nState);
  };

  const handlePosting = async () => {
    setLoading(true);

    if (state.type === "preorder" && orderData.customer) {
      await onPreordering({
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
      await onOrdering({
        level: ordering.level,
        customer: customer ? {
          id: customer.id,
          name: customer.name,
          mobile: customer.mobile,
          creditDays: customer.creditDays,
          creditLimit: customer.creditLimit,
          creditSpent: customer.creditSpent,
        } : undefined,
        ordering: {
          data: orderData.lines,
          weight,
          total,
        },
        payment: {
          pod: state.payment.pod,
          payable,
        },
      });
    }

    setLoading(false);
  };

  const handleClosed = () => {
    onClose();

    setState({
      type: "regular",
      payment: {
        pod: false,
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
      isLoading={isLoading}
      onClose={handleClosed}
      submitButton={{
        title: "Post",
        onSubmit: handlePosting,
      }}
    >
      <div>
        <div className="py-0.5 grid grid-cols-3 gap-4">
          <div className="flex items-center text-sm font-medium text-gray-600">
            Type
          </div>
          <div className="col-span-2">
            <div className="flex items-center space-x-2">
              {orderTypes.map((type) => (
                <label
                  key={type.key}
                  className="group relative flex items-center justify-center rounded-sm border border-gray-300 bg-white px-1.5 py-1 has-[:checked]:border-blue-600 has-[:checked]:text-blue-600 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-600"
                >
                  <input
                    name="order-type"
                    type="radio"
                    className="absolute inset-0 appearance-none focus:outline-0"
                    value={type.value}
                    checked={type.value === state.type}
                    onChange={(e) => handleOrderTypeChanged(e.currentTarget.value)}
                  />
                  <span className="text-sm font-semibold text-gray-600 uppercase group-has-[:checked]:text-blue-600">
                    {type.key}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

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

          <div>
            <p className="text-sm font-semibold text-gray-900 pt-4.5">Payment</p>

            <div className="py-1.5">
              <div className="py-1.5 grid grid-cols-3 gap-4">
                <dt className="cursor-pointer pl-2 text-sm/6 font-normal text-gray-600">
                  Payable
                </dt>
                <dd className="col-span-2 text-sm/6 font-normal text-gray-600">
                  {payable.toLocaleString()} / {change.toLocaleString()}
                </dd>
              </div>

              <div className="py-1.5 grid grid-cols-3 gap-4">
                <dt className="cursor-pointer pl-2 text-sm/6 font-medium text-gray-600">
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
                <dt className="cursor-pointer pl-2 text-sm/6 font-medium text-gray-600">
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

            <div className="px-2 pt-1.5">
              <div
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={handlePODChecked}
              >
                <div className="group size-4 grid grid-cols-1">
                  <input
                    id="pod"
                    name="pod"
                    type="checkbox"
                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto cursor-pointer"
                    checked={state.payment.pod}
                    onChange={() => handlePODChecked}
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
                <p className="text-sm/6 font-medium text-gray-900">
                  Pay on Delivery (PoD)
                </p>
              </div>
            </div>
          </div>
        </dl>
      </div >
    </DialogBase >
  );
}
