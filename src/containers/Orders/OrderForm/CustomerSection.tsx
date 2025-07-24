"use client";

import React from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ICustomer } from "@/services/Identities/Customers/ICustomer";
import { IOrderData } from "@/services/Orders/IOrderData";
import { classnames } from "@/containers/core/classnames";
import CustomerSearch from "@/containers/Customers/CustomerSearch";

export default function CustomerSection({
  orderData,
  onCustomer,
  onRemove,
}: {
  orderData: IOrderData;
  onCustomer: (customer: ICustomer) => void;
  onRemove: () => void;
}) {
  const { customer } = orderData;

  return (
    <div className="w-full flex items-center">
      <p
        className={classnames(customer ? "block" : "hidden",
          "bg-white p-1 mr-1 rounded-sm border border-blue-600 text-sm text-blue-600 font-semibold uppercase"
        )}
        onClick={() => { console.log("1234") }}
      >
        RO
      </p>
      <span className="hidden sm:block text-sm/6 font-medium text-gray-900 mr-1.5">
        Customer:
      </span>
      {customer ? (
        <div className="flex items-center">
          <span className="text-base/6 font-semibold text-gray-900">
            {customer.name} / {orderData.level}
          </span>
          <XMarkIcon
            className="cursor-pointer size-4 text-gray-600 ml-2.5 mr-1.5"
            onClick={() => onRemove()}
          />
        </div>
      ) : (
        <CustomerSearch
          onCustomer={onCustomer}
        />
      )}
    </div>
  );
}
