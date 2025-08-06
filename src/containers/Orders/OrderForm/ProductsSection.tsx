"use client";

import React from "react";

import ProductSearch from "@/containers/Products/ProductSearch";
import { IOrderData } from "@/services/PlacedOrders/IOrderData";
import { IOrdering } from "@/services/PlacedOrders/IOrdering";
import Orderlines from "./core/Orderlines";

export default function ProductsSection({
  orderData,
  ordering,
  onSearching,
  onEditing,
}: {
  orderData: IOrderData;
  ordering: IOrdering;
  onSearching: (value: string) => void;
  onEditing: (sku: string) => void;
}) {
  return (
    <div className="w-full">
      <div className="py-1.5">
        <ProductSearch
          onSearching={onSearching}
        />
      </div>
      <div className="py-1.5">
        <Orderlines
          orderlines={ordering.orderlines}
          onEditing={onEditing}
        />
      </div>
    </div>
  );
}
