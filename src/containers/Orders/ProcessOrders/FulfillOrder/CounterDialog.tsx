"use client";

import React from "react";
import DialogBase from "@/containers/core/DialogBase";
import CheckboxBase from "@/containers/core/CheckboxBase";
import { resolveNumber } from "@/containers/core/resolveNumber";

export default function CounterDialog({
  open,
  predata,
  isLoading,
  onSave,
  onClose,
}: {
  open: boolean;
  predata: {
    index: number;
    sku: string;
    label: string;
    quantity: number;
    count: number;
  };
  isLoading: boolean;
  onSave: (data: {
    sku: string;
    count: number;
    completed: boolean;
  }) => void;
  onClose: (count: number) => void;
}) {
  const [state, setState] = React.useState<{
    count: string;
    completed: boolean;
  }>({
    count: predata.count.toString(),
    completed: false,
  });

  const handleCountChanged = (value: string) => {
    const nState = {
      ...state,
      count: resolveNumber(state.count, value),
    };

    if (Number(nState.count) > predata.quantity) {
      nState.count = predata.quantity.toString();
    }

    if (Number(nState.count) === predata.quantity) {
      nState.completed = true;
    }

    setState(nState);
  };

  const handleCompletedChecked = () => {
    const nState = {
      ...state,
      completed: !state.completed,
    };

    setState(nState);
  };

  const handleSaved = () => {
    onSave({
      sku: predata.sku,
      count: Number(state.count),
      completed: state.completed,
    });
  };

  const handleClose = () => {
    onClose(Number(state) || 0);
  };

  return (
    <DialogBase
      title="Product Item Counter"
      open={open}
      isLoading={isLoading}
      onClose={handleClose}
      submitButton={{
        title: "Update",
        onSubmit: handleSaved,
      }}
    >
      <div className="py-1.5">
        <label className="block text-sm/6 font-medium text-gray-900">Product Item</label>
        <p className="block mt-2 text-sm/6 font-semibold text-gray-900">{predata.sku} - {predata.label}</p>
      </div>

      <div className="mt-3 grid grid-cols-2">
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Quantity</label>
          <p className="block mt-2 text-lg font-semibold text-gray-900">{predata.quantity}</p>
        </div>
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Count</label>
          <div className="mt-2">
            <input
              type="string"
              value={state.count}
              onChange={(e) => handleCountChanged(e.currentTarget.value)}
              className="block min-w-0 max-w-24 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <CheckboxBase
            id="mark-completed"
            name="mark-complete"
            checked={state.completed}
            onChange={() => handleCompletedChecked()}
          />
          <div className="text-sm/6">
            <label
            className="text-sm font-normal text-gray-900"
              onClick={() => handleCompletedChecked()}
            >
              Completed
            </label>
          </div>
        </div>
      </div>
    </DialogBase>
  );
}
