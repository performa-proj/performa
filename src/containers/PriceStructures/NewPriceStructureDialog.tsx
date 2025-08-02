"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";

import DialogBase from "../core/DialogBase";
import { classnames } from "../core/classnames";
import { resolveNumber } from "../core/resolveNumber";
import { PriceStructures } from ".";

export default function NewPriceStructureDialog({
  open,
  onCreated,
  onClose,
}: {
  open: boolean;
  onCreated: (structure: IPriceStructure) => void;
  onClose: () => void;
}) {
  const [state, setState] = React.useState({
    title: "",
    cost: "0",
    levels: ["0", "0", "0", "0", "0", "0"],
  });

  const handleTitleChanged = (value: string) => {
    const nState = {
      ...state,
      title: value,
    };

    setState(nState);
  };

  const handleCostChanged = (value: string) => {
    const nState = {
      ...state,
      cost: resolveNumber(state.cost, value),
    };

    setState(nState);
  };

  const handleLevelsChanged = (index: number, value: string) => {
    if (value.length === 0) {
      value = "0";
    }

    if (!Number.isNaN(Number(value))) {
      value = value.trim();

      const nState = {
        ...state,
      };

      nState.levels[index] = value;
      setState(nState);
    }
  };

  const handleLevelAdded = () => {
    const nState = {
      ...state,
    };
    nState.levels.push("0");

    setState(nState);
  };

  const handleLevelRemoved = (index: number) => {
    const nState = {
      ...state,
    };
    nState.levels.splice(index, 1);

    setState(nState);
  };

  const handleStructureCreated = async () => {
    const data = {
      title: state.title,
      cost: Number(state.cost),
      levels: state.levels.map(each => Number(each)),
    };

    const json = await PriceStructures.createPriceStructure(data);

    setState({
      title: "",
      cost: "0",
      levels: ["0", "0", "0", "0", "0", "0"],
    });
    onCreated(json);
  };

  const handleClose = () => {
    setState({
      title: "",
      cost: "0",
      levels: ["0", "0", "0", "0", "0", "0"],
    });
    onClose();
  };

  return (
    <DialogBase
      title="New Price Structure"
      open={open}
      onClose={handleClose}
      submitButton={{
        title: "Create",
        onSubmit: handleStructureCreated,
      }}
    >
      <div className="py-1.5 sm:py-2">
        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
          Title
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base sm:text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={state.title}
            onChange={e => handleTitleChanged(e.currentTarget.value)}
          />
        </div>
      </div>

      <div className="py-1.5 sm:py-2">
        <label htmlFor="cost" className="block text-sm/6 font-medium text-gray-900">
          Cost
        </label>
        <div className="mt-2">
          <input
            id="cost"
            name="cost"
            type="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base sm:text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            value={state.cost}
            onChange={e => handleCostChanged(e.currentTarget.value)}
          />
        </div>
      </div>

      <div className="py-1.5 sm:py-2">
        <label htmlFor="title" className="block grow text-sm/6 font-medium text-gray-900">
          Price Levels
        </label>
        <div className="mt-2">
          {state.levels.map((each, index) => (
            <div
              key={`l${index}`}
              className="grid grid-cols-1 -mt-px focus-within:relative"
            >
              <input
                id={`l${index}`}
                name={`l${index}`}
                type="text"
                autoComplete="off"
                className={classnames(index === 0 ?
                  "rounded-t-md" : "",
                  "block col-start-1 row-start-1 w-full bg-white py-1.5 pl-12 pr-8 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600")}
                value={each}
                onChange={e => handleLevelsChanged(index, e.currentTarget.value)}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none w-9.5 px-2 col-start-1 row-start-1 text-sm text-right self-center text-gray-900 border-r border-gray-300"
              >{index + 1}</span>
              <XMarkIcon
                className="cursor-pointer col-start-1 row-start-1 mr-3 size-4 self-center justify-self-end text-gray-400"
                onClick={() => handleLevelRemoved(index)}
              />
            </div>
          ))}
          <div
            className="cursor-pointer -mt-px py-1.5 bg-gray-50 rounded-b-md border border-dashed border-gray-300"
            onClick={() => handleLevelAdded()}
          >
            <p className="text-sm/6 text-gray-900 text-center">Add a New Level</p>
          </div>
        </div>
      </div>
    </DialogBase>
  );
}