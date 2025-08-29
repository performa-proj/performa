import React from "react";

import { ProcessOrders } from "@/services/Orders/ProcessOrders";
import Documents from "./Documents";

export default async function Page({
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
    <Documents
      order={order}
    />
  );
}
