import React from "react";
import DialogBase from "@/containers/core/DialogBase";

export default function ReturnOrderlineDialog({
  open,
  predata,
  onDelete,
  onUpdated,
  onClose,
}: {
  open: boolean;
  predata: {
    quantity: number;
    sku: string;
    label: string;
  };
  onDelete: (data: {
    sku: string;
  }) => void;
  onUpdated: (data: {
    sku: string;
    quantity: number;
  }) => void;
  onClose: () => void;
}) {
  const [state, setState] = React.useState<{
    quantity: number;
  }>({
    quantity: predata.quantity,
  });

  const handleQuantityChanged = (value: string) => {
    let quantity = 0;

    if (value.length > 0) {
      quantity = Number(value);

      if (!Number.isNaN(quantity)) {
        setState({
          ...state,
          quantity,
        });
      }
    } else {
      setState({
        ...state,
        quantity: 0,
      });
    }
  };

  const handleReturnlineUpdated = () => {
    const data = {
      sku: predata.sku,
      quantity: state.quantity,
    };
    onUpdated(data);
  };

  return (
    <DialogBase
      title="Edit Returnline"
      open={open}
      isLoading={false}
      onClose={onClose}
      deleteButton={{
        onDelete: () => onDelete({
          sku: predata.sku,
        }),
      }}
      submitButton={{
        title: "Save",
        onSubmit: handleReturnlineUpdated,
      }}
    >
      <div className="py-1.5">
        <label className="block text-sm/6 font-medium text-gray-900">Product Item</label>
        <p className="block mt-2 text-sm/6 font-semibold text-gray-900">{predata.sku} - {predata.label}</p>
      </div>

      <div className="mt-2">
        <label className="block text-sm/6 font-medium text-gray-900">Quantity</label>
        <div className="mt-2">
          <input
            type="text"
            id="order-quantity"
            name="order-quantity"
            autoComplete="off"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={state.quantity}
            placeholder="Order Quantity"
            onChange={(e) => handleQuantityChanged(e.currentTarget.value)}
          />
        </div>
      </div>
    </DialogBase>
  );
}
