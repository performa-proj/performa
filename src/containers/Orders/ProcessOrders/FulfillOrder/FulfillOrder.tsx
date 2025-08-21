"use client";

import React from "react";
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { resolveOrdering } from "@/services/Orders/resolveOrdering";
import { resolveNumber } from "@/containers/core/resolveNumber";
import { classnames } from "@/containers/core/classnames";

import { updateFulfilling } from "../updateFulfilling";
import CounterDialog from "./CounterDialog";

export default function FulfillOrder({
  order,
  onClose,
}: {
  order: IProcessOrder;
  onClose: () => void;
}) {
  const {
    ordering,
    fulfilling = {
      completed: false,
      data: {},
      weight: 0,
    },
  } = order;
  const lines = resolveOrdering({
    level: order.level,
    lines: ordering.data,
  }).orderlines.map((each) => ({
    sku: each.sku,
    label: each.label,
    quantity: each.quantity,
  }));

  const [show, setShow] = React.useState(false);

  const [state, setState] = React.useState<{
    [sku: string]: {
      count: number;
      completed: boolean;
    };
  }>(lines.reduce((result, { sku, quantity }) => {
    if (fulfilling.data[sku] === undefined) {
      result[sku] = {
        count: 0,
        completed: false,
      };
    } else {
      result[sku] = {
        count: fulfilling.data[sku].count,
        completed: fulfilling.data[sku].count < quantity ? false : true,
      };
    }

    return result;
  }, {} as {
    [sku: string]: {
      count: number;
      completed: boolean;
    };
  }));

  const [activeline, setActiveline] = React.useState<{
    index: number;
    sku: string;
    label: string;
    quantity: number;
    count: number;
  } | undefined>(undefined);

  const [vehicle, setVehicle] = React.useState<{
    plate: string;
    initialWeight: string;
    loadedWeight: string;
  }>({
    plate: fulfilling.vehicle?.plate || "",
    initialWeight: fulfilling.vehicle?.weight.initial.toString() || "0",
    loadedWeight: fulfilling.vehicle?.weight.loaded.toString() || "0",
  });

  const handleLineSelected = (index: number) => {
    const line = lines[index];

    if (!state[line.sku].completed) {
      setActiveline({
        index,
        sku: line.sku,
        label: line.label,
        quantity: line.quantity,
        count: state[line.sku].count,
      });
    }
  };

  const handleLineSaved = async ({
    sku,
    count,
    completed,
  }: {
    sku: string;
    count: number;
    completed: boolean;
  }) => {
    if (activeline) {
      const nState = { ...state };
      nState[sku] = {
        count,
        completed,
      };

      const data = {
        _id: order._id,
        fulfilling: {
          data: nState,
        },
      };

      await updateFulfilling(data)

      setState(nState);
      setActiveline(undefined);
    }
  };

  const handleLineClosed = () => {
    if (activeline) {
      setActiveline(undefined);
    }
  };

  return (
    <div className="bg-white w-full h-full">
      <div className="flex px-2 py-3 border-b border-gray-200">
        <button
          className="cursor-pointer text-gray-900"
          onClick={onClose}
        >
          <ChevronLeftIcon className="size-4.5 sm:size-5" />
        </button>
        <p className="text-base font-semibold text-gray-900 mx-1.5">
          Fulfill Order: {order.transactionID}
        </p>
      </div>

      <div className="py-3">
        <div className="flex px-2 items-center">
          <button
            className="cursor-pointer text-gray-900"
            onClick={() => setShow(!show)}
          >
            {show
              ? (<ChevronUpIcon className="size-4.5 sm:size-5" />)
              : (<ChevronDownIcon className="size-4.5 sm:size-5" />)
            }
          </button>
          <p className="text-base font-semibold text-gray-900 mx-1.5">Vehicle</p>
        </div>

        {show && (
          <div className="mt-2 sm:px-4 grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-2">
            <div className="sm:col-span-2">
              <label htmlFor="vehicle-plate" className="block text-sm/6 font-medium text-gray-900">
                Plate
              </label>
              <div className="mt-2">
                <input
                  id="vehicle-plate"
                  name="vehicle-plate"
                  type="text"
                  autoComplete="off"
                  disabled={fulfilling.vehicle?.plate ? true : false}
                  className={classnames(fulfilling.vehicle?.plate ? "bg-gray-100" : "bg-white",
                    "block w-full rounded-md px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600")}
                  value={vehicle.plate}
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      plate: e.currentTarget.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="initial-weight" className="block text-sm/6 font-medium text-gray-900">
                Initial Weight (KG.)
              </label>
              <div className="mt-2">
                <input
                  id="initial-weight"
                  name="initial-weight"
                  type="text"
                  autoComplete="off"
                  disabled={fulfilling.vehicle?.weight.initial ? true : false}
                  className={classnames(fulfilling.vehicle?.weight.initial ? "bg-gray-100" : "bg-white",
                    "block w-full rounded-md px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600")}
                  value={vehicle.initialWeight}
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      initialWeight: resolveNumber(vehicle.initialWeight, e.currentTarget.value),
                    });
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="loaded-weight" className="block text-sm/6 font-medium text-gray-900">
                Loaded Weight (KG.)
              </label>
              <div className="mt-2">
                <input
                  id="loaded-weight"
                  name="loaded-weight"
                  type="text"
                  autoComplete="off"
                  disabled={fulfilling.vehicle?.weight.loaded ? true : false}
                  className={classnames(fulfilling.vehicle?.weight.loaded ? "bg-gray-100" : "bg-white",
                    "block w-full rounded-md px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600")}
                  value={vehicle.loadedWeight}
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      loadedWeight: resolveNumber(vehicle.loadedWeight, e.currentTarget.value),
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <table className="relative min-w-full divide-y divide-gray-200 border-y border-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left w-15">
                SKU
              </th>
              <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-left">
                Title
              </th>
              <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center w-20 sm:w-30">
                QTY
              </th>
              <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center w-20 sm:w-30">
                Count
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {lines.map((each, index) => (
              <tr
                key={each.sku}
                className={state[each.sku].completed ? "bg-gray-100" : "bg-white hover:bg-gray-100 cursor-pointer"}
                onClick={() => handleLineSelected(index)}
              >
                <td
                  scope="col"
                  className="px-3 py-3.5 text-sm font-medium text-gray-900 text-left w-15"
                >
                  {each.sku}
                </td>
                <td
                  scope="col"
                  className="px-3 py-3.5 text-sm font-medium text-gray-900 text-left"
                >
                  {each.label}
                </td>
                <td
                  scope="col"
                  className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center "
                >
                  {each.quantity.toLocaleString()}
                </td>
                <td
                  scope="col"
                  className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center"
                >
                  {state[each.sku].count.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeline && (
        <CounterDialog
          open={activeline !== undefined}
          predata={{
            index: activeline.index,
            sku: activeline.sku,
            label: activeline.label,
            quantity: activeline.quantity,
            count: activeline.count,
          }}
          onSave={handleLineSaved}
          onClose={handleLineClosed}
        />
      )}
    </div>
  );
}
