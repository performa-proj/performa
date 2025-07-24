import { Orders } from "@/services/Orders";
import React from "react";

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
        <div className="grow h-0.5 border-t-2 border-blue-800 mt-5" />
        <p className="uppercase text-4xl font-normal text-blue-800 px-2">
          Invoice
        </p>
        <div className="h-0.5 w-12 border-t-2 border-blue-800 mt-5" />
      </div>

      <div className="flex flex-row-reverse px-3">
        <div className="grid grid-cols-2 gap-x-4">
          <p className="text-right">Transaction ID:</p>
          <p>{order?.transactionID}</p>
          <p className="text-right">Date:</p>
          <p></p>
        </div>
        <div className="grow">
          <p>Customer</p>
        </div>
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
