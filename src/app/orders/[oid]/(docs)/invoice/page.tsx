import React from "react";
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
      payment,
      createdAt: postedAt
    } = order;

    const date = `${postedAt.getDate().toString().padStart(2, "0")}.${(postedAt.getMonth() + 1).toString().padStart(2, "0")}.${postedAt.getFullYear()}`;
    let dueDate = payment.dueDate.toString();
    dueDate = `${dueDate.substring(6, 8)}.${dueDate.substring(4, 6)}.${dueDate.substring(0, 4)}`;

    return (
      <div className="h-full w-full">
        <div className="px-3">
          <Topline text="Invoice" />
          <div className="sm:flex justify-center">
            <p className="block sm:inline-flex text-sm sm:text-base print:text-sm font-semibold text-gray-900">
              โรงสีตวงสุวรรณ 98 หมู่ 1 ต.ท่าล้อ อ.ท่าม่วง จ.กาญจนบุรี 71000
            </p>
            <p className="block sm:inline-flex">
              [เลขประจำตัวผู้เสียภาษี: 101402315124]
            </p>
          </div>
        </div>

        <div className="block sm:flex px-3 pt-10">
          <div className="grow">
            <p className="text-base font-semibold text-gray-900">{customer?.name || "[Walk-In]"}</p>
            <p className="text-base font-medium text-gray-900">{customer?.mobile || "-"}</p>
          </div>

          <div className="grid grid-cols-2 sm:gap-x-4 text-base print:text-sm">
            <p className="font-bold text-right uppercase text-gray-900">Transaction ID:</p>
            <p className="font-bold text-right text-gray-900">{order.transactionID}</p>

            <p className="text-right uppercase text-gray-900">Date:</p>
            <p className="text-right text-gray-900">{date}</p>

            <p className="text-right uppercase text-gray-900">Due Date:</p>
            <p className="text-right text-gray-900">{dueDate}</p>
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
