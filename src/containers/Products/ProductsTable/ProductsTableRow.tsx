"use client";

import React from "react";
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { resolvePrice } from "@/services/PriceFunctions/resolvePrice";

export default function ProductsTableRow({
  product,
  structuresMap,
  onEditProductItemOpened,
  onDetail,
}: {
  product: IProduct;
  structuresMap: { [id: string]: IPriceStructure; };
  onEditProductItemOpened: (productID: string, sku: string) => void;
  onDetail: (productID: string) => void;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment key={product._id}>
      <tr key={product._id} className="bg-gray-50">
        <th
          scope="row"
          colSpan={8}
          className="bg-gray-100 text-left"
        >
          <div className="flex items-center">
            <button className="px-2 py-3 cursor-pointer text-gray-900"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <ChevronUpIcon className="size-3" />
              ) : (
                <ChevronDownIcon className="size-3" />
              )}
            </button>
            <div className="py-2 flex-auto text-sm/5 font-semibold text-gray-900">
              {product.ref} - {product.title}
            </div>
            <button className="px-2 py-2.5 cursor-pointer text-gray-900"
              onClick={() => onDetail(product._id)}
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </th>
      </tr>
      {open && product.items.map((item) => (
        <tr key={item.sku} className="hover:bg-gray-50 cursor-pointer" onClick={() => onEditProductItemOpened(product._id, item.sku)}>
          <td className="px-2 py-2 text-sm font-medium text-gray-900">{item.sku}</td>
          <td className="px-2 py-2 text-sm font-medium text-gray-900">{item.label}</td>
          {structuresMap[item.structureID] && structuresMap[item.structureID].levels.map((level, index) => (
            <td key={index} className="px-2 py-2 text-center text-sm font-medium text-gray-900">
              {item.pricebase > 0 ? resolvePrice({ pricebase: item.pricebase, structure: level }).toLocaleString() : "0"}
            </td>
          ))}
        </tr>
      ))}
    </React.Fragment>
  );
}
