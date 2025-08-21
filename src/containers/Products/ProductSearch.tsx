"use client";

import React from "react";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { classnames } from "../core/classnames";

export default function ProductSearch({
  onSearching,
}: {
  onSearching: (value: string) => void;
}) {
  const [search, setSearch] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLoading) {
      setSearch(e.currentTarget.value);
    }
  };

  const handleInputKeyDowned = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isLoading && e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!isLoading && search.length > 0) {
      setLoading(true);

      await onSearching(search);
      setSearch("");

      setLoading(false);
    }
  };

  return (
    <div className={classnames(
      isLoading ? "bg-gray-100" : "bg-white",
      "flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600"
    )}>
      <div className="shrink-0 select-none text-sm/6 font-medium text-gray-600">Product SKU:</div>
      <input
        id="product-sku-search"
        name="product-sku-search"
        type="text"
        autoComplete="off"
        className={classnames(isLoading ? "bg-gray-100" : "bg-white",
          "block min-w-0 grow py-1.5 pl-1 pr-3 text-sm/6 text-gray-900 placeholder:text-gray-400 focus:outline-0"
        )}
        value={search}
        onChange={handleInputChanged}
        onKeyDown={handleInputKeyDowned}
      />
      <span
        className="flex px-3 py-2"
        onClick={() => handleSearch()}
      >
        {isLoading ? (
          <ArrowPathIcon
            className="size-5 animate-spin text-gray-600"
          />
        ) : (
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="size-5 self-center justify-self-end text-gray-600 hover:text-gray-900"
          />
        )}
      </span>
    </div>
  );
}
