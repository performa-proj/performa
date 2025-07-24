import React from "react";
import DialogBase from "@/containers/core/DialogBase";

export default function EditOrderlineDialog({
  open,
  predata,
  onUpdated,
  onClose,
}: {
  open: boolean;
  predata: {
    quantity: number;
    sku: string;
    label: string;
    retailPrice: number;
    lowestPrice: number;
    sellingAt: number;
  };
  onUpdated: (data: {
    sku: string;
    quantity: number;
    sellingAt: number;
  }) => void;
  onClose: () => void;
}) {
  const [state, setState] = React.useState<{
    quantity: number;
    sellingAt: number;
  }>({
    quantity: predata.quantity,
    sellingAt: predata.sellingAt,
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

  const handlePriceChanged = (value: string) => {
    let price = predata.lowestPrice;

    if (value.length > 0) {
      price = Number(value);

      if (!Number.isNaN(price)) {
        setState({
          ...state,
          sellingAt: price,
        });
      }
    } else {
      setState({
        ...state,
        sellingAt: predata.lowestPrice,
      });
    }
  };

  const handleOrderlineUpdated = () => {
    const data = {
      sku: predata.sku,
      quantity: state.quantity,
      sellingAt: state.sellingAt < predata.lowestPrice ? predata.lowestPrice : state.sellingAt,
    };
    onUpdated(data);
  };

  return (
    <DialogBase
      title="Edit Orderline"
      open={open}
      onClose={onClose}
      submitButton={{
        title: "Save",
        onSubmit: handleOrderlineUpdated,
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

      <div className="mt-2">
        <label className="block text-sm/6 font-medium text-gray-900">Price</label>
        <div className="mt-2">
          <input
            type="text"
            id="order-selling-at"
            name="order-selling-at"
            autoComplete="off"
            className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            disabled={true}
            value={state.sellingAt}
            placeholder="Order Price"
            onChange={(e) => handlePriceChanged(e.currentTarget.value)}
          />
        </div>
      </div>

      <div className="mt-2">
        <p className="block mt-2 text-sm/6 font-normal text-gray-900">Price: [{predata.lowestPrice.toFixed(2)} - {predata.retailPrice.toFixed(2)}]</p>
      </div>
    </DialogBase>
  );
}
