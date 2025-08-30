"use client";

import React from "react";
import { CustomerSearch } from "./CustomerSearch";
import { Heading, Subheading } from "@/components/core/heading";

const CustomerSection = () => {
  return (
    <div className="grow">
      <CustomerSearch />
    </div>
  );
};

interface IState {

}

export const OrderForm = () => {
  const [] = React.useState<IState>({});

  return (
    <div className="w-full h-full">
      <Heading>Order Form</Heading>
      <div className="flex mt-3">
        <CustomerSection />

      </div>
    </div>
  );
};
