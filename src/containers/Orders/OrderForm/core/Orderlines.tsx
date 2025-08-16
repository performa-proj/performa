"use client";

import { IOrderline } from "@/services/Orders/IOrderline";

import Orderline from "./Orderline";
import { summarizeOrderlines } from "./summarizeOrderlines";

const NoDataDisplay = () => (
  <tr>
    <td colSpan={4}>
      <div className="flex justify-center items-center h-32">
        <p className="text-sm/6 font-semibold text-gray-900">
          No Data
        </p>
      </div>
    </td>
  </tr>
);

export default function Orderlines({
  orderlines,
  onEditing,
}: {
  orderlines: IOrderline[];
  onEditing: (sku: string) => void;
}) {
  const { weight, discount, retail, total } = summarizeOrderlines(orderlines);
  const isDiscount = discount > 0;

  return (
    <table className="w-full border-y border-gray-300 divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
            QTY.
          </th>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-left">
            Title
          </th>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
            Price
          </th>
          <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-right">
            Total
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orderlines.length === 0
          ? (<NoDataDisplay />)
          : (orderlines.map((each) => (
            <Orderline
              key={each.sku}
              data={each}
              onEditing={onEditing}
            />
          )))}
      </tbody>
      {orderlines.length > 0 && (
        <tfoot>
          {isDiscount && (
            <>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="px-2 py-1.5 text-left"
                >
                  <div className="text-sm font-medium text-gray-600">Subtotal</div>
                </th>
                <th
                  scope="row"
                  className="px-2 py-1.5 text-right"
                >
                  <div className="text-sm font-medium text-gray-600">{retail.toLocaleString()}</div>
                </th>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="px-2 py-1.5 text-left"
                >
                  <div className="text-sm font-medium text-gray-600">Discount</div>
                </th>
                <th
                  scope="row"
                  className="px-2 py-1.5 text-right"
                >
                  <div className="text-sm font-medium text-gray-600">({discount.toLocaleString()})</div>
                </th>
              </tr>
            </>
          )}
          <tr className="border-t border-gray-300">
            <th
              scope="row"
              colSpan={3}
              className="p-2 text-left"
            >
              <div className="flex items-baseline">
                <p className="text-sm/6 font-semibold text-gray-900">Total</p>
                <p className="mx-2 text-sm/6 font-semibold text-gray-900">[<span>{weight} KG</span>]</p>
              </div>
            </th>
            <th
              scope="row"
              className="p-2 text-right"
            >
              <div className="text-base font-semibold text-gray-900">{total.toLocaleString()}</div>
            </th>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
