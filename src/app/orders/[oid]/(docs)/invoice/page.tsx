import React from "react";
import QRCode from "react-qr-code";
import { PlacedOrders } from "@/services/PlacedOrders";
import Orderlines from "../core/Orderlines";
import Topline from "../core/Topline";

export default async function Page({
  params,
}: {
  params: Promise<{ oid: string }>;
}) {
  const { oid } = await params;
  const order = await PlacedOrders.findByID({ _id: oid });

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
        <div className="px-3 pt-5 pb-3 print:pt-0">
          <Topline text="Invoice" />
        </div>

        <div className="block px-3">
          <div className="flex py-5">
            <div className="flex-auto">
              <div className="inline-flex p-1 border-1 border-gray-900 mx-4">
                <QRCode
                  title="Order QR Code"
                  size={80}
                  value={order._id.toString()}
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-2 sm:gap-x-4">
              <p className="hidden sm:block text-base font-bold text-gray-900 text-right uppercase">Transaction ID:</p>
              <p className="text-base font-bold text-gray-900 text-right">{order.transactionID}</p>

              <p className="hidden sm:block text-base font-medium text-gray-900 text-right uppercase mt-1">Date:</p>
              <p className="text-base font-medium text-gray-900 text-right mt-1">{date}</p>

              <p className="hidden sm:block text-base font-medium text-gray-900 text-right uppercase mt-1">Due Date:</p>
              <p className="text-base font-medium text-gray-900 text-right mt-1">
                <span className="font-semibold">[POD]</span>
              </p>

              {customer && (
                <>
                  <p className="hidden sm:block text-base font-medium text-gray-900 text-right uppercase mt-2">Customer:</p>
                  <div className="mt-1 sm:mt-2">
                    <p className="text-base font-semibold text-gray-900 text-right">{customer.name || "-"}</p>
                    <p className="text-base font-semibold text-gray-900 text-right">{customer.mobile || "-"}</p>
                  </div>
                </>
              )}
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
