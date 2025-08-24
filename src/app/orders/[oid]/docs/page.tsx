import React from "react";
import { ProcessOrders } from "@/services/Orders/ProcessOrders";

export default async function docs({
  params,
}: {
  params: Promise<{ oid: string }>;
}) {
  const { oid } = await params;
  const order = await ProcessOrders.findByID({ _id: oid });

  if (order === null) {
    return (
      <div>No Order Found</div>
    );
  }

  return (
    <div className="h-full w-full bg-white">
      <div className="print:hidden flex items-center px-4 py-2 border-b border-gray-400">
        <h1 className="text-lg font-semibold text-gray-900">Order: </h1>
        <p className="px-1 font-medium">#{order.transactionID}</p>
      </div>
    </div>
  );
}
