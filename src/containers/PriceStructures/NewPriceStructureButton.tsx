"use client";

import React from "react";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import NewPriceStructureDialog from "./NewPriceStructureDialog";

export default function NewPriceStructureButton({
  onCreated,
}: {
  onCreated: (structure: IPriceStructure) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleCreated = (structure: IPriceStructure) => {
    onCreated(structure);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="bg-white rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
        onClick={() => setOpen(true)}
      >
        New Structure
      </button>
      <NewPriceStructureDialog
        open={open}
        onCreated={handleCreated}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
