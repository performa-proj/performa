"use client";

import React from "react";

import ProductSearch from "@/containers/Products/ProductSearch";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";
import { IReturnline } from "@/services/Orders/IReturnline";
import ReturnOrderTable from "./ReturnOrderTable";

export default function ReturnOrderSection({
  ordering,
  returning,
  onSearching,
  onEditing,
}: {
  ordering: {
    weight: number;
    total: number;
  };
  returnData: {
    level: number;
    lines: {
      [sku: string]: {
        quantity: number;
        line: IProductItemLine;
      };
    };
  };
  returning: {
    lines: IReturnline[];
    weight: number;
    total: number;
  };
  onSearching: (value: string) => void;
  onEditing: (sku: string) => void;
}) {

  return (
    <div className="w-full h-full">
      <div className="w-full py-1.5">
        <ProductSearch
          onSearching={onSearching}
        />
      </div>

      <div className="w-full py-1.5">
        <ReturnOrderTable
          returnlines={returning.lines}
          summary={{
            ordering,
            returning,
          }}
          onEditing={onEditing}
        />
      </div>
    </div>
  );
}
