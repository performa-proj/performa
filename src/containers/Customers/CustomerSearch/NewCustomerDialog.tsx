"use client";

import React from "react";
import DialogBase from "@/containers/core/DialogBase";
import { ICustomer } from "@/services/Identities/Customers/ICustomer";

export default function NewCustomerDialog({
  predata: {
    mobile,
  },
  open,
  onCreated,
  onClose,
}: {
  predata: {
    mobile: string;
  };
  open: boolean;
  onCreated: (customer: ICustomer) => void;
  onClose: () => void;
}) {
  const [name, setName] = React.useState("");

  const handleCreateCustomer = async () => {
    const data = {
      name,
      mobile,
    };

    const response = await fetch(`/api/identities/customers}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    setName("");
    onCreated(json.data);
  };

  const handleClose = () => {
    onClose();
    setName("");
  };

  return (
    <DialogBase
      title="New Customer"
      open={open}
      submitButton={{
        title: "Create",
        onSubmit: handleCreateCustomer,
      }}
      onClose={handleClose}
    >
      <div className="py-1.5">
        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
          Mobile
        </label>
        <div className="mt-2">
          <p className="text-sm/6 font-semibold text-gray-900">{mobile}</p>
        </div>
      </div>

      <div className="py-1.5">
        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
          Name
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            autoFocus
            className="block w-full rounded-md bg-white px-3.5 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
      </div>
    </DialogBase>
  )
}
