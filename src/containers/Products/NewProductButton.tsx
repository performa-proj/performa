"use client";

import React from "react";
import { IProduct } from "@/services/Products/IProduct";
import NewProductDialog from "./NewProductDialog";

export default function NewProductButton({
  onCreated,
}: {
  onCreated: (product: IProduct) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleCreated = (product: IProduct) => {
    onCreated(product);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="bg-white rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
        onClick={() => setOpen(true)}
      >
        New Product
      </button>
      <NewProductDialog
        open={open}
        onCreated={handleCreated}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
