"use client";

import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { NoDataMessage } from "@/containers/core/NoDataMessage";

export default function ProductsTable({
  products,
  structuresMap,
  // onEditProductOpened,
  // onNewProductItemOpened,
  onEditProductItemOpened,
  onDetail,
}: {
  products: IProduct[];
  structuresMap: { [id: string]: IPriceStructure; };
  // onEditProductOpened: (productID: string) => void;
  // onNewProductItemOpened: (productID: string) => void;
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
            <React.Fragment key={product._id}>
              <tr key={product._id} className="bg-gray-50">
                <th
                  scope="row"
                  colSpan={8}
                  className="px-2 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-900"
                >
                  <div className="flex items-center">
                    <button className="px-2 -ml-2 cursor-pointer"
                      onClick={() => console.log("12")}
                    >
                      <ChevronUpIcon className="size-3" />
                    </button>
                    <div
                      className="flex-auto cursor-pointer"
                      onClick={() => onDetail(product._id)}
                    >
                      {product.ref} - {product.title}
                    </div>
                  </div>
                </th>
              </tr>
              {product.items.map((item) => (
                <tr key={item.sku} className="hover:bg-gray-50 cursor-pointer" onClick={() => onEditProductItemOpened(product._id, item.sku)}>
                  <td className="px-2 py-2 text-sm font-medium text-gray-900">{item.sku}</td>
                  <td className="px-2 py-2 text-sm font-medium text-gray-900">{item.label}</td>
                  {structuresMap[item.structureID] && structuresMap[item.structureID].levels.map((level, index) => (
                    <td key={index} className="px-2 py-2 text-center text-sm font-medium text-gray-900">
                      {item.pricebase > 0 ? (level + item.pricebase).toLocaleString() : "0"}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
