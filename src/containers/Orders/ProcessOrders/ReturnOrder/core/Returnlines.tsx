"use client";

import React from "react";

import { IReturnline } from "@/services/Orders/IReturnline";
import Returnline from "./Returnline";

const NoDataDisplay = () => (
  <tr>
    <td colSpan={4} className="p-2 h-16">
      <div className="flex justify-center items-center ">
        <p className="text-sm/6 font-semibold text-gray-900">
          No Data
        </p>
      </div>
    </td>
  </tr>
);

export default function Returnlines({
  returnlines,
  onEditing,
}: {
  returnlines: IReturnline[];
  onEditing: (sku: string) => void;
}) {
  return (
    <>
      {returnlines.length === 0
        ? (<NoDataDisplay />)
        : (returnlines.map((each) => (
          <Returnline
            key={each.sku}
            data={each}
            onEditing={onEditing}
          />
        )))
      }
    </>
  );
}
