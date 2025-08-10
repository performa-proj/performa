"use client";

import React from "react";
import DialogBase from "@/containers/core/DialogBase";
import { resolveNumber } from "@/containers/core/resolveNumber";

export default function CounterDialog({
  open,
  predata,
  onClose,
  onCompleted,
}: {
  open: boolean;
  predata: {
    index: number;
    sku: string;
    label: string;
    quantity: number;
    count: number;
  };
  onCompleted: () => void;
  onClose: (count: number) => void;
}) {
  const [state, setState] = React.useState(predata.count.toString());

  const handleCountChanged = (value: string) => {
    let nState = resolveNumber(state, value);

    if (Number(nState) > predata.quantity) {
      nState = predata.quantity.toString();
    }

    setState(nState);
  };

  const handleCompleted = () => {
    onCompleted();
    setState(predata.quantity.toString());
  };

  const handleClose = () => {
    onClose(Number(state) || 0);
  };

  return (
    <DialogBase
      title="Orderline Counter"
      open={open}
      onClose={handleClose}
      closeButton={{
        title: "Close",
      }}
      submitButton={{
        title: "Mark Completed",
        onSubmit: handleCompleted,
      }}
    >
      <div className="py-1.5">
        <label className="block text-sm/6 font-medium text-gray-900">Product Item</label>
        <p className="block mt-2 text-sm/6 font-semibold text-gray-900">{predata.sku} - {predata.label}</p>
      </div>

      <div className="mt-5 grid grid-cols-2">
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Quantity</label>
          <p className="block mt-2 text-lg font-semibold text-gray-900">{predata.quantity}</p>
        </div>
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Count</label>
          <div className="mt-2">
            <input
              type="string"
              value={state}
              onChange={(e) => handleCountChanged(e.currentTarget.value)}
              className="block min-w-0 max-w-24 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
            />
          </div>
        </div>
      </div>
    </DialogBase>
  );
}
