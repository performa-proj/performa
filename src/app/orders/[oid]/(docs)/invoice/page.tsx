import React from "react";
import QRCode from "react-qr-code";
import { Orders } from "@/services/Orders";
import Orderlines from "../core/Orderlines";
import Topline from "../core/Topline";

export default async function Page({
  params,
}: {
  params: Promise<{ oid: string }>;
}) {
  const { oid } = await params;
  const order = await Orders.findByID({ _id: oid });

  if (order) {
    const {
      customer,
      createdAt: postedAt
    } = order;

    const date = `${postedAt.getDate().toString().padStart(2, "0")}.${(postedAt.getMonth() + 1).toString().padStart(2, "0")}.${postedAt.getFullYear()}`;
    // let dueDate = payment.dueDate.toString();
    // dueDate = `${dueDate.substring(6, 8)}.${dueDate.substring(4, 6)}.${dueDate.substring(0, 4)}`;

    return (
      <div className="h-full w-full">
        <div className="px-3">
          <Topline text="Invoice" />
        </div>

        <div className="block px-3">
          <div className="flex items-center py-3">
            <div className="flex-auto sm:pl-4">
              <QRCode
                value={order.transactionID.toString()}
                size={60}
              />
            </div>
            <div className="sm:grid sm:grid-cols-2 sm:gap-x-4">
              <p className="hidden sm:block text-base font-bold text-gray-900 text-right uppercase">Transaction ID:</p>
              <p className="text-base font-bold text-gray-900 text-right">{order.transactionID}</p>

              <p className="hidden sm:block text-base font-medium text-gray-900 text-right uppercase mt-1">Date:</p>
              <p className="text-base font-medium text-gray-900 text-right mt-1">{date}</p>
            </div>
          </div>

          <div className="py-3">
            <div>
              <p className="text-base font-medium text-gray-700 uppercase">Customer</p>
              <p className="text-base font-semibold text-gray-900">{customer?.name || "[Walk-In]"}</p>
              <p className="text-base font-semibold text-gray-900">{customer?.mobile || "[Walk-In]"}</p>
            </div>
          </div>
        </div>

        <div className="px-3">
          <Orderlines
            order={order}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        Empty
      </div>
    );
  }
}
