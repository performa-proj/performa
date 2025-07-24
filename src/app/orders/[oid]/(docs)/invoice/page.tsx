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
  console.log(order);

  if (order)
    return (
      <div className="h-full w-full">
        <div className="flex py-4 px-3">
          <Topline
            text="Invoice"
          />
        </div>

        <div className="flex flex-row-reverse px-3">
          <div className="grid grid-cols-2 gap-x-4">
            <p className="text-right text-gray-900">Transaction ID:</p>
            <p>{order?.transactionID}</p>
            <p className="text-right text-gray-900">Date:</p>
            <p></p>
          </div>
          <div className="grow">
            <p>Customer</p>
          </div>
        </div>

        <div className="px-3">
          <Orderlines
            order={order}
          />
        </div>
      </div>
    );
  else {
    return (
      <div>
        Empty
      </div>
    );
  }
}
