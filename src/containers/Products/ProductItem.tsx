"use client";

import React from "react";
import { IProductItem } from "@/services/Products/Items/IProductItem";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";

export default function ProductItem({
  item,
  structure,
  onEditProductItemOpened,
}: {
  item: IProductItem;
  structure: IPriceStructure;
  onEditProductItemOpened: (sku: string) => void;
}) {
  const {
    sku,
    label,
    pricebase,
    weight,
  } = item;

  return (
    <div className="w-full px-6 sm:px-8 py-3">
      <div
        className="pl-2"
        onClick={() => onEditProductItemOpened(sku)}
      >
        <p className="text-xs/4 font-semibold text-gray-900">SKU: {sku}</p>
        <p className="text-sm/6 font-semibold text-gray-900">{label}</p>
        <p className="mt-3 text-sm/4 font-normal text-gray-900">{structure?.title || "-"}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4">
          <div className="mt-1.5">
            <div className="text-xs/6 font-normal text-gray-600">Weight</div>
            <div className="text-sm/4 font-semibold text-gray-900">{weight}</div>
          </div>
          <div className="mt-1.5">
            <div className="text-xs/6 font-normal text-gray-600">Price</div>
            <div className="text-sm/4 font-semibold text-gray-900">{pricebase}</div>
          </div>
          <div className="mt-1.5">
            <div className="text-xs/6 font-normal text-gray-600">Levels</div>
            <div className="flex text-sm/4 font-semibold text-gray-900 divide-x divide-gray-600">
              {structure.levels.map((each, index) => (
                <p
                  key={index}
                  className="px-1.5 sm:px-2 text-gray-900"
                >{pricebase + each}</p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
