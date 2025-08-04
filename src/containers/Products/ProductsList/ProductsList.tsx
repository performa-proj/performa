"use client";

import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { NoDataMessage } from "@/containers/core/NoDataMessage";
import Product from "./Product";

export default function ProductsList({
  products,
  structuresMap,
  onEditProductOpened,
  onNewProductItemOpened,
  onEditProductItemOpened,
  onDetail,
}: {
  products: IProduct[];
  structuresMap: { [id: string]: IPriceStructure; };
  onEditProductOpened: (productID: string) => void;
  onNewProductItemOpened: (productID: string) => void;
  onEditProductItemOpened: (productID: string, sku: string) => void;
  onDetail: (productID: string) => void;
}) {
  if (products.length === 0) {
    return (<NoDataMessage />);
  }

  return (
    <div className="divide-y divide-gray-200 border-b border-gray-200">
      {products.map((each) => (
        <Product
          key={each._id}
          product={each}
          structuresMap={structuresMap}
          onEditProductOpened={onEditProductOpened}
          onNewProductItemOpened={onNewProductItemOpened}
          onEditProductItemOpened={onEditProductItemOpened}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
}