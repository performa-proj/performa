"use client";

import React from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { IOrdering } from "@/services/Orders/IOrdering";
import { ICustomer } from "@/services/Identities/Customers/ICustomer";
import CustomerSearch from "@/containers/Customers/CustomerSearch";

export default function CustomerSection({
  ordering,
  onCustomer,
  onRemove,
}: {
  ordering: IOrdering;
  onCustomer: (customer: ICustomer) => void;
  onRemove: () => void;
}) {
  return (
    <div className="w-full flex items-center">
      <span className="hidden sm:block text-sm/6 font-medium text-gray-900 mr-1.5">
        Customer:
      </span>
      {ordering.customer ? (
        <div className="flex items-center">
          <span className="text-base/6 font-semibold text-gray-900">
            {ordering.customer.name} / {ordering.level}
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
