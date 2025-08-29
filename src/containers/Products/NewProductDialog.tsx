"use client";

import React from "react";
import DialogBase from "@/containers/core/DialogBase";
import { IProduct } from "@/services/Products/IProduct";
import { Products } from ".";

export default function NewProductDialog({
  open,
  onCreated,
  onClose,
}: {
  open: boolean;
  onCreated: (data: IProduct) => void;
  onClose: () => void;
}) {
  const [state, setState] = React.useState({
    ref: "",
    title: "",
  });

  const handleClose = () => {
    setState({
      ref: "",
      title: "",
    });
    onClose();
  };

  const handleProductCreated = async () => {
    const payloads = {
      ref: state.ref,
      title: state.title,
    };

    const json = await Products.createProduct(payloads);

    setState({
      ref: "",
      title: "",
    });

    onCreated(json);
  };

  return (
    <DialogBase
      title="New Product"
      open={open}
      isLoading={false}
      onClose={handleClose}
      submitButton={{
        title: "Create",
        onSubmit: handleProductCreated
      }}
    >
      <div className="py-1.5">
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
            className="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={state.ref}
            onChange={(e) => {
              const nState = {
                ...state,
              };

              nState.ref = e.currentTarget.value;

              setState(nState);
            }}
          />
        </div>
      </div>

      <div className="py-1.5">
        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
          Title
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Product Title"
            autoComplete="off"
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
    </DialogBase>
  );
}
