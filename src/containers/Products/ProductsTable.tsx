"use client";

import React from "react";

import { ChevronRightIcon, ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";

import ProductItem from "./ProductItem";

export default function ProductsTable({
  product,
  structures,
  onEditProductOpened,
  onEditProductItemOpened,
  onNewProductItemOpened,
}: {
  product: IProduct;
  structures: IPriceStructure[];
  onEditProductOpened: (productID: string) => void;
  onNewProductItemOpened: (productID: string) => void;
  onEditProductItemOpened: (productID: string, sku: string) => void;
}) {
  const {
    _id,
    ref,
    title,
    items,
    updatedAt,
  } = product;
  const [isShow, setShow] = React.useState(false);
  const lastUpdated = `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}/${updatedAt.getFullYear()} ${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`;

  const StructuresMap = structures.reduce((result, each) => {
    result[each._id] = each;

    return result;
  }, {} as { [key: string]: IPriceStructure; });

  const handleEditProductItemOpened = (sku: string) => {
    onEditProductItemOpened(product._id, sku);
  };

  return (
    <table className="relative min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" className="px-2 py-2.5 text-left text-sm font-medium text-gray-900">
            SKU
          </th>
        </tr>
      </thead>
    </table>
  );
}
