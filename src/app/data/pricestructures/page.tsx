"use client";

import React from "react";
import { LoadingMessage } from "@/containers/core/LoadingMessage";
import { ReloadButton } from "@/containers/core/ReloadButton";
import { PriceStructures } from "@/containers/PriceStructures";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { NoDataMessage } from "@/containers/core/NoDataMessage";
import NewPriceStructureButton from "@/containers/PriceStructures/NewPriceStructureButton";
import EditPriceStructureDialog from "@/containers/PriceStructures/EditPriceStructureDialog";

export default function Page() {
  const [state, setState] = React.useState<IPriceStructure[]>([]);
  const [editStructure, setEditStructure] = React.useState<{
    data: IPriceStructure;
    index: number;
  } | undefined>(undefined);
  const [isLoading, setLoading] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const data = await PriceStructures.listPriceStructures();
    setState(data);

    setLoading(false);
  };

  const handleStructureCreated = (structure: IPriceStructure) => {
    setState([
      ...state,
      structure,
    ]);
  };

  const handleStructureDeleted = (index: number) => {
    setEditStructure(undefined);
    setOpenEdit(false);

    state.splice(index, 1);
    setState([
      ...state,
    ]);
  };

  const handleStructureUpdated = (structure: IPriceStructure, index: number) => {
    setEditStructure(undefined);
    setOpenEdit(false);

    const nState = [...state];
    nState[index] = structure;
    setState(nState);
  };

  const handleEditOpen = (data: IPriceStructure, index: number) => {
    setEditStructure({ data, index });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setEditStructure(undefined);
    setOpenEdit(false);
  };

  return (
    <div className="w-full">
      <div className="flex px-4 sm:px-6 py-2 border-b border-gray-200">
        <div className="grow" />
        <div className="flex gap-x-2">
          <NewPriceStructureButton
            onCreated={handleStructureCreated}
          />
          <ReloadButton
            isLoading={isLoading}
            onClick={loadData}
          />
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-medium text-gray-900"
              >
                <span className="hidden sm:inline">Title</span>
                <span className="inline sm:hidden">Structures</span>
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-medium text-gray-900"
              >
                Cost
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-medium text-gray-900"
              >
                Levels
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {isLoading ? (
              <tr>
                <td
                  colSpan={3}
                >
                  <LoadingMessage />
                </td>
              </tr>
            ) : state.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                >
                  <NoDataMessage />
                </td>
              </tr>
            ) : state.map((each, index) => (
              <tr
                key={each._id}
                className="cursor-pointer"
                onClick={() => handleEditOpen(each, index)}
              >
                <td className="px-3 py-3.5 text-sm text-gray-900">
                  <span className="font-semibold">{each.title}</span>
                  <dl className="mt-2 sm:hidden font-medium text-gray-900">
                    <dd className="py-1">Cost: {each.cost.toFixed(4)}</dd>
                    <dd className="py-1">
                      <p className="divide-x divide-gray-200 -ml-2.5">
                        {each.levels.map((level, index) => (
                          <span
                            key={index}
                            className="px-2.5"
                          >{level}</span>
                        ))}
                      </p>
                    </dd>
                  </dl>
                </td>
                <td className="hidden sm:table-cell px-3 py-3.5 text-sm text-gray-900">
                  <span className="font-medium">{each.cost.toFixed(4)}</span>
                </td>
                <td className="hidden sm:table-cell px-3 py-3.5 text-sm font-medium text-gray-900">
                  <p className="divide-x divide-gray-200 -ml-2.5">
                    {each.levels.map((level, index) => (
                      <span
                        key={index}
                        className="px-2.5 text-sm font-medium text-gray-900"
                      >{level}</span>
                    ))}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editStructure && (
        <EditPriceStructureDialog
          index={editStructure.index}
          predata={editStructure.data}
          open={openEdit}
          onDeleted={handleStructureDeleted}
          onUpdated={handleStructureUpdated}
          onClose={handleEditClose}
        />
      )}
    </div>
  );
}
