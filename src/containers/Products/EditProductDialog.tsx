"use client";

import React from "react";
import DialogBase from "@/containers/core/DialogBase";
import { IProduct } from "@/services/Products/IProduct";
import { Products } from ".";

export default function EditProductDialog({
  predata,
  open,
  onDeleted,
  onUpdated,
  onClose,
}: {
  predata: IProduct;
  open: boolean;
  onDeleted: (_id: string) => void;
  onUpdated: (product: IProduct) => void;
  onClose: () => void;
}) {
  const [state, setState] = React.useState({
    title: predata.title,
  });

  const handleProductDeleted = async () => {
    const payloads = {
      _id: predata._id,
    };

    const json = await Products.deleteProduct(payloads);
    onDeleted(json._id);
  };

  const handleProductUpdated = async () => {
    const payloads = {
      _id: predata._id,
      title: state.title,
    };

    const json = await Products.updateProduct(payloads);
    const data = {
      ...predata,
      title: json.title,
      updatedAt: json.updatedAt,
    };
  
    onUpdated(data);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <DialogBase
      title="Edit Product"
      open={open}
      onClose={handleClose}
      deleteButton={{
        title: "Delete",
        onDelete: handleProductDeleted,
      }}
      submitButton={{
        title: "Save",
        onSubmit: handleProductUpdated,
      }}
    >
      <div>
        <div className="py-2">
          <label htmlFor="ref" className="block text-sm/6 font-medium text-gray-900">
            Reference
          </label>
          <div className="mt-2">
            <input
              id="ref"
              name="ref"
              type="text"
              placeholder="Product Reference"
              autoComplete="off"
              className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              value={predata.ref}
              disabled={true}
            />
          </div>
        </div>

        <div className="py-2">
          <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Product Title"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              value={state.title}
              onChange={(e) => {
                const nState = {
                  ...state,
                };

                nState.title = e.currentTarget.value;

                setState(nState);
              }}
            />
          </div>
        </div>
      </div>
    </DialogBase>
  );
}
