"use client";

import { IProduct } from "@/services/Products/IProduct";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import Product from "./Product";

export default function ProductsList({
  products,
  structures,
  onEditProductOpened,
  onNewProductItemOpened,
  onEditProductItemOpened,
}: {
  products: IProduct[];
  structures: IPriceStructure[];
  onEditProductOpened: (productID: string) => void;
  onNewProductItemOpened: (productID: string) => void;
  onEditProductItemOpened: (productID: string, sku: string) => void;
}) {
  const structuresMap = structures.reduce((result, each) => {
    result[each._id] = each;

    return result;
  }, {} as { [key: string]: IPriceStructure; });

  return (
    <>
      {products.map((each) => (
        <Product
          key={each._id}
          product={each}
          structuresMap={structuresMap}
          onEditProductOpened={onEditProductOpened}
          onNewProductItemOpened={onNewProductItemOpened}
          onEditProductItemOpened={onEditProductItemOpened}
        />
      ))}
    </>
  )
}