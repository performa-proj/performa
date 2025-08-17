"use client";

import React from "react";
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { resolveNumber } from "@/containers/core/resolveNumber";
import { updateFulfillment } from "../updateFulfill";
import CounterDialog from "./CounterDialog";
import { classnames } from "@/containers/core/classnames";

export default function FulfillOrder({
  order,
  onClose,
  onUpdate,
}: {
  order: IProcessOrder;
  onClose: () => void;
  onUpdate: (order: IProcessOrder) => void;
}) {
  const fulfilling = order.fulfilling || {
    completed: false,
    orderlines: {},
  };

  const [show, setShow] = React.useState(true);

  const [state, setState] = React.useState<{
    [sku: string]: {
      count: number;
      completed: boolean;
    };
  }>(order.ordering.lines.reduce((result, line) => {
    if (fulfilling.orderlines[line.sku] === undefined) {
      result[line.sku] = {
        count: 0,
        completed: false,
      };
    } else {
      result[line.sku] = {
        count: fulfilling.orderlines[line.sku].count,
        completed: fulfilling.orderlines[line.sku].count < line.quantity ? false : true,
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
    plate: fulfillment.vehicle?.plate || "0",
    initialWeight: fulfillment.vehicle?.weight.initial.toString() || "0",
    loadedWeight: fulfillment.vehicle?.weight.loaded.toString() || "0",
  });

  const orderlines = order.orderlines.map((line) => ({
    ...line,
    count: state[line.sku].count,
    completed: state[line.sku].completed,
  }));

  const handleOrderlineSelected = (index: number) => {
    if (!orderlines[index].completed) {
      setActiveline({
        index,
        sku: orderlines[index].sku,
        label: orderlines[index].label,
        quantity: orderlines[index].quantity,
        count: state[orderlines[index].sku].count || 0,
      });
    }
  };

  const handleOrderlineCompleted = () => {
    if (activeline) {
      const index = activeline.index;
      const sku = activeline.sku;

      setState({
        ...state,
        [sku]: {
          count: order.orderlines[index].quantity,
          completed: true,
        },
      });
      setActiveline(undefined);
    }
  };

  const handleOrderlineClosed = (count: number) => {
    if (activeline) {
      const index = activeline.index;
      const sku = activeline.sku;

      setState({
        ...state,
        [sku]: {
          count,
          completed: count < order.orderlines[index].quantity ? false : true,
        },
      });
      setActiveline(undefined);
    }
  };

  const handleUpdated = async () => {
    const initial = Number(vehicle.initialWeight);
    const loaded = Number(vehicle.loadedWeight);
    let weight = undefined;

    if (initial > 0) {
      weight = {
        initial,
        loaded,
      };
    }

    const plate = vehicle.plate;
    let completed = true;

    for (let i = 0; i < orderlines.length; i++) {
      if (!orderlines[i].completed) {
        completed = false;
        break;
      }
    }

    const data = {
      completed,
      ...(weight ? {
        vehicle: {
          ...(plate.length > 0 ? { plate } : {}),
          weight,
        },
      } : {}),
      orderlines: Object.keys(state).reduce((result, sku) => {
        result[sku] = {
          count: state[sku].count,
        };

        return result;
      }, {} as {
        [sku: string]: {
          count: number;
        };
      }),
    };

    const result = await updateFulfillment({
      _id: order._id,
      data,
    });

    const nOrder = {
      ...order,
      fulfillment: result.fulfillment,
    };

    onUpdate(nOrder);
  };

  return (
    <div className="bg-white w-full h-full">
      <div className="flex px-4 sm:px-6 py-3 border-b border-gray-200">
        <button
          className="cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <ChevronLeftIcon className="size-4.5 sm:size-5" />
        </button>
        <p className="text-base font-semibold text-gray-900 mx-1.5">
          Fulfill Order: {order.transactionID}
        </p>
      </div>

      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center">
          <p className="text-base font-semibold text-gray-900 mr-4">Vehicle</p>
          <button
            className="cursor-pointer text-gray-600 hover:text-gray-900 -ml-2 mr-2"
            onClick={() => setShow(!show)}
          >
            {show
              ? (<ChevronUpIcon className="size-5" />)
              : (<ChevronDownIcon className="size-5" />)
            }
          </button>
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
                  disabled={fulfillment.vehicle?.plate ? true : false}
                  className={classnames(fulfillment.vehicle?.plate ? "bg-gray-100" : "bg-white",
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
                  disabled={fulfillment.vehicle?.weight.initial ? true : false}
                  className={classnames(fulfillment.vehicle?.weight.initial ? "bg-gray-100" : "bg-white",
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
                  disabled={fulfillment.vehicle?.weight.loaded ? true : false}
                  className={classnames(fulfillment.vehicle?.weight.loaded ? "bg-gray-100" : "bg-white",
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
        <table className="relative min-w-full divide-y divide-gray-200 border-b border-gray-200">
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
            {orderlines.map((each, index) => (
              <tr
                key={each.sku}
                className={each.completed ? "bg-gray-100" : "bg-white hover:bg-gray-100 cursor-pointer"}
                onClick={() => handleOrderlineSelected(index)}
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
                  {each.count.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3">
        <button
          type="button"
          onClick={handleUpdated}
          className="inline-flex justify-center rounded-md bg-blue-600 min-w-32 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Save Changes
        </button>
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
          onCompleted={handleOrderlineCompleted}
          onClose={handleOrderlineClosed}
        />
      )}
    </div>
  );
}
