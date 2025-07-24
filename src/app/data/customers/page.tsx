"use client";

import React from "react";
import NewCustomerDialogButton from "@/containers/Customers/NewCustomerDialogButton";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex px-4 sm:px-6 lg:px-8 py-2 border-b border-gray-200">
        <div className="flex-auto">
          <h1 className="text-base sm:text-lg pt-1 sm:pt-0.5 font-semibold tracking-tight text-gray-900">Customers</h1>
        </div>
        <NewCustomerDialogButton
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-sm text-gray-600">This page is under construction.</p>
      </div>
    </div>
  );
}
