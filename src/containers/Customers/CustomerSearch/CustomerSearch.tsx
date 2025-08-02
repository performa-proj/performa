"use client";

import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { classnames } from "@/containers/core/classnames";
import { ICustomer } from "@/services/Identities/Customers/ICustomer";
import NewCustomerDialog from "./NewCustomerDialog";
import { Customers } from "..";

export default function CustomerSearch({
  onCustomer,
}: {
  onCustomer: (customer: ICustomer) => void;
}) {
  const [mobile, setMobile] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleMobileChanged = async (value: string) => {
    let refinedValue = "";
    const rxMobile = /[0-9]/;

    for (let i = 0; i < value.length; i++) {
      if (rxMobile.test(value[i])) {
        refinedValue += value[i];
      }
    }

    setMobile(refinedValue);
  };

  const handleCustomerSearch = async () => {
    if (mobile.length > 0) {
      setLoading(true);

      const customer = await Customers.searchCustomer({ mobile });

      if (customer) {
        customer.createdAt = new Date(customer.createdAt);
        customer.updatedAt = new Date(customer.updatedAt);

        onCustomer(customer);
        setMobile("");
      } else {
        setOpen(true);
      }

      setLoading(false);
    }
  };

  const handleCustomerCreated = async (customer: ICustomer) => {
    onCustomer(customer);
    setMobile("");
    setOpen(false);
  };

  return (
    <div className="flex w-full">
      <input
        id="mobile"
        name="mobile"
        type="text"
        placeholder="Customer Mobile"
        className={classnames(
          isLoading ? "cursor-not-allowed bg-gray-100" : "bg-white",
          "block w-full grow rounded-l-md -mr-px px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 focus-within:relative"
        )}
        autoComplete="off"
        disabled={isLoading}
        value={mobile}
        onChange={(e) => handleMobileChanged(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCustomerSearch();
          }
        }}
      />
      <button
        type="button"
        className={classnames(
          isLoading ? "cursor-not-allowed bg-gray-100" : "bg-white",
          "flex shrink-0 items-center rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
        )}
        onClick={handleCustomerSearch}
        disabled={isLoading}
      >
        {isLoading && (<ArrowPathIcon className="mr-2 size-4 animate-spin" />)}
        Search
      </button>
      <NewCustomerDialog
        predata={{
          mobile,
        }}
        open={open}
        onClose={() => setOpen(false)}
        onCreated={handleCustomerCreated}
      />
    </div>
  );
}
