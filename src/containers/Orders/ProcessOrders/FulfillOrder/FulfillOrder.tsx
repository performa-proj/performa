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
  onUpdated,
  onClose,
}: {
  order: IProcessOrder;
  onUpdated: (data: {
    _id: string;
    fulfilling: {
      completed: boolean;
      vehicle?: {
        plate: string;
        weight: {
          initial: number;
          loaded: number;
        };
      };
      data: {
        [sku: string]: {
          count: number;
          completed: boolean;
        };
      };
      weight: number;
    };
  }) => void;
  onClose: () => void;
}) {
  const lines = resolveOrdering({
    level: order.level,
    lines: order.ordering.data,
  }).orderlines.map((each) => ({
    sku: each.sku,
    label: each.label,
    quantity: each.quantity,
    weight: each.weight,
  }));

  const disabled = {
    plate: order.fulfilling?.vehicle?.plate || order.fulfilling?.completed ? true : false,
    initialWeight: (order.fulfilling?.vehicle?.weight.initial && order.fulfilling.vehicle.weight.initial > 0) || order.fulfilling?.completed ? true : false,
    loadedWeight: (order.fulfilling?.vehicle?.weight.loaded && order.fulfilling.vehicle.weight.loaded > 0) || order.fulfilling?.completed ? true : false,
  };

  const [isLoading, setLoading] = React.useState(false);
  const [isShow, setShow] = React.useState(false);
  const [state, setState] = React.useState<{
    completed: boolean;
    vehicle: {
      plate: string;
      initialWeight: string;
      loadedWeight: string;
    };
    data: {
      [sku: string]: {
        count: number;
        completed: boolean;
      };
    };
    weight: number;
  }>({
    completed: order.fulfilling?.completed || false,
    vehicle: {
      plate: order.fulfilling?.vehicle?.plate || "",
      initialWeight: order.fulfilling?.vehicle?.weight.initial.toString() || "",
      loadedWeight: order.fulfilling?.vehicle?.weight.loaded.toString() || "",
    },
    data: order.fulfilling?.data || Object.keys(order.ordering.data).reduce((result, sku) => {
      result[sku] = {
        count: 0,
        completed: false,
      };

      return result;
    }, {} as {
      [sku: string]: {
        count: number;
        completed: boolean;
      };
    }),
    weight: order.fulfilling?.weight || 0,
  });

  const [activeline, setActiveline] = React.useState<{
    index: number;
    sku: string;
    label: string;
    quantity: number;
    count: number;
  } | undefined>(undefined);

  const handleLineSelected = (index: number) => {
    const line = lines[index];

    if (!state.data[line.sku].completed) {
      setActiveline({
        index,
        sku: line.sku,
        label: line.label,
        quantity: line.quantity,
        count: state.data[line.sku].count,
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
      nState.data[sku] = {
        count,
        completed,
      };

      const weight = lines.reduce((result, each) => {
        result += each.weight * nState.data[each.sku].count;

        return result;
      }, 0);

      nState.weight = weight;

      setState(nState);
      setActiveline(undefined);
    }
  };

  const handleLineClosed = () => {
    if (activeline) {
      setActiveline(undefined);
    }
  };

  const handleFulfillingSaved = async () => {
    setLoading(true);

    const { completed, vehicle, data, weight } = state;

    const fulfilling = {
      completed,
      data,
      weight,
      ...(vehicle.plate.length === 0 ? {} : {
        vehicle: {
          plate: state.vehicle.plate,
          weight: {
            initial: Number(state.vehicle.initialWeight) || 0,
            loaded: Number(state.vehicle.loadedWeight) || 0,
          },
        },
      }),
    };

    fulfilling.completed = Object.values(data).reduce((result, each) => {
      if (!each.completed)
        return false;

      return result;
    }, true);

    if (fulfilling.vehicle) {
      const { initial, loaded } = fulfilling.vehicle.weight;

      if (initial > 0 && loaded > 0 && (initial > loaded)) {
        fulfilling.vehicle.weight.initial = loaded;
        fulfilling.vehicle.weight.loaded = initial;
      } else {
        fulfilling.completed = false;
      }
    }

    const result = await updateFulfilling({
      _id: order._id,
      fulfilling,
    });

    onUpdated(result);
    setLoading(false);
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
            onClick={() => setShow(!isShow)}
          >
            {isShow
              ? (<ChevronUpIcon className="size-4.5 sm:size-5" />)
              : (<ChevronDownIcon className="size-4.5 sm:size-5" />)
            }
          </button>
          <p className="text-base font-semibold text-gray-900 mx-1.5">Vehicle</p>
        </div>

        {isShow && (
          <div className="mt-2 px-6 grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-2">
            <div className="sm:col-span-2">
              <label htmlFor="vehicle-plate" className="block text-sm/6 font-medium text-gray-900">
                Plate
              </label>
              <div className="sm:mt-1">
                <input
                  id="vehicle-plate"
                  name="vehicle-plate"
                  type="text"
                  autoComplete="off"
                  disabled={disabled.plate}
                  className={classnames(disabled.plate ? "bg-gray-100" : "bg-white",
                    "block w-full rounded-md px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600")}
                  value={state.vehicle.plate}
                  onChange={(e) => {
                    const nState = {
                      ...state,
                    };
                    nState.vehicle.plate = e.currentTarget.value;
                    setState(nState);
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="initial-weight" className="block text-sm/6 font-medium text-gray-900">
                Initial Weight (KG.)
              </label>
              <div className="sm:mt-1">
                <input
                  id="initial-weight"
                  name="initial-weight"
                  type="text"
                  autoComplete="off"
                  disabled={disabled.initialWeight}
                  className={classnames(disabled.initialWeight ? "bg-gray-100" : "bg-white",
                    "block w-full rounded-md px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600")}
                  value={state.vehicle.initialWeight}
                  onChange={(e) => {
                    const nState = {
                      ...state,
                    };
                    nState.vehicle.initialWeight = resolveNumber(state.vehicle.initialWeight, e.currentTarget.value);
                    setState(nState);
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="loaded-weight" className="block text-sm/6 font-medium text-gray-900">
                Loaded Weight (KG.)
              </label>
              <div className="sm:mt-1 flex">
                <input
                  id="loaded-weight"
                  name="loaded-weight"
                  type="text"
                  autoComplete="off"
                  disabled={disabled.loadedWeight}
                  className={classnames(disabled.loadedWeight ? "bg-gray-100" : "bg-white",
                    "block w-full rounded-md px-3 py-1.5 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600")}
                  value={state.vehicle.loadedWeight}
                  onChange={(e) => {
                    const nState = {
                      ...state,
                    };
                    nState.vehicle.loadedWeight = resolveNumber(state.vehicle.loadedWeight, e.currentTarget.value);
                    setState(nState);
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
                className={state.data[each.sku].completed ? "bg-gray-100" : "bg-white hover:bg-gray-100 cursor-pointer"}
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
                  {state.data[each.sku].count.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center px-3 py-3">
        <div className="flex flex-col grow gap-y-1">
          <p className="text-sm font-normal text-gray-900">
            Weight:
            <span className="font-semibold px-1">{state.weight.toLocaleString()} KG.</span>
          </p>
          <p className="text-sm font-normal text-gray-900">
            Status:
            <span className="font-semibold px-1">{order.fulfilling?.completed ? "Completed" : "In Progress"}</span>
          </p>
        </div>
        {!order.fulfilling?.completed && (<button
          type="button"
          className="rounded-md bg-blue-600 hover:bg-blue-500 px-3 py-2 text-sm font-semibold text-white w-18"
          disabled={isLoading}
          onClick={handleFulfillingSaved}
        >
          Save
        </button>)}
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
          isLoading={isLoading}
          onSave={handleLineSaved}
          onClose={handleLineClosed}
        />
      )}
    </div>
  );
}
