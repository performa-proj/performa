import React from "react";
import DialogBase from "@/containers/core/DialogBase";

export default function OrderlineCounterDialog({
  open,
  data,
  onClose,
}: {
  open: boolean;
  data: {
    index: number;
    sku: string;
    label: string;
    quantity: number;
    count: number;
  };
  onClose: (count: number) => void;
}) {
  const [state, setState] = React.useState(data.count);

  const handleClose = () => {
    onClose(state);
  };

  return (
    <DialogBase
      title="Counter"
      open={open}
      closeButton={{
        title: "Close",
      }}
      onClose={handleClose}
    >
      <div className="px-2">
        <div className="py-2">
          <label className="block text-sm/6 font-medium text-gray-900">Product Item</label>
          <p className="block mt-2 text-sm/6 font-semibold text-gray-900">{data.sku} - {data.label}</p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-gray-900/5 my-5">
          <div className="flex flex-wrap bg-white gap-y-2 px-4">
            <dt className="text-sm/6 font-medium text-gray-500">Quantity</dt>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">{data.quantity}</dd>
          </div>
          <div className="flex flex-wrap bg-white gap-y-2 px-4">
            <dt className="text-sm/6 font-medium text-gray-500">Count</dt>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-green-700">{state}</dd>
            
          </div>
        </div>

        <div className="flex justify-center">
          <span className="isolate inline-flex rounded-md">
            <button
              type="button"
              className="relative inline-flex items-center rounded-l-md bg-white min-w-0 px-5 py-2 text-xl font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              -
            </button>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center rounded-r-md bg-white min-w-0 px-5 py-2 text-xl font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              +
            </button>
          </span>
        </div>
      </div>
    </DialogBase>
  );
}
