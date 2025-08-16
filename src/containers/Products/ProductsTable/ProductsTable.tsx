"use client";

import React from "react";
import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { NoDataMessage } from "@/containers/core/NoDataMessage";
import ProductsTableRow from "./ProductsTableRow";

export default function ProductsTable({
  products,
  structuresMap,
  onEditProductItemOpened,
  onDetail,
}: {
  products: IProduct[];
  structuresMap: { [id: string]: IPriceStructure; };
  onEditProductItemOpened: (productID: string, sku: string) => void;
  onDetail: (productID: string) => void;
}) {
  if (products.length === 0) {
    return (<NoDataMessage />);
  }

  return (
    <div>
      <table className="min-w-full bg-white divide-y divide-gray-200 border-b border-gray-200">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-2 py-2 text-left text-sm font-semibold text-gray-900 uppercase">SKU</th>
            <th scope="col" className="px-2 py-2 text-left text-sm font-semibold text-gray-900 uppercase">Label</th>
            <th scope="col" className="px-2 py-2 text-center text-sm font-semibold text-gray-900 uppercase">1</th>
            <th scope="col" className="px-2 py-2 text-center text-sm font-semibold text-gray-900 uppercase">2</th>
            <th scope="col" className="px-2 py-2 text-center text-sm font-semibold text-gray-900 uppercase">3</th>
            <th scope="col" className="px-2 py-2 text-center text-sm font-semibold text-gray-900 uppercase">4</th>
            <th scope="col" className="px-2 py-2 text-center text-sm font-semibold text-gray-900 uppercase">5</th>
            <th scope="col" className="px-2 py-2 text-center text-sm font-semibold text-gray-900 uppercase">6</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <ProductsTableRow
              key={product._id}
              product={product}
              structuresMap={structuresMap}
              onDetail={onDetail}
              onEditProductItemOpened={onEditProductItemOpened}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
