"use client";

import React from "react";
import { IReturnline } from "@/services/Orders/IReturnline";

export default function Returnline({
  data,
  onEditing,
}: {
  data: IReturnline;
  onEditing: (sku: string) => void;
}) {
  const { quantity, label, sku, returningAt } = data;
  const returingTotal = quantity * returningAt;

  return (
    <tr
      className="cursor-pointer"
      onClick={() => onEditing(sku)}
    >
      <td
        scope="col"
        className="px-3 py-2 text-right"
      >
        <div className="text-sm font-medium text-gray-900">{quantity}</div>
      </td>
      <td
        scope="col"
        className="p-2 text-left"
      >
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="mt-1 text-sm font-normal text-gray-600">[{sku}]</div>
      </td>
      <td
        scope="col"
        className="p-2 text-right"
      >
        <div className="text-sm font-medium text-gray-900">{}</div>
      </td>
      <td
        scope="col"
        className="p-2 text-right"
      >
        <div className="text-sm font-medium text-gray-900"></div>
      </td>
    </tr>
  );
}
