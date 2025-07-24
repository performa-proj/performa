"use client";

import React from "react";

import { Products } from "@/containers/Products";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";
import { ICustomer } from "@/services/Identities/Customers/ICustomer";
import { IOrderData } from "@/services/Orders/IOrderData";
import { IOrdering } from "@/services/Orders/IOrdering";
import { IOrderline } from "@/services/Orders/IOrderline";
import { IOrder } from "@/services/Orders/IOrder";
import { resolveOrdering } from "@/services/Orders/resolveOrdering";

import { Preorders } from "../Preorders";
import { RegularOrders } from "../RegularOrders";
import CustomerSection from "./CustomerSection";
import ProductsSection from "./ProductsSection";
import EditOrderlineDialog from "./core/EditOrderlineDialog";
import OrderPostDialog from "./core/OrderPostDialog";
import OrderSummaryDialog from "./core/OrderSummaryDialog";

const MaxLevel = 99;

interface IState {
  orderData: IOrderData;
  ordering: IOrdering;
  editOrderline: {
    quantity: number;
    sku: string;
    label: string;
    retailPrice: number;
    lowestPrice: number;
    sellingAt: number;
  } | undefined;
  summary: {
    order: IOrder;
  } | undefined;
}

export default function OrderForm() {
  const [state, setState] = React.useState<IState>({
    orderData: {
      customer: undefined,
      level: MaxLevel,
      lines: {},
    },
    ordering: {
      customer: undefined,
      level: MaxLevel,
      orderlines: [],
    },
    editOrderline: undefined,
    summary: undefined,
  });

  const [open, setOpen] = React.useState(false);

  const handleCustomer = (identity: ICustomer) => {
    const orderData: IOrderData = {
      ...state.orderData,
      customer: {
        id: identity._id,
        name: identity.name,
        mobile: identity.mobile,
        points: identity.custac.points,
        creditDays: identity.custac.creditDays,
        creditLimit: identity.custac.creditLimit,
        creditSpent: identity.custac.creditSpent,
      },
      level: identity.custac.level,
    };

    const nState: IState = {
      ...state,
      orderData,
      ordering: resolveOrdering(orderData),
    };

    setState(nState);
  };

  const handleCustomerRemoved = () => {
    const orderData: IOrderData = {
      ...state.orderData,
      customer: undefined,
      level: MaxLevel,
    };

    const nState: IState = {
      ...state,
      orderData,
      ordering: resolveOrdering(orderData),
    };

    setState(nState);
  };

  const handleProductSearching = async (value: string) => {
    const args = value.split(",").map(i => i.trim());
    const quantity = Number(args[1]) || 1;
    const sku = args[0];

    const data = await Products.Items.searchBySKU({ sku });

    if (data) {
      const nState = {
        ...state,
      };

      if (nState.orderData.lines[sku]) {
        nState.orderData.lines[sku].quantity += quantity;
      } else {
        nState.orderData.lines[sku] = {
          quantity,
          line: data,
          sellingAt: undefined,
        };
      }

      nState.ordering = resolveOrdering(nState.orderData);
      setState(nState);
    }
  };

  const handleEditOrderlineOpened = (sku: string) => {
    const { quantity, line } = state.orderData.lines[sku];
    const index = state.ordering.orderlines.findIndex((each) => each.sku === sku);
    const lowestPrice = line.priceLevels.length > 1 ? line.priceLevels[1] : line.priceLevels[0];

    setState({
      ...state,
      editOrderline: {
        quantity,
        sku: line.sku,
        label: line.label,
        retailPrice: state.ordering.orderlines[index].retailPrice,
        lowestPrice,
        sellingAt: state.ordering.orderlines[index].sellingAt,
      },
    });
  };

  const handleEditOrderlineUpdated = (data: {
    sku: string;
    quantity: number;
    sellingAt: number;
  }) => {
    const { sku, quantity, sellingAt } = data;
    const nState = {
      ...state,
    };

    nState.orderData.lines[sku].quantity = quantity;
    nState.orderData.lines[sku].sellingAt = sellingAt;

    nState.editOrderline = undefined;
    nState.ordering = resolveOrdering(nState.orderData);
    setState(nState);
  };

  const handleEditOrderlineClosed = () => {
    setState({
      ...state,
      editOrderline: undefined,
    });
  };

  const handlePreordering = async (data: {
    customer: {
      id: string;
      name: string;
      mobile: string;
      points: number;
      creditDays: number;
      creditLimit: number;
      creditSpent: number;
    };
    level: number;
    lines: {
      [sku: string]: {
        quantity: number;
        line: IProductItemLine;
        sellingAt: number | undefined;
      };
    };
  }) => {
    const preorder = await Preorders.createPreorder(data);

    console.log("Preorder created:", preorder);
  };

  const handlePosting = async (data: {
    level: number;
    customer: {
      id: string;
      name: string;
      mobile: string;
    } | undefined;
    orderlines: IOrderline[];
    weight: number;
    total: number;
  }) => {
    const order = await RegularOrders.createOrder(data);

    setState({
      orderData: {
        customer: undefined,
        level: MaxLevel,
        lines: {},
      },
      ordering: {
        customer: undefined,
        level: MaxLevel,
        orderlines: [],
      },
      editOrderline: undefined,
      summary: {
        order,
      },
    });
    setOpen(false);
  };

  const handleSummaryClosed = () => {
    setState({
      ...state,
      summary: undefined,
    });
  };

  return (
    <div className="flex w-full h-full bg-white">
      <div className="grow px-4 py-1.5">
        <div className="py-1.5 flex items-center">
          <CustomerSection
            ordering={state.ordering}
            onCustomer={handleCustomer}
            onRemove={handleCustomerRemoved}
          />

          <div className="pl-2 ml-2 border-l border-gray-200">
            <button
              type="button"
              className="min-w-15 sm:min-w-20 flex shrink-0 items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              onClick={() => setOpen(true)}
            >
              Post
            </button>
          </div>

        </div>
        <ProductsSection
          ordering={state.ordering}
          onSearching={handleProductSearching}
          onEditing={handleEditOrderlineOpened}
        />
      </div>
      <div className="hidden lg:flex lg:w-72 border-l border-gray-200">

      </div>

      <OrderPostDialog
        open={open}
        data={{
          orderData: state.orderData,
          ordering: state.ordering,
        }}
        onPreordering={handlePreordering}
        onPosting={handlePosting}
        onClose={() => setOpen(false)}
      />

      {state.editOrderline && (
        <EditOrderlineDialog
          open={state.editOrderline !== undefined}
          predata={state.editOrderline}
          onUpdated={handleEditOrderlineUpdated}
          onClose={handleEditOrderlineClosed}
        />
      )}

      {state.summary && (
        <OrderSummaryDialog
          data={state.summary.order}
          open={state.summary !== undefined}
          onClose={handleSummaryClosed}
        />
      )}
    </div>
  );
}
