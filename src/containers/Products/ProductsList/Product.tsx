"use client";

import React from "react";

import { ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import ProductItem from "./ProductItem";

export default function Product({
  product,
  structuresMap,
  onEditProductOpened,
  onEditProductItemOpened,
  onNewProductItemOpened,
  onDetail,
}: {
  product: IProduct;
  structuresMap: { [id: string]: IPriceStructure; };
  onEditProductOpened: (productID: string) => void;
  onNewProductItemOpened: (productID: string) => void;
  onEditProductItemOpened: (productID: string, sku: string) => void;
  onDetail: (productID: string) => void;
}) {
  const { _id, ref, title, items, updatedAt } = product;
  const [isShow, setShow] = React.useState(false);
  const lastUpdated = `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}/${updatedAt.getFullYear()} ${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`;

  return (
    <div>
      <div className="flex px-4 sm:px-6 py-3">
        <button
          className="cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={() => setShow(!isShow)}
        >
          {isShow
            ? (<ChevronUpIcon className="size-4.5 sm:size-5" />)
            : (<ChevronDownIcon className="size-4.5 sm:size-5" />)
          }
        </button>
        <div
          className="flex-1 mt-1.5 px-2"
          onClick={() => onEditProductOpened(_id)}
        >
          <p className="text-xs/4 font-semibold text-gray-600">REF: {ref}</p>
          <p className="text-sm/6 font-semibold text-gray-900">{title}</p>
          <p className="mt-1.5 truncate text-xs/6 text-gray-400">
            Last Updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <button
            type="button"
            className="cursor-pointer text-gray-600 hover:text-gray-900"
            onClick={() => onDetail(_id)}
          >
            <ChevronRightIcon className="size-4.5 sm:size-5" />
          </button>
        </div>
      </div>
      {isShow && (
        <div className="border-b mb-1.5 border-gray-200">
          <div className="flex px-6 sm:px-8 py-2 items-center justify-between bg-gray-100">
            <p className="text-sm/4 font-semibold text-gray-900">Items</p>
            <button
              className="px-1 cursor-pointer"
              onClick={() => onNewProductItemOpened(_id)}
            >
              <PlusIcon className="size-4 flex-none text-gray-900" aria-hidden="true" />
            </button>
          </div>
          <div role="list" className="divide-y divide-dashed divide-gray-300">
            {items.length === 0 ? (
              <div className="flex min-h-24 items-center justify-center">
                <div className="text-sm font-normal">No Product Items</div>
              </div>
            ) : items.map((each) => (
              <ProductItem
                key={each.sku}
                item={each}
                structure={structuresMap[each.structureID]}
                onEditProductItemOpened={() => onEditProductItemOpened(_id, each.sku)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
