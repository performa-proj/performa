"use client";

import React from "react";
import { IOrderline } from "@/services/Orders/IOrderline";

export default function Orderline({
  data,
  onEditing,
}: {
  data: IOrderline;
  onEditing: (sku: string) => void;
}) {
  const { quantity, label, sku, retailPrice, sellingAt } = data;
  const isShow = retailPrice !== sellingAt;
  const sellingTotal = quantity * sellingAt;
  const retailTotal = quantity * retailPrice;

  return (
    <tr
      className="cursor-pointer"
      onClick={() => onEditing(sku)}
    >
      <td
        scope="col"
        className="whitespace-nowrap p-2 text-right"
      >
        <div className="text-sm font-medium text-gray-900">{quantity}</div>
      </td>
      <td
        scope="col"
        className="whitespace-nowrap p-2 text-left"
      >
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="mt-1 text-sm font-normal text-gray-600">[{sku}]</div>
      </td>
      <td
        scope="col"
        className="whitespace-nowrap p-2 text-right"
      >
        <div className="text-sm font-medium text-gray-900">{sellingAt.toLocaleString()}</div>
        {isShow && (<div className="mt-1 font-normal text-sm text-gray-600 line-through">{retailPrice.toLocaleString()}</div>)}
      </td>
      <td
        scope="col"
        className="whitespace-nowrap p-2 text-right"
      >
        <div className="text-sm font-medium text-gray-900">{sellingTotal.toLocaleString()}</div>
        {isShow && (<div className="mt-1 text-sm font-normal text-gray-600 line-through">{retailTotal.toLocaleString()}</div>)}
      </td>
    </tr>
  );
}
