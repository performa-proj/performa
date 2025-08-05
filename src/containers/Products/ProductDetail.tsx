"use client";

import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { resolveNumber } from "../core/resolveNumber";
import { updateAllPricebases } from "./updateAllPricebases";

export default function ProductDetail({
  product,
  structuresMap,
  onBack,
  onUpdate,
}: {
  product: IProduct;
  structuresMap: { [id: string]: IPriceStructure; };
  onBack: () => void;
  onUpdate: (data: {
    product: IProduct;
  }) => void;
}) {
  const levels = [];
  let levelsMax = 0;

  const [state, setState] = React.useState<{
    pricebases: string[];
    sugPricebase: string;
  }>({
    pricebases: product.items.map(each => each.pricebase.toFixed(0)),
    sugPricebase: "0",
  });

  const lines = product.items.map((each, index) => {
    const { sku, weight, structureID } = each;
    const structure = structuresMap[structureID];

    if (levelsMax < structure.levels.length) {
      levelsMax = structure.levels.length;
    }

    const { cost, levels } = structure;
    const sugPricebase = Number(state.sugPricebase);
    const sugpb = sugPricebase > 0 ? (sugPricebase * weight) + cost : 0;
    const pricelevels = levels.map(l => Number(state.pricebases[index]) + l);
    let pbkg = (Number(state.pricebases[index]) - cost) / weight;

    pbkg = pbkg < 0 ? 0 : pbkg;

    return {
      sku,
      sugpb,
      pbkg,
      pricelevels,
    };
  });

  const handlePriceBaseChanged = (index: number, value: string) => {
    const nState = { ...state };
    nState.pricebases[index] = resolveNumber(state.pricebases[index], value);

    setState(nState);
  };

  const handleSUGPBChanged = (value: string) => {
    const nState = { ...state };
    nState.sugPricebase = resolveNumber(state.sugPricebase, value);

    setState(nState);
  };

  const handleReset = () => {
    const nState = {
      ...state,
      pricebases: product.items.map(each => each.pricebase.toFixed(0)),
    };

    setState(nState);
  };

  const handleSave = async () => {
    const items = state.pricebases.map((each, index) => ({
      sku: lines[index].sku,
      pricebase: Number(each),
    }));

    const payloads = {
      productID: product._id,
      items,
    };

    const updated = await updateAllPricebases(payloads);

    onUpdate({ product: updated });
  };

  for (let i = 0; i < levelsMax; i++) {
    levels.push((
      <th key={i} scope="col" rowSpan={2} className="p-1.5 text-center text-sm font-medium text-gray-900">{i + 1}</th>
    ));
  }

  return (
    <div>
      <div className="flex px-4 sm:px-6 py-3 border-b border-gray-200">
        <button
          className="cursor-pointer text-gray-600 hover:text-gray-900 -ml-2 mr-2"
          onClick={onBack}
        >
          <ChevronLeftIcon className="size-4.5 sm:size-5" />
        </button>
        <p className="text-base font-semibold text-gray-900">
          {product.ref} - {product.title}
        </p>
      </div>
      <div className="px-4 sm:px-6 py-3">
        <p className="text-base font-semibold text-gray-900">
          Price Structure
        </p>
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead>
            <tr>
              <th scope="col" rowSpan={2} className="p-1.5 text-left text-sm font-medium text-gray-900">SKU</th>
              <th scope="col" className="px-1.5 pt-1.5 text-center text-sm font-medium text-gray-900 min-w-24">Price Base</th>
              <th scope="col" className="hidden sm:table-cell px-1.5 pt-1.5 text-center text-sm font-medium text-gray-400">SUG. PB</th>
              <th scope="col" className="px-1.5 pt-1.5 text-center text-sm font-medium text-gray-900">PB / KG</th>
              {levels}
            </tr>
            <tr>
              <th scope="col" className="px-1.5 pb-1.5 min-w-24">
                <div className="flex items-center justify-center">
                  <span className="hidden sm:inline text-sm font-medium text-gray-900">(PB)</span>
                  <input
                    name="sug-pricebase"
                    type="text"
                    value={state.sugPricebase}
                    onChange={(e) => handleSUGPBChanged(e.currentTarget.value)}
                    className="block sm:hidden w-18 text-center bg-white p-0 text-sm font-semibold text-blue-600 focus:outline-0"
                  />
                </div>
              </th>
              <th scope="col" className="hidden sm:table-cell px-1.5 pb-1.5">
                <div className="flex items-center justify-center">
                  <input
                    name="sug-pricebase"
                    type="text"
                    value={state.sugPricebase}
                    onChange={(e) => handleSUGPBChanged(e.currentTarget.value)}
                    className="block w-18 text-center bg-white p-0 text-sm font-semibold text-blue-600 focus:outline-0"
                  />
                </div>
              </th>
              <th scope="col" className="px-1.5 pb-1.5 text-center text-sm font-medium text-gray-900 min-w-24">
                (Exc. Cost)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {lines.map((line, index) => (
              <tr key={line.sku}>
                <td className="px-1.5 py-2 text-left text-sm font-medium text-gray-900">{line.sku}</td>
                <td className="px-1.5 py-2">
                  <div className="flex items-center justify-center">
                    <input
                      id={line.sku + "pricebase"}
                      name="pricebase"
                      type="text"
                      value={state.pricebases[index]}
                      onChange={(e) => handlePriceBaseChanged(index, e.currentTarget.value)}
                      className="block w-18 text-center bg-white p-0 text-sm font-medium text-blue-600 focus:outline-0"
                    />
                  </div>
                  <div className="flex sm:hidden items-center justify-center">
                    <span className="inline sm:hidden text-sm font-medium text-gray-400">
                      {line.sugpb.toFixed(4)}
                    </span>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-2 py-2 text-center text-sm font-medium text-gray-400">{line.sugpb.toFixed(4)}</td>
                <td className="px-2 py-2 text-center text-sm font-medium text-gray-900">{line.pbkg.toFixed(4)}</td>
                {line.pricelevels.map((each, index) => (
                  <td key={index} className="px-1.5 py-2 text-center text-sm font-medium text-gray-900">{each}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 sm:px-6 py-3">
        <div className="flex gap-x-4">
          <button
            type="button"
            className="rounded-md bg-white hover:bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white min-w-18"
            onClick={() => handleSave()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
