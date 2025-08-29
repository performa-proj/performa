"use client";

import React from "react";
import DialogBase from "@/containers/core/DialogBase";
import { IProductItem } from "@/services/Products/Items/IProductItem";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Products } from ".";

export default function NewProductItemDialog({
  open,
  metadata: {
    product,
  },
  structures,
  onCreated,
  onClose,
}: {
  open: boolean;
  metadata: {
    product: {
      _id: string;
      ref: string;
      title: string;
    };
  };
  structures: IPriceStructure[];
  onCreated: (data: {
    productID: string;
    item: IProductItem;
    updatedAt: Date;
  }) => void;
  onClose: () => void;
}) {
  const [state, setState] = React.useState({
    sku: "",
    label: "",
    weight: "0",
    pricebase: "0",
    structureID: "",
  });

  const handleWeightChanged = (value: string) => {
    if (value.length === 0) {
      value = "0";
    }

    if (!Number.isNaN(Number(value))) {
      setState({
        ...state,
        weight: value,
      });
    }
  };

  const handlePricebaseChanged = (value: string) => {
    if (value.length === 0) {
      value = "0";
    }

    if (!Number.isNaN(Number(value))) {
      setState({
        ...state,
        pricebase: value,
      });
    }
  };

  const handleProductItemCreated = async () => {
    const payloads = {
      productID: product._id,
      item: {
        sku: state.sku,
        label: state.label,
        weight: Number(state.weight),
        stockCount: 0,
        pricebase: Number(state.pricebase),
        structureID: state.structureID,
      },
    };

    const json = await Products.Items.appendItem(payloads);

    setState({
      sku: "",
      label: "",
      weight: "0",
      pricebase: "0",
      structureID: "",
    });

    onCreated(json);
  };

  const handleClose = () => {
    setState({
      sku: "",
      label: "",
      weight: "0",
      pricebase: "0",
      structureID: "",
    });
    onClose();
  };

  return (
    <DialogBase
      title="New Product Item"
      open={open}
      isLoading={false}
      onClose={handleClose}
      submitButton={{
        title: "Create",
        onSubmit: handleProductItemCreated
      }}
    >
      <div className="py-1.5">
        <label className="block text-sm/6 font-medium text-gray-900">
          Product
        </label>
        <div className="mt-2">
          <p className="text-sm/6 font-semibold text-gray-900">
            {product.ref} - {product.title}
          </p>
        </div>
      </div>

      <div className="py-1.5">
        <label htmlFor="item-sku" className="block text-sm/6 font-medium text-gray-900">
          SKU
        </label>
        <div className="mt-2">
          <input
            id="item-sku"
            name="item-sku"
            type="text"
            placeholder="Item SKU"
            autoComplete="off"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={state.sku}
            onChange={(e) => {
              const nState = {
                ...state,
                sku: e.currentTarget.value,
              };

              setState(nState);
            }}
          />
        </div>
      </div>

      <div className="py-1.5">
        <div className="flex justify-between">
          <label htmlFor="item-label" className="block text-sm/6 font-medium text-gray-900">
            Label
          </label>
          <span
            className="text-xs/6 text-gray-600 cursor-pointer"
            onClick={() => setState({
              ...state,
              label: `${product.title.trim()} ${Number(state.weight)} กก.`,
            })}
          >
            [Suggestion]
          </span>
        </div>
        <div className="mt-2">
          <input
            id="item-label"
            name="item-label"
            type="text"
            placeholder="Item Label"
            autoComplete="off"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={state.label}
            onChange={(e) => {
              const nState = {
                ...state,
                label: e.currentTarget.value,
              };

              setState(nState);
            }}
          />
        </div>
      </div>

      <div className="py-1.5">
        <label htmlFor="item-weight" className="block text-sm/6 font-medium text-gray-900">
          Weight (KG.)
        </label>
        <div className="mt-2">
          <input
            id="item-weight"
            name="item-weight"
            type="text"
            placeholder="Item Weight"
            autoComplete="off"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={state.weight}
            onChange={(e) => handleWeightChanged(e.currentTarget.value)}
          />
        </div>
      </div>

      <div className="py-1.5">
        <label htmlFor="item-pricebase" className="block text-sm/6 font-medium text-gray-900">
          Price Base
        </label>
        <div className="mt-2">
          <input
            id="item-pricebase"
            name="item-pricebase"
            type="text"
            placeholder="Item pricebase"
            autoComplete="off"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={state.pricebase}
            onChange={(e) => handlePricebaseChanged(e.currentTarget.value)}
          />
        </div>
      </div>

      <div className="py-1.5">
        <label htmlFor="structures" className="block text-sm/6 font-medium text-gray-900">
          Price Structures
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="structures"
            name="structures"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={state.structureID}
            onChange={(e) => {
              const nState = {
                ...state,
                structureID: e.currentTarget.value,
              };

              setState(nState);
            }}
          >
            <option key="0" value="">Select One</option>
            {structures.map((each) => (<option key={each._id} value={each._id}>{each.title}</option>))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-600 sm:size-4"
          />
        </div>
      </div>
    </DialogBase>
  );
}
