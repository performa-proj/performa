"use client";

import React from "react";

export default function NewCustomerDialogButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={() => setOpen(!open)}
      >
        New Customer
      </button>
    </>
  );
}
